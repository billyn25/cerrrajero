import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const towns=JSON.parse(readFileSync('dist/assets/municipios.json','utf8'));
const groups=new Map();
for(const town of towns){const html=readFileSync(join('dist',town.url,'index.html'),'utf8');let article=html.match(/<article>(.*?)<\/article>/s)[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();for(const label of [town.name,town.province].sort((a,b)=>b.length-a.length))article=article.replaceAll(label,'[ZONA]');article=article.replace(/\+?34\d{9}|\d{3} \d{2} \d{2} \d{2}/g,'[TEL]');const hash=createHash('sha256').update(article).digest('hex');if(!groups.has(hash))groups.set(hash,[]);groups.get(hash).push(town.name);}
const shared=[...groups.values()].filter(g=>g.length>1).sort((a,b)=>b.length-a.length);
console.log(JSON.stringify({municipalPages:towns.length,articlePatterns:groups.size,pagesSharingArticlePattern:shared.reduce((sum,g)=>sum+g.length,0),largestGroups:shared.map(g=>g.length),interpretation:'Diagnóstico editorial: se eliminan nombres de lugar y teléfonos para comparar artículos. No es una predicción de Google ni una prueba de penalización. Las páginas con estructura común requieren valor local verificable; los metadatos únicos no garantizan indexación.'},null,2));
