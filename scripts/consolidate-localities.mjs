import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {config} from './coverage-config.mjs';
import {selectCoverage,policy,distanceKm,COVERAGE_RELEASE,COVERAGE_CSS} from './municipal-coverage.mjs';
import {madridPostalCodesByIne} from '../data/madrid-postal-codes.mjs';
const root='dist',origin=config.domain,e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>s.replace(/&(amp|quot|apos|lt|gt|#39);/g,(m,k)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>','#39':"'"}[k]));
if(fs.existsSync(root+'/coverage-manifest.json'))throw Error('Reconstruye el sitio antes de consolidar.');
const {retained,assignments}=selectCoverage(config.towns),retired=assignments.filter(a=>a.town.code!==a.hub.code),byTownRoute=new Map(assignments.map(a=>[a.town.route,a])),active=new Set(retained.map(t=>t.route));
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path.join(dir,x.name)):[path.join(dir,x.name)]);}
const original=files(root).filter(f=>f.endsWith('.html')).map(file=>{const html=fs.readFileSync(file,'utf8'),route=file===root+'/404.html'?'/404.html':file===root+'/index.html'?'/':'/'+path.relative(root,path.dirname(file)).replaceAll(path.sep,'/')+'/';return {file,html,route};});
const byOriginal=new Map(original.map(p=>[p.route,p]));for(const t of config.towns)if(!byOriginal.has(t.route))throw Error('Inventario sin HTML: '+t.route);
const pages=original.filter(p=>!byTownRoute.has(p.route)||active.has(p.route));
function destination(raw,current='/',fragment=true){let u;try{u=new URL(decode(raw),origin+current);}catch{return raw;}if(u.origin!==origin)return raw;
 const route=u.pathname.endsWith('/index.html')?u.pathname.slice(0,-10):u.pathname.endsWith('/')?u.pathname:u.pathname+'/';
 const a=byTownRoute.get(route);if(!a||a.town.code===a.hub.code)return raw;return a.hub.route+(fragment?'#cobertura-'+a.town.code:'');}

const asset=name=>'/assets/'+name+'.'+COVERAGE_RELEASE+'.'+(name==='municipal-coverage'?'css':'js');
const cssPath=asset('municipal-coverage'),jsPath=asset('coverage-location');
const coverageBlock=town=>{const group=assignments.filter(a=>a.hub.code===town.code&&a.town.code!==town.code).map(a=>a.town).sort((a,b)=>a.name.localeCompare(b.name,'es'));if(!group.length)return '';
 return `<section class="section coverage-section" id="cobertura-cercana"><div class="coverage-inner"><p class="eyebrow">TAMBIÉN EN LOS ALREDEDORES</p><h2>Cerrajero 24 horas en ${e(town.name)} y pueblos cercanos</h2><p>Puedes consultar aperturas de puertas, bombines, cerraduras y cerrojos en estas localidades. Selecciona tu municipio para preparar el aviso con su nombre y las referencias de dirección que le corresponden.</p><ul class="municipal-coverage-list">${group.map(t=>`<li id="cobertura-${t.code}" data-coverage-name="${e(t.name)}"><strong>${e(t.name)}</strong>${madridPostalCodesByIne[t.code]?.length?`<small>CP: ${madridPostalCodesByIne[t.code].join(' · ')}</small>`:''}<a class="coverage-enquiry" href="#preparar-aviso" data-coverage-enquiry="${t.code}">Consultar en ${e(t.name)} →</a></li>`).join('')}</ul><p>Al llamar, confirma disponibilidad para tu dirección, desplazamiento y posibles recargos de horario.</p></div></section>`;
};
for(const p of pages){let h=p.html;h=h.replace(/\bhref="([^"]+)"/g,(_,raw)=>`href="${e(destination(raw,p.route))}"`);
 const town=retained.find(t=>t.route===p.route);let title=null,description=null;
 if(town){
  const block=coverageBlock(town);if(block){const re=/(<section\b[^>]*\bid="preparar-aviso"[^>]*>)/;if(!re.test(h))throw Error('Falta contacto '+p.route);h=h.replace(re,block+'$1');}
  const group=assignments.filter(a=>a.hub.code===town.code).map(a=>a.town).sort((a,b)=>a.name.localeCompare(b.name,'es'));
  h=h.replace(/(<select id="request-town"[^>]*>)[\s\S]*?(<\/select>)/,(_,open,close)=>open+group.map(t=>`<option value="${e(t.name)}"${t.code===town.code?' selected':''}>${e(t.name)}</option>`).join('')+close);
  const nearest=retained.filter(t=>t.provinceSlug===town.provinceSlug&&t.code!==town.code).sort((a,b)=>distanceKm(town,a)-distanceKm(town,b)||a.code.localeCompare(b.code)).slice(0,8);
  const nearby=`<section class="local-related coverage-nearby"><div class="wrap"><span class="eyebrow">OTRAS LOCALIDADES PRÓXIMAS</span><h2>Cerrajeros cerca<br>de ${e(town.name)}.</h2><div class="local-links">${nearest.map(t=>`<a href="${t.route}">Cerrajero en ${e(t.name)}</a>`).join('')}</div><a class="text-link" href="/cerrajero/${town.provinceSlug}/">Ver todos los municipios de la provincia →</a></div></section>`;
  h=h.replace(/<section class="local-related">[\s\S]*?<\/section>/,nearby);
 }
 const rewrite=x=>typeof x==='string'?(/^(https?:\/\/|\/)/.test(x)?destination(x,p.route,false):x):Array.isArray(x)?x.map(rewrite):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,rewrite(v)])):x;
 h=h.replace(/(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,(_,open,raw,close)=>{const data=rewrite(JSON.parse(raw));const update=x=>{if(!x||typeof x!=='object')return;if(Array.isArray(x)){x.forEach(update);return;}
  if(['WebPage','CollectionPage'].includes(x['@type'])&&title){x.name=title;x.description=description;}
  if(x['@type']==='Service'&&town){x.name='Cerrajero urgente 24 horas'+' en '+town.name;x.areaServed=assignments.filter(a=>a.hub.code===town.code).map(a=>({'@type':'AdministrativeArea',name:a.town.name,containedInPlace:{'@type':'AdministrativeArea',name:a.town.province}}));if(x.description)x.description=description;}
  Object.values(x).forEach(update);};update(data);return open+JSON.stringify(data).replaceAll('<','\\u003c')+close;});
 h=h.replace('</head>',`<link rel="stylesheet" href="${cssPath}"><script src="${jsPath}" defer></script></head>`);fs.writeFileSync(p.file,h);p.html=h;p.title=title;p.description=description;
}
for(const a of retired)fs.rmSync(path.dirname(byOriginal.get(a.town.route).file),{recursive:true});
const search=JSON.parse(fs.readFileSync(root+config.searchPath,'utf8'));for(const row of search){row.originalUrl=row.url;row.url=destination(row.url);}
fs.writeFileSync(root+config.searchPath,JSON.stringify(search));
const redirectRows=retired.flatMap(({town,hub})=>[town.route,town.route.slice(0,-1),town.route+'index.html'].map(from=>({from,to:hub.route})));
const redirectFile=root+'/_redirects',oldRedirects=fs.existsSync(redirectFile)?fs.readFileSync(redirectFile,'utf8'):'';
fs.writeFileSync(redirectFile,'# Direct permanent municipal destinations\n'+redirectRows.map(r=>`${r.from} ${origin}${r.to} 301!`).join('\n')+'\n'+oldRedirects);
const indexable=pages.filter(p=>!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(p.html)),preview=indexable.length===0;
const groups=new Map([['principal',[]]]);for(const p of indexable){const province=config.provinces.find(x=>p.route.startsWith(x.url));const key=province?.slug||'principal';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p.route);}
for(const file of fs.readdirSync(root).filter(f=>/^sitemap.*\.xml$/.test(f)))fs.rmSync(root+'/'+file);
fs.rmSync(root+'/sitemaps',{recursive:true,force:true});fs.mkdirSync(root+'/sitemaps');
if(!preview){for(const [key,routes] of groups)fs.writeFileSync(root+'/sitemap-'+(key==='principal'?'paginas':key)+'.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin+r}</loc></url>`).join('')}</urlset>`);fs.writeFileSync(root+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...groups.keys()].map(k=>`<sitemap><loc>${origin}/sitemap-${k==='principal'?'paginas':k}.xml</loc></sitemap>`).join('')}</sitemapindex>`);}else fs.rmSync(root+'/sitemap.xml',{force:true});
const css=COVERAGE_CSS+'\n.coverage-inner{min-width:0}.coverage-inner h2{font-size:clamp(1.45rem,3vw,2.4rem);line-height:1.2;overflow-wrap:anywhere;margin-bottom:20px}.coverage-inner>p{margin:16px 0;max-width:85ch}.coverage-section{background:#f4f7f8;color:#142633}.coverage-section .eyebrow{color:#315367}.municipal-coverage-list{list-style:none;padding:0}.municipal-coverage-list li{min-width:0;border:1px solid #bacbd2;border-radius:10px;padding:14px;background:#fff}.municipal-coverage-list small,.coverage-enquiry{display:block}.coverage-enquiry{font-size:14px;min-height:44px;padding:10px 0;text-decoration:underline}.coverage-nearby-list{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:10px 20px;margin:20px 0}.coverage-nearby-list a{display:block;min-height:44px;padding:10px 0;text-decoration:underline;overflow-wrap:anywhere}';
fs.writeFileSync(root+cssPath,css);
const browser=`(()=>{function choose(code){const row=document.getElementById('cobertura-'+code),field=document.querySelector(${JSON.stringify(config.townInput)});if(row&&field){field.value=row.dataset.coverageName;field.dispatchEvent(new Event('input',{bubbles:true}));field.dispatchEvent(new Event('change',{bubbles:true}));}}function sync(){const m=location.hash.match(/^#cobertura-(\\d{5})$/);if(m)choose(m[1]);}sync();window.addEventListener('hashchange',sync);document.querySelectorAll('[data-coverage-enquiry]').forEach(a=>a.addEventListener('click',()=>choose(a.dataset.coverageEnquiry)));})();`;
fs.writeFileSync(root+jsPath,browser);
const manifest={release:COVERAGE_RELEASE,site:config.key,domain:origin,preview,policy,source:config.source,total:config.towns.length,retained:retained.length,redirected:retired.length,pages:pages.length,urls:indexable.length,routes:pages.map(p=>p.route),indexableRoutes:indexable.map(p=>p.route),searchPath:config.searchPath,contactId:config.contactId,townInput:config.townInput,cssPath,jsPath,redirects:redirectRows,provinces:config.provinces.map(p=>({name:p.name,slug:p.slug,total:config.towns.filter(t=>t.provinceSlug===p.slug).length,retained:retained.filter(t=>t.provinceSlug===p.slug).length})),assignments:assignments.map(({town,hub,distanceKm})=>({code:town.code,name:town.name,province:town.province,provinceSlug:town.provinceSlug,population:town.population,original:town.route,destination:hub.route,hub:hub.name,url:hub.route+(town.code===hub.code?'':'#cobertura-'+town.code),distanceKm:Number(distanceKm.toFixed(3)),postalCodes:madridPostalCodesByIne[town.code]||[]}))};
fs.writeFileSync(root+'/coverage-manifest.json',JSON.stringify(manifest,null,2));
console.log(`COBERTURA ${config.label}: ${manifest.total} municipios, ${manifest.retained} páginas municipales, ${manifest.redirected} agrupados, ${manifest.urls} URLs indexables (${preview?'preview':'producción'}).`);
