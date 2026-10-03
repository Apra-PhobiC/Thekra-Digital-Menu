const viewport = document.getElementById('menuViewport');
const sections = [...document.querySelectorAll('.vertical-section')];
const navItems = [...document.querySelectorAll('.nav-item')];

const flavorCards = [...document.querySelectorAll('#flavorTrack .product-card')];
const shakeCards = [...document.querySelectorAll('#shakeTrack .product-card')];

let currentFlavor = 0;
let currentShake = 0;

function sectionByCategory(cat){
  return sections.find(s => s.dataset.category === cat);
}
function jump(cat){
  const el = sectionByCategory(cat);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}
document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => jump(btn.dataset.jump)));

function updateActiveNav(){
  const y = viewport.scrollTop;
  let active = 'intro';
  for(const s of sections){
    if(y >= s.offsetTop - viewport.clientHeight * .45) active = s.dataset.category;
  }
  const navCategory = active === 'flavor-detail' ? 'flavors' :
                      active === 'shake-detail' ? 'milkshakes' : active;
  navItems.forEach(n => n.classList.toggle('active', n.dataset.jump === navCategory));
}
viewport.addEventListener('scroll', updateActiveNav, {passive:true});
updateActiveNav();

function setDetail(card, type){
  const title = card.dataset.title, ar = card.dataset.ar, price = card.dataset.price, desc = card.dataset.desc;
  if(type === 'flavor'){
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailAr').textContent = ar;
    document.getElementById('detailDesc').textContent = desc;
    document.getElementById('detailPrice').textContent = `SAR ${price}`;
    const visual = document.getElementById('detailVisual');
    visual.className = 'detail-visual product-visual ' + (['Mango','Raspberry','Chocolate','Vanilla','Strawberry','Melon'].includes(title) ? title.toLowerCase() : '');
    visual.innerHTML = '<div class="cup-lid"></div><div class="softserve"></div><div class="cup-body"><img src="assets/brand-mark.svg" alt=""></div>';
  } else {
    document.getElementById('shakeDetailTitle').textContent = title;
    document.getElementById('shakeDetailAr').textContent = ar;
    document.getElementById('shakeDetailDesc').textContent = desc;
    document.getElementById('shakeDetailPrice').textContent = `SAR ${price}`;
    const visual = document.getElementById('shakeDetailVisual');
    const cls = title === 'Oreo' ? 'oreo' : title === 'Lotus' ? 'lotus' : title === 'Chocolate' ? 'choco' : title === 'Strawberry' ? 'shake-strawberry' : 'shake-vanilla';
    visual.className = `shake-visual large-shake ${cls}`;
    visual.innerHTML = `<span>${title.toUpperCase()}</span>`;
  }
}
flavorCards.forEach((card,i)=>card.addEventListener('click',()=>{
  currentFlavor=i; setDetail(card,'flavor'); jump('flavor-detail');
}));
shakeCards.forEach((card,i)=>card.addEventListener('click',()=>{
  currentShake=i; setDetail(card,'shake'); jump('shake-detail');
}));

document.getElementById('nextFlavor').addEventListener('click',()=>{
  currentFlavor=(currentFlavor+1)%flavorCards.length;
  setDetail(flavorCards[currentFlavor],'flavor');
});
document.getElementById('nextShake').addEventListener('click',()=>{
  currentShake=(currentShake+1)%shakeCards.length;
  setDetail(shakeCards[currentShake],'shake');
});

function counter(track, counterEl){
  const cards=[...track.children];
  const update=()=>{
    const center=track.scrollLeft+track.clientWidth/2;
    let best=0, dist=Infinity;
    cards.forEach((c,i)=>{
      const ccenter=c.offsetLeft+c.offsetWidth/2;
      const d=Math.abs(ccenter-center);
      if(d<dist){dist=d;best=i;}
    });
    counterEl.textContent=`${String(best+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
  };
  track.addEventListener('scroll',update,{passive:true}); update();
}
counter(document.getElementById('flavorTrack'),document.getElementById('flavorCounter'));
counter(document.getElementById('shakeTrack'),document.getElementById('shakeCounter'));

document.getElementById('backBtn').addEventListener('click',()=>{
  const idx=sections.findIndex(s=>s.getBoundingClientRect().top >= -20);
  if(idx>0) sections[idx-1].scrollIntoView({behavior:'smooth'});
});
document.getElementById('menuBtn').addEventListener('click',()=>{
  document.querySelector('.bottom-nav').classList.toggle('open');
});

/* Gesture-friendly vertical navigation: only when the user is not horizontally scrolling a track. */
let startX=0,startY=0;
viewport.addEventListener('touchstart',e=>{
  if(!e.touches[0]) return;
  startX=e.touches[0].clientX; startY=e.touches[0].clientY;
},{passive:true});
viewport.addEventListener('touchend',e=>{
  if(!e.changedTouches[0]) return;
  const dx=e.changedTouches[0].clientX-startX;
  const dy=e.changedTouches[0].clientY-startY;
  if(Math.abs(dy)>70 && Math.abs(dy)>Math.abs(dx)*1.2){
    const current=sections.findIndex(s=>Math.abs(s.getBoundingClientRect().top)<viewport.clientHeight*.35);
    if(dy<0 && current<sections.length-1) sections[current+1].scrollIntoView({behavior:'smooth'});
    if(dy>0 && current>0) sections[current-1].scrollIntoView({behavior:'smooth'});
  }
},{passive:true});
