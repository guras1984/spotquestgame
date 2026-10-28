// Original vector artwork: each scene is drawn from a recipe, with explicit local edits.
export const LEVELS={easy:{name:'쉬움',icon:'🌱',count:3,time:0,hints:2,penalty:0,detail:0},normal:{name:'보통',icon:'🔎',count:5,time:120,hints:2,penalty:5,detail:1},hard:{name:'어려움',icon:'🏆',count:7,time:90,hints:2,penalty:5,detail:2},hell:{name:'지옥',icon:'🔥',count:15,time:45,hints:0,penalty:Infinity,detail:3}};
const recipes=[
['forest','숲속의 피크닉','FOREST PICNIC','#a8c8b0','#cad8a3',['tree','flower','basket','mushroom','butterfly']],
['forest','여우의 비밀 정원','SECRET GARDEN','#b9c5b4','#c8cb8d',['tree','flower','bird','pot','mushroom']],
['forest','가을 숲 산책','AUTUMN WALK','#dcc1a1','#c9b078',['tree','mushroom','basket','bird','flower']],
['ocean','산호초 탐험','CORAL REEF','#80bcbc','#e5cf9d',['fish','coral','shell','star','seaweed']],
['ocean','깊은 바다의 보물','DEEP BLUE','#61949d','#c7b79b',['fish','chest','coral','shell','seaweed']],
['ocean','해파리의 산책','JELLYFISH BAY','#91bfc5','#cfcbb0',['jelly','fish','shell','coral','star']],
['cafe','햇살 가득 카페','SUNNY CAFE','#e8d8be','#b7c4a3',['cup','cake','pot','book','bottle']],
['cafe','고양이의 디저트 가게','DESSERT HOUSE','#e2c4b9','#c6ae8b',['cake','cup','cat','bottle','pot']],
['cafe','작은 빵집의 아침','MORNING BAKERY','#e7cc9c','#b8b899',['bread','cup','basket','cake','pot']],
['room','장난감 다락방','TOY ATTIC','#c6d6d6','#c8b499',['robot','ball','block','bear','rocket']],
['room','별을 읽는 서재','LITTLE LIBRARY','#bdc8b5','#cbb99a',['book','pot','clock','bottle','cat']],
['room','화가의 작업실','ART STUDIO','#dfcfbe','#b8c4b3',['frame','bottle','pot','book','cup']],
['castle','마법사의 온실','MAGIC GREENHOUSE','#aebcc2','#b9bd9c',['potion','pot','star','book','flower']],
['castle','달빛 아래 마법의 성','MOONLIGHT CASTLE','#9ba6c0','#aaa99f',['potion','chest','flag','book','star']],
['castle','용의 보물 창고','DRAGON TREASURY','#b8a8b5','#b9aa8f',['chest','potion','star','flag','book']],
['space','작은 우주 정거장','SPACE STATION','#344c65','#8c9b9e',['rocket','robot','planet','satellite','star']],
['space','달 토끼의 연구소','MOON LAB','#46546b','#a3adb2',['robot','potion','satellite','planet','rocket']],
['space','토성으로 가는 길','SATURN EXPRESS','#4d4b69','#9c99b2',['planet','rocket','star','satellite','robot']],
['camp','호숫가 캠핑','LAKESIDE CAMP','#a8c7cb','#b4c09c',['tent','tree','lantern','cup','basket']],
['camp','산속의 작은 휴식','MOUNTAIN REST','#b6c5b7','#bdc39f',['tree','tent','mushroom','lantern','bird']],
['camp','노을 아래 캠프파이어','SUNSET CAMP','#deb3a1','#b9b08d',['tent','lantern','tree','basket','cup']],
['market','꽃이 피는 시장','FLOWER MARKET','#dfd5bb','#b7c1a0',['flower','pot','basket','bottle','flag']],
['market','과일 가게의 하루','FRUIT MARKET','#d7c9ac','#c9b899',['basket','apple','bottle','pot','bread']],
['market','바닷마을 벼룩시장','SEASIDE MARKET','#bad2cd','#cdbd9d',['shell','frame','book','bottle','flag']],
['park','회전목마의 오후','CAROUSEL PARK','#c5d8d2','#c5cca2',['balloon','flag','ball','bear','flower']],
['park','동물 친구들의 소풍','ANIMAL PICNIC','#c4d7bc','#b4c494',['cat','bear','bird','basket','flower']],
['park','풍선 축제가 열린 날','BALLOON FESTIVAL','#d5d6c1','#c4ca9f',['balloon','flag','cake','ball','pot']],
['kitchen','할머니의 주방','GRANDMA KITCHEN','#e1d4be','#b9c2b1',['pot','cup','bread','apple','bottle']],
['kitchen','딸기잼 만드는 날','STRAWBERRY JAM','#e9cdc0','#c7baa0',['bottle','apple','basket','cup','cake']],
['kitchen','작은 찻집의 선반','TEA CUPBOARD','#d3d8be','#b8c4ab',['cup','pot','bottle','book','flower']]];
export const SCENES=recipes.map((r,id)=>({id,type:r[0],name:r[1],en:r[2],sky:r[3],ground:r[4],props:r[5]}));
export function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
export function shuffle(a,random=Math.random){const b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
const palette=['#cf7967','#e1b963','#6f9f88','#91a7b4','#ad8fa8','#c98d59'];
const rect=(x,y,w,h,c,r=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
const circle=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const path=(d,c)=>`<path d="${d}" fill="${c}"/>`;
const line=(x,y,a,b,c='#627768',w=3)=>`<path d="M${x} ${y}L${a} ${b}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
// Detail is always confined to the small area around (12,-8); hit boxes follow it.
function prop(kind,c,alt,detail){let shape='',decor='';const dark='#465d54',cream='#fff0cf';
 switch(kind){
 case 'tree':shape=rect(-6,0,12,40,'#967756')+circle(-13,-14,27,c)+circle(14,-27,29,c)+circle(31,-4,23,c);decor=path('M7 -9Q13 -22 22 -9Q17 0 7 -9',alt?'#dcad60':'#4e8565');break;
 case 'flower':shape=rect(-17,17,34,23,'#c18e70')+line(0,18,0,-19)+line(0,10,-18,0)+circle(0,-24,13,c)+circle(-15,-16,12,c)+circle(-8,-1,12,c)+circle(11,-1,12,c)+circle(17,-19,12,c)+circle(0,-14,10,cream);decor=circle(12,-8,detail===3?3.5:5,alt?'#765d56':cream);break;
 case 'pot':shape=path('M-25 0H25L19 37H-19Z',c)+rect(-28,-4,56,9,c)+line(0,-4,0,-36)+path('M0 -13Q-41 -40 -27 -43Q-2 -43 0 -13M0 -21Q34 -53 36 -30Q20 -12 0 -21','#6c9670');decor=path('M6 -9Q12 -24 22 -10L14 -4Z',alt?'#bd9b62':'#7faa7b');break;
 case 'fish':shape=path('M-28 0L-48 -21V21Z',c)+`<ellipse cx="0" cy="0" rx="34" ry="23" fill="${c}"/>`+path('M-10 -18L0 -37L14 -17',c)+circle(21,-5,3,dark);decor=path(alt?'M5 -14L15 -5L9 -1Z':'M5 -14L10 -5L15 -1Z',cream);break;
 case 'seaweed':shape=path('M-23 35Q-48 8 -23 -9Q-5 -28 -21 -46Q9 -29 -10 -4Q-20 15 -8 35M0 35Q24 8 5 -10Q-7 -27 12 -45Q4 -22 26 -7Q44 15 17 35','#5d947f');decor=path('M7 -11Q23 -22 24 -7Q16 0 7 -11',alt?'#c7bd76':'#88b995');break;
 case 'coral':shape=line(0,35,0,-20,c,10)+line(0,9,-25,-13,c,9)+line(-25,-13,-25,-34,c,8)+line(0,0,28,-26,c,9)+line(28,-26,40,-26,c,8);decor=circle(12,-8,alt?6:3,cream);break;
 case 'shell':shape=path('M-28 13Q-48 -13 -22 -29Q-10 -49 0 -29Q18 -49 29 -26Q51 -9 28 14L8 29H-8Z',c)+line(-1,18,-20,-21,cream)+line(0,18,0,-25,cream);decor=line(12,-8,alt?25:18,-23,cream,detail===3?2:3);break;
 case 'star':shape=path('M0 -39L10 -13L38 -13L17 4L25 32L0 15L-26 32L-16 4L-38 -13L-10 -13Z',c)+circle(-8,-5,2,dark);decor=circle(12,-8,alt?4:2,dark);break;
 case 'jelly':shape=path('M-34 0Q-34 -48 0 -48Q34 -48 34 0Z',c)+line(-22,0,-26,27,c,5)+line(-4,0,0,37,c,5)+line(18,0,27,29,c,5)+circle(-10,-13,3,dark);decor=circle(12,-8,alt?5:3,dark);break;
 case 'cup':shape=path('M-26 -25H24V18Q24 33 0 33Q-26 33 -26 18Z',c)+`<ellipse cx="29" cy="0" rx="14" ry="16" fill="none" stroke="${c}" stroke-width="8"/>`+rect(-34,33,74,6,cream);decor=alt?rect(7,-13,10,10,cream,1):circle(12,-8,5,cream);break;
 case 'cake':shape=rect(-32,0,64,32,c)+rect(-32,-18,64,23,cream)+path('M-33 -17Q-15 -42 0 -33Q16 -42 33 -17Z',c)+circle(-14,-24,5,'#a45e50');decor=circle(12,-8,alt?'6':'3','#a45e50');break;
 case 'bread':shape=rect(-36,-25,72,54,'#d7a461',23)+line(-21,-17,-29,-4,cream,4)+line(-2,-20,-10,-6,cream,4);decor=line(10,-8,alt?22:17,alt?-8:-18,cream,detail===3?2:4);break;
 case 'bottle':case 'potion':shape=rect(-10,-42,20,21,cream)+rect(-13,-46,26,8,'#886854')+path('M-10 -24Q-33 -10 -29 14Q-30 34 0 34Q30 34 29 14Q33 -10 10 -24Z',cream)+path('M-27 -3Q0 4 27 -3L27 17Q25 30 0 30Q-25 30 -27 17Z',c);decor=circle(12,-8,alt?6:3,c);break;
 case 'book':shape=rect(-29,-36,58,73,c)+rect(-23,26,51,8,cream)+rect(-29,-36,7,69,dark)+rect(-13,-23,33,5,cream);decor=rect(8,-13,alt?5:9,10,cream,1);break;
 case 'basket':shape=`<path d="M-25 -8Q-25 -51 0 -51Q25 -51 25 -8" fill="none" stroke="#a48055" stroke-width="5"/>`+path('M-36 -12H36L27 33H-27Z','#be9a62')+line(-30,1,30,1,cream,2)+line(-27,16,27,16,cream,2)+circle(-13,-16,12,c);decor=path('M7 -12L18 -12L18 -3L7 -3Z',alt?'#698a62':c);break;
 case 'mushroom':shape=rect(-9,-3,18,39,cream)+path('M-39 -5Q-35 -49 0 -49Q35 -49 39 -5Z',c)+circle(-16,-19,5,cream);decor=circle(12,-8,alt?7:4,cream);break;
 case 'bird':case 'butterfly':shape=kind==='bird'?circle(0,0,25,c)+circle(19,-21,16,c)+path('M32 -23L48 -18L32 -13',cream)+path('M-22 0L-45 -9L-31 17',c)+circle(24,-25,3,dark):`<ellipse cx="-19" cy="-14" rx="19" ry="26" fill="${c}"/><ellipse cx="19" cy="-14" rx="19" ry="26" fill="${c}"/>`+circle(-17,16,16,c)+circle(17,16,16,c)+rect(-3,-30,6,64,dark);decor=path(alt?'M6 -12L18 -12L18 -4L6 -4Z':'M6 -12L18 -8L6 -4Z',cream);break;
 case 'cat':case 'bear':shape=circle(-20,-29,13,c)+circle(20,-29,13,c)+circle(0,-10,31,c)+`<ellipse cy="27" rx="24" ry="22" fill="${c}"/>`+circle(-12,-9,3,dark)+circle(0,1,3,dark)+line(-5,8,5,8,dark,2);decor=alt?line(8,-8,16,-8,dark,3):circle(12,-8,3,dark);break;
 case 'robot':shape=rect(-27,-34,54,48,c,9)+rect(-19,15,38,27,c)+line(0,-35,0,-45,dark)+circle(0,-48,4,c)+rect(-18,-15,10,10,cream)+rect(-13,1,26,4,dark);decor=rect(8,-13,alt?5:9,10,cream,1);break;
 case 'rocket':shape=path('M-18 23V-21Q0 -57 18 -21V23Z',c)+path('M-18 0L-32 27L-18 21M18 0L32 27L18 21',cream)+path('M-8 25L0 45L9 25','#e7b75e')+circle(0,-18,11,cream);decor=circle(12,-8,alt?5:3,dark);break;
 case 'planet':shape=circle(0,0,32,c)+`<ellipse cx="0" cy="6" rx="48" ry="11" transform="rotate(-23)" fill="none" stroke="${cream}" stroke-width="6"/>`+circle(-13,-14,6,'#ffffff44');decor=circle(12,-8,alt?6:3,'#ffffff77');break;
 case 'satellite':shape=rect(-12,-20,24,44,cream)+rect(-49,-12,31,30,c)+rect(18,-12,31,30,c)+line(-18,0,18,0,dark)+line(0,-20,12,-36,dark);decor=rect(8,-13,alt?10:5,10,dark,1);break;
 case 'ball':shape=circle(0,0,34,c)+path('M-30 -16Q0 0 -15 30L0 33Q18 0 0 -34Z',cream);decor=circle(12,-8,alt?7:4,cream);break;
 case 'balloon':shape=`<ellipse cy="-14" rx="29" ry="34" fill="${c}"/>`+path('M0 19L-6 27H6Z',c)+line(0,27,10,49,dark,2)+`<ellipse cx="-12" cy="-25" rx="5" ry="10" fill="${cream}"/>`;decor=circle(12,-8,alt?6:3,cream);break;
 case 'block':shape=rect(-32,-30,64,64,c,7)+rect(-23,-21,46,46,cream,4)+path('M-10 15L0 -12L10 15H5L0 1L-5 15Z',c);decor=rect(8,-12,alt?5:10,8,c,1);break;
 case 'tent':shape=path('M-45 33L0 -47L45 33Z',c)+path('M-20 33L0 -10L20 33Z',dark)+line(-50,34,50,34,cream,3);decor=line(8,-8,alt?17:12,alt?-3:-16,cream,3);break;
 case 'lantern':shape=rect(-24,-22,48,48,c,7)+rect(-16,-16,32,34,cream,4)+rect(-30,25,60,9,c)+line(-16,-24,-10,-42,dark)+line(-10,-42,10,-42,dark)+line(10,-42,16,-24,dark)+rect(-4,-14,8,39,c);decor=line(12,-14,12,alt?-3:-8,c,4);break;
 case 'flag':shape=line(-25,40,-25,-43,dark,4)+path('M-23 -42H35L23 -20L35 0H-23Z',c);decor=alt?rect(7,-13,10,10,cream):circle(12,-8,5,cream);break;
 case 'chest':shape=rect(-37,-25,74,59,c,9)+rect(-37,-2,74,7,'#856847')+rect(-25,-25,7,59,'#dec17e')+rect(22,-25,7,59,'#dec17e')+rect(-6,-5,12,16,'#dec17e');decor=circle(12,-8,alt?5:2,'#725b43');break;
 case 'clock':shape=circle(0,0,35,c)+circle(0,0,27,cream)+line(0,0,0,-19,dark)+line(0,0,-14,7,dark)+circle(0,0,3,dark);decor=line(10,-8,alt?18:12,-17,dark,detail===3?2:3);break;
 case 'frame':shape=rect(-35,-37,70,74,c)+rect(-27,-29,54,58,cream)+path('M-26 26L-5 -5L7 10L25 -10V28Z','#83a58a');decor=circle(12,-8,alt?7:4,'#d9b05f');break;
 case 'apple':shape=circle(-11,2,24,c)+circle(13,2,24,c)+line(1,-21,5,-39,'#866b4c',4)+path('M3 -29Q21 -47 29 -31Q17 -22 3 -29','#7d9d69');decor=alt?line(9,-13,15,-3,cream,4):circle(12,-8,4,cream);break;
 default:shape=circle(0,0,28,c);decor=circle(12,-8,alt?7:3,cream);
 }
 if(alt&&detail===0)return `<g opacity=".12">${shape}${decor}</g>`;
 if(alt&&detail===1)shape=shape.split(c).join(palette[(palette.indexOf(c)+2)%palette.length]);
 return shape+decor;
}
export function objects(scene){const r=rng(scene.id*731+43);return Array.from({length:25},(_,i)=>{let row=Math.floor(i/5),col=i%5;return{id:i,x:85+col*155+(r()-.5)*38,y:100+row*105+(r()-.5)*15,kind:scene.type==='forest'&&row<2?(['tree','bird','butterfly'][(i+scene.id)%3]):scene.props[(i+Math.floor(r()*3))%scene.props.length],color:palette[(i+scene.id)%palette.length],scale:.80+r()*.18}})}
export function candidates(scene,level){return objects(scene).map(o=>({id:o.id,x:o.x+12*o.scale,y:o.y-8*o.scale,r:level==='easy'?38:level==='normal'?28:level==='hard'?20:16}))}
export function createQuestion(scene,level,random=Math.random){const cfg=LEVELS[level];return{sceneId:scene.id,level,ids:shuffle(candidates(scene,level),random).slice(0,cfg.count).map(d=>d.id)}}
function backdrop(s){let out=rect(0,0,800,600,s.sky)+rect(0,365,800,235,s.ground);const indoor=['cafe','room','kitchen','castle'].includes(s.type);if(indoor){for(let x=40;x<800;x+=115)out+=rect(x,0,2,365,'#ffffff20');out+=rect(290,28,220,137,'#f3e7c8',35)+rect(300,38,200,116,'#b7cfbf',28)+line(400,38,400,153,'#f3e7c8',8)+line(300,96,500,96,'#f3e7c8',8);for(let y of [149,256,362])out+=rect(24,y,752,13,'#ad9476',3)+rect(36,y+13,728,6,'#0000000b');out+=path('M0 600L170 372M300 600L350 372M600 600L550 372M800 600L720 372','none').replace('fill="none"','stroke="#ffffff25" stroke-width="2"');}
 else if(s.type==='ocean'){for(let i=0;i<22;i++)out+=circle(20+(i*137)%780,30+(i*83)%490,4+(i%3)*3,'#ffffff22');out+=path('M0 500Q200 430 400 510T800 485V600H0Z','#dac79d')+path('M0 560Q220 510 450 555T800 540V600H0Z','#e6d5ae');}
 else if(s.type==='space'){for(let i=0;i<90;i++)out+=circle((i*137+35)%800,(i*97+20)%420,i%4===0?2:1,'#f2dfb7');out+=path('M0 450Q200 340 400 445T800 430V600H0Z',s.ground);for(let i=0;i<8;i++)out+=`<ellipse cx="${i*119+25}" cy="${460+i%3*55}" rx="${25+i%3*12}" ry="8" fill="#00000010"/>`;}
 else{out+=circle(692,58,32,'#fff0be')+path('M0 252Q140 105 280 260Q440 105 620 260Q720 160 800 240V390H0Z','#8fae91')+path('M0 320Q180 210 370 330Q580 210 800 320V450H0Z','#9eb793');if(s.type==='camp')out+=path('M0 320Q220 290 430 350T800 330V440H0Z','#a3c6c2');if(s.type==='market')out+=rect(25,25,750,50,'#fff0cf')+Array.from({length:15},(_,i)=>rect(25+i*50,25,25,55,'#c88671')).join('');if(s.type==='park')out+=`<circle cx="400" cy="205" r="155" fill="none" stroke="#f4e5c8" stroke-width="9"/>`+line(400,205,310,390,'#f4e5c8',9)+line(400,205,490,390,'#f4e5c8',9);out+=path('M305 600Q480 470 410 365L463 365Q560 480 430 600Z','#e1d2ad');}
 if(s.type==='forest'||s.type==='camp'){
 // Large, permanent scenery provides a continuous landscape behind the puzzle objects.
 out+=path('M0 0H65L57 380H14Z','#6d795a')+path('M734 0H789L800 400H751Z','#7b8060')+path('M35 96Q130 22 225 74L219 88Q133 53 42 120Z','#6d795a')+path('M770 146Q664 85 575 121L580 136Q678 111 762 169Z','#7b8060');
 for(let i=0;i<9;i++)out+=circle((i*117)%850,-8+(i%3)*17,60,'#6e9579');
 out+=path('M0 270Q210 215 400 290T800 270V600H0Z',s.ground);
 out+=path('M230 600Q390 460 470 290L515 290Q490 490 380 600Z','#e5d5ad');
 out+=`<path d="M420 385L640 405L609 506L397 480Z" fill="#eee3c1"/><path d="M420 385L640 405L609 506L397 480Z" fill="none" stroke="#bb806b" stroke-width="5" stroke-dasharray="12 13"/>`;
 }
 if(s.type==='cafe'||s.type==='kitchen')out+=rect(25,460,750,18,'#b29b7e')+rect(50,478,17,122,'#a38a70')+rect(733,478,17,122,'#a38a70');
 if(s.type==='room')out+=`<ellipse cx="400" cy="530" rx="280" ry="60" fill="#e3c99d" opacity=".6"/>`;
 return out;
}
export function renderScene(scene,question=null,modified=false){const detail=question?LEVELS[question.level].detail:0;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${scene.name}${modified?' 비교 그림':' 원본 그림'}"><defs><filter id="grain${scene.id}${modified?'b':'a'}"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".035"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs>${backdrop(scene)}${objects(scene).map(o=>`<g transform="translate(${o.x} ${o.y}) scale(${o.scale})">${`<ellipse cy="41" rx="35" ry="5" fill="#233d3212"/>`}${prop(o.kind,o.color,modified&&question?.ids.includes(o.id),detail)}</g>`).join('')}<rect width="800" height="600" filter="url(#grain${scene.id}${modified?'b':'a'})" opacity=".25" pointer-events="none" fill="transparent"/></svg>`}
