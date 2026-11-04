import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const load=n=>JSON.parse(readFileSync('data/'+n+'.json','utf8'));
const towns=JSON.parse(readFileSync('dist/assets/municipios.json','utf8'));
const policy=load('local-indexing'),reviewed=new Set(policy.reviewedMunicipalities),references=load('local-references');
let eligible=0,excluded=0;
const production=readFileSync('dist/index.html','utf8').includes('content="index,follow"');
for(const t of towns){const html=readFileSync(join('dist',t.url,'index.html'),'utf8'),enabled=policy.default==='index'||reviewed.has(t.name);if(enabled)eligible++;else excluded++;const expected=production&&enabled?'index,follow':'noindex,follow';if(!html.includes('content="'+expected+'"'))throw Error('Directiva incorrecta: '+t.name);}
const records=Object.values(references.municipalities);
console.log(JSON.stringify({municipalPages:towns.length,defaultPolicy:policy.default,enabledMunicipalPages:eligible,excludedByPolicy:excluded,editoriallyReviewed:reviewed.size,previewNoindex:!production,municipalitiesWithStreets:records.filter(r=>r.streets.length).length,municipalitiesWithNeighborhoodsFromStreetRegister:records.filter(r=>r.neighborhoods.length).length,streetReferences:records.reduce((sum,r)=>sum+r.streets.length,0),neighborhoodReferences:records.reduce((sum,r)=>sum+r.neighborhoods.length,0),interpretation:'La indexación municipal está habilitada según la política del titular. La revisión editorial es independiente y no garantiza que Google indexe o posicione las páginas.'},null,2));
