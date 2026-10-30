import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const load=n=>JSON.parse(readFileSync('data/'+n+'.json','utf8'));
const towns=JSON.parse(readFileSync('dist/assets/municipios.json','utf8'));
const policy=load('local-indexing'),reviewed=new Set(policy.reviewedMunicipalities),references=load('local-references');
let pending=0,eligible=0;
for(const t of towns){const html=readFileSync(join('dist',t.url,'index.html'),'utf8');if(reviewed.has(t.name))eligible++;else{pending++;if(!html.includes('content="noindex,follow"'))throw Error('Ficha pendiente indexable: '+t.name);}}
const records=Object.values(references.municipalities);
console.log(JSON.stringify({municipalPages:towns.length,defaultPolicy:policy.default,eligibleAfterEditorialReview:eligible,pendingNoindex:pending,municipalitiesWithStreets:records.filter(r=>r.streets.length).length,municipalitiesWithNeighborhoodsFromStreetRegister:records.filter(r=>r.neighborhoods.length).length,streetReferences:records.reduce((sum,r)=>sum+r.streets.length,0),neighborhoodReferences:records.reduce((sum,r)=>sum+r.neighborhoods.length,0),interpretation:'La mitigación consiste en excluir de indexación las fichas pendientes y consolidar las explicaciones técnicas. Añadir calles o reducir una cifra de similitud no activa la indexación ni garantiza posiciones. Incluso las fichas revisadas pueden ser evaluadas de otra forma por Google.'},null,2));
