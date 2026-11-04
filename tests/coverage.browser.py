from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from pathlib import Path
from urllib.parse import urlparse,parse_qs
import json,os
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
c=json.loads((root/'dist/coverage-manifest.json').read_text());index=json.loads((root/'dist/assets/municipios.json').read_text())
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(root/'dist')))
Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}'
try:
 with sync_playwright() as p:
  for engine in os.environ.get('TEST_ENGINES','chromium,webkit').split(','):
   browser=getattr(p,engine).launch()
   for width in [320,390,768,1440]:
    page=browser.new_page(viewport={'width':width,'height':900},reduced_motion='reduce');errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
    for province in ['madrid','bizkaia']:
     row=next(a for a in c['assignments'] if a['provinceSlug']==province and a['original']!=a['destination'])
     page.goto(base+'/',wait_until='domcontentloaded');page.locator('#town-query').fill(row['name'])
     link=page.locator('#town-results a').filter(has_text=row['name']).first;link.wait_for();assert link.get_attribute('href')==row['url'];link.click()
     page.locator('#cobertura-'+row['code']).wait_for();page.wait_for_function('(name)=>document.querySelector("#request-town").value===name',arg=row['name'])
     page.wait_for_function('!document.querySelector("#request-place").disabled')
     assert row['name'] in page.locator('#preparar-aviso h2').inner_text()
     source=next(r for r in index if r['code']==row['code']);options=page.locator('#request-place option').all_text_contents();assert options[1:]==source['requestPlaces'],(row['name'],options,source['requestPlaces'])
     page.locator('[data-coverage-enquiry="'+row['code']+'"]').click();page.locator('#request-problem').select_option(label='He perdido las llaves')
     url=page.locator('#request-link').get_attribute('href');assert urlparse(url).path==('/34614789945' if province=='madrid' else '/34641589394');assert row['name'] in parse_qs(urlparse(url).query)['text'][0]
     for a in page.locator('[data-local-whatsapp]').all():assert row['name'] in parse_qs(urlparse(a.get_attribute('href')).query)['text'][0]
     assert 'Cerrajero urgente' in page.locator('h1').inner_text() and row['hub'] in page.locator('h1').inner_text()
     assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(engine,width,row['name'],'overflow',page.evaluate('Array.from(document.querySelectorAll("body *")).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>[e.tagName,e.className,e.getBoundingClientRect().right]).slice(0,12)'))
     if width==390:
      (root/'reports').mkdir(exist_ok=True);page.locator('#preparar-aviso').screenshot(path=str(root/f'reports/aviso-{province}-{engine}.png'))
     assert not errors,errors
    page.goto(base+'/',wait_until='domcontentloaded');assert page.locator('.customer-examples').count()==0
    if width<=390:
     page.locator('.menu-toggle').click();assert page.locator('#main-nav').is_visible();page.keyboard.press('Escape')
    page.close()
   ctx=browser.new_context(java_script_enabled=False);page=ctx.new_page();row=next(a for a in c['assignments'] if a['original']!=a['destination']);page.goto(base+row['url']);assert page.locator('#cobertura-'+row['code']).is_visible();assert page.locator('#request-town option').filter(has_text=row['name']).count()==1;ctx.close();browser.close()
 print('NAVEGADORES OK: búsqueda, municipio, callejero propio, WhatsApp de zona, cobertura sin JS y cuatro anchuras; sin enviar mensajes.')
finally:server.shutdown()
