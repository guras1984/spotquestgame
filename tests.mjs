import assert from 'node:assert/strict';
import{SCENES,LEVELS,objects,candidates,createQuestion,renderScene,rng,findHit}from'./scenes.js';
assert.equal(SCENES.length,30);
for(const s of SCENES)for(const key of Object.keys(LEVELS)){
 const q=createQuestion(s,key,rng(s.id+42));assert.equal(q.ids.length,LEVELS[key].count);assert.equal(new Set(q.ids).size,q.ids.length);
 const groups=svg=>svg.split('<g data-object=').slice(1).map(x=>x.split('</svg>')[0].split('<rect width=')[0]);
 const ga=groups(renderScene(s,q,false)),gb=groups(renderScene(s,q,true));assert.equal(ga.filter((g,i)=>g!==gb[i]).length,q.ids.length);
 for(const d of candidates(s,key)){assert(d.x-d.r>=0&&d.x+d.r<800&&d.y-d.r>=0&&d.y+d.r<600);assert.equal(findHit(s,key,[d.id],d.x+48,d.y)?.id,d.id);assert.equal(findHit(s,key,[d.id],d.x,d.y-48)?.id,d.id);assert.equal(findHit(s,key,[d.id],d.x+65,d.y),null)}
 assert.equal(findHit(s,key,q.ids,0,0),null);
}
assert.equal(LEVELS.hell.count,15);assert.equal(LEVELS.hell.time,45);assert.equal(LEVELS.hell.hints,0);
console.log('PASS: all 120 scene/level combinations; exact shape swaps, generous nearby hits, blank-space rejection.');
