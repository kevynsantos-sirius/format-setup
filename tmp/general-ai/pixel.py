from PIL import Image,ImageChops,ImageDraw
from pathlib import Path
import json
p=Path('output/general-ai-validation')
a,b=Image.open(p/'preview-before.png').convert('RGB'),Image.open(p/'preview-after.png').convert('RGB')
assert a.size==b.size
mask=Image.new('L',a.size,0);draw=ImageDraw.Draw(mask)
areas=[(225.8,25.3,410.5,294.8),(19.8,14.8,100.3,30.3)]
rects=[]
for area in areas:
 x1,y1,x2,y2=area;rect=(int(x1*96/25.4)-2,int(y1*96/25.4)-2,int(x2*96/25.4)+3,int(y2*96/25.4)+3);rects.append(rect);draw.rectangle(rect,fill=255)
diff=ImageChops.difference(a,b);outside=Image.composite(Image.new('RGB',a.size),diff,mask)
assert outside.getbbox() is None,'Pixels changed outside reviewed areas'
for label,im in [('antes',a),('depois',b)]:im.crop(rects[1]).save(p/f'novo-texto-{label}.png')
(p/'pixel-validation.json').write_text(json.dumps({'passed':True,'size':a.size,'reviewedAreasMm':areas,'outsideReviewedAreasChanged':False},indent=2))
print('Pixels outside the two reviewed areas unchanged')
