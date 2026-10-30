"""Extract only public street/neighborhood names, never portal numbers or individual addresses.
Usage: python scripts/import-local-references.py <directory-with-source-downloads>
Sources: Eustat official CSVs; Comunidad de Madrid official callejero_completo.zip.
"""
import csv,json,re,sys,struct,zipfile,unicodedata,collections
from pathlib import Path
base=Path(sys.argv[1]);out=Path('data/local-references.json')
counts=collections.defaultdict(collections.Counter);types={};raw_names=collections.defaultdict(dict)
street_types={'Kalea/Calle':'Calle','Etorbidea/Avenida':'Avenida','Hiribidea/Avenida':'Avenida','Plaza':'Plaza','Ibilbidea/Paseo':'Paseo','Pasealekua/Paseo':'Paseo','Zumardia/Alameda':'Alameda','Zeharbidea/Travesía':'Travesía'}
barrios={'Auzoa/Barrio','Auzunea/Barrio','Bailara/Barrio'}
all_towns=set()
for province,name in [('01','alava'),('48','bizkaia'),('20','gipuzkoa')]:
 filename=name+'-streets-complete.raw' if name=='gipuzkoa' else name+'-streets.raw'
 with (base/filename).open(encoding='utf-8-sig') as f:
  reader=csv.reader(f,delimiter=';');next(reader)
  for r in reader:
   if len(r)!=26:raise ValueError('Incomplete CSV row: '+filename)
   key=province+r[2].zfill(3);all_towns.add(key);typ=r[11];name=r[12].strip()
   if not name or any(x in name.casefold() for x in ['poligono','polígono','industrial']):continue
   if typ in street_types:
    value=street_types[typ]+' '+name;category='streets'
    if name.casefold().startswith(street_types[typ].casefold()+' '):value=name
   elif typ in barrios:value=name;category='neighborhoods'
   else:continue
   counts[key][(category,value)]+=1
with zipfile.ZipFile(base/'madrid-callejero.zip') as z:
 with z.open('Callejero_Completo_V124.dbf') as f:
  header=f.read(32);n,hl,rl=struct.unpack_from('<IHH',header,4);fields=[];offset=1
  for _ in range((hl-33)//32):
   d=f.read(32);name=d[:11].split(b'\0')[0].decode();length=d[16];fields.append((name,offset,length));offset+=length
  f.read(hl-32-len(fields)*32)
  wanted={name:(start,length) for name,start,length in fields if name in ['CDMUNI','CDTVIA','DSPART','DSVIAL']}
  allowed={'Calle':'Calle','Avda':'Avenida','Plaza':'Plaza','Paseo':'Paseo','Blvr':'Bulevar','Gta':'Glorieta','Trva':'Travesía'}
  for _ in range(n):
   row=f.read(rl)
   if len(row)!=rl:raise ValueError('Incomplete DBF record')
   if row[:1]==b'*':continue
   d={k:row[a:a+l].decode('cp1252').strip() for k,(a,l) in wanted.items()};key='28'+d['CDMUNI'];all_towns.add(key)
   if d['CDTVIA'] not in allowed:continue
   value=' '.join(x for x in [allowed[d['CDTVIA']],d['DSPART'],d['DSVIAL']] if x)
   if any(x in value.casefold() for x in ['industrial','poligono','polígono','servicio','sin nombre']):continue
   counts[key][('streets',value)]+=1
sources={
 'eustat':{'label':'Eustat · callejero oficial','url':'https://opendata.euskadi.eus/catalogo/-/callejero-comunidad-autonoma-del-pais-vasco/','attribution':'Eusko Jaurlaritza / Gobierno Vasco. Eustat.','retrieved':'2026-10-30'},
 'madrid':{'label':'Comunidad de Madrid · callejero completo','url':'https://web.comunidad.madrid/iestadis/fijas/estructu/general/territorio/estructu_descargas.htm','attribution':'Comunidad de Madrid. Subdirección General de Estadística.','retrieved':'2026-10-30','fileVersion':'Callejero_Completo_V124.dbf'}
}
preferred={
 '48020':['granvia','autonomia','iturribide','licenciadopoza','urquijo','lehendakariaguirre','moyua','zabalbide'],
 '48013':['herrikoplaza','gernikakoarbola','lalibertad','franciscogomez','losfueros','juandegaray'],
 '01059':['eduardodato','postas','cuchilleria','avenidagasteiz','virgenblanca','reinasofia','portaldecastilla','sanchosabio'],
 '20069':['urbieta','sanmartin','miracruz','libertad','colon','gipuzkoa','boulevard'],
 '28079':['calledealcala','bravomurillo','castellana','granvia','serrano','calledegoya','plazadecastilla','paseodelasdelicias'],
 '28049':['avenidadelaconstitucion','avenidadeespana','principedeespana','honduras','uruguay','callechile','vicalvaro','plazadelmaregeo'],
 '28130':['zarauz','algorta','motrico','plazadeespana','calledelalibertad','calledelahuerta','somorrostro']
}
def simple(s):return re.sub('[^a-z0-9]','',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower())
records={}
for key in sorted(all_towns):
 rows=counts[key];streets=[v for (cat,v),n in rows.most_common() if cat=='streets'];neighborhoods=[v for (cat,v),n in rows.most_common() if cat=='neighborhoods']
 chosen=streets[:8]
 # Include at least one square and avenue when present; no roads or industrial estates.
 for prefix in ['Plaza ','Avenida ']:
  candidate=next((s for s in streets if s.startswith(prefix)),None)
  if candidate and not any(s.startswith(prefix) for s in chosen):
   if len(chosen)>=8:chosen[-1]=candidate
   else:chosen.append(candidate)
 if key in preferred:
  manual=[]
  for pattern in preferred[key]:
   match=next((street for street in streets if pattern in simple(street)),None)
   if match and match not in manual:manual.append(match)
  chosen=list(dict.fromkeys(manual+chosen))[:8]
 records[key]={'streets':list(dict.fromkeys(chosen)),'neighborhoods':neighborhoods[:6],'source':'madrid' if key.startswith('28') else 'eustat'}
expected=json.loads(Path('data/municipios-ine.json').read_text())['municipalities'];expected_ids={x['municipio_id'] for x in expected}
if set(records)!=expected_ids:raise ValueError({'missing':sorted(expected_ids-set(records)),'extra':sorted(set(records)-expected_ids)})
# Match preferred editorial names to the official municipality code, not to street substrings.
def norm(s):
 s=re.sub(r'^(.+), (El|La|Los|Las)$',r'\2 \1',s)
 return re.sub('[^a-z0-9]','',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower())
def parts(s):return {norm(s),*(norm(x) for x in s.split('/'))}
alias={'Abanto-Zierbena':'Abanto y Ciérvana-Abanto Zierbena','Trapagaran':'Valle de Trápaga-Trapagaran'}
by_name={};province={'alava':'01','bizkaia':'48','gipuzkoa':'20','madrid':'28'}
for zone in json.loads(Path('data/coverage.json').read_text()):
 for group in zone['groups']:
  for town in group['towns']:
   matches=[x for x in expected if x['provincia_id']==province[zone['slug']] and parts(x['nombre'])&parts(alias.get(town,town))]
   if len(matches)!=1:raise ValueError('Ambiguous municipality: '+town)
   by_name[town]={'code':matches[0]['municipio_id'],**records[matches[0]['municipio_id']]}
out.write_text(json.dumps({'sources':sources,'municipalities':by_name},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'municipalities':len(by_name),'withStreets':sum(bool(r['streets']) for r in by_name.values()),'withNeighborhoods':sum(bool(r['neighborhoods']) for r in by_name.values()),'selectedStreets':sum(len(r['streets']) for r in by_name.values()),'selectedNeighborhoods':sum(len(r['neighborhoods']) for r in by_name.values())},ensure_ascii=False))
