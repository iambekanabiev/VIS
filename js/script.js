// ── INTRO ──
const intro=document.getElementById('intro');
setTimeout(()=>{intro.classList.add('out');setTimeout(()=>intro.style.display='none',650)},3000);

// ── NAV ──
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

// ── HAMBURGER ──
const ham=document.getElementById('ham'),mob=document.getElementById('mobnav');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open')});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');mob.classList.remove('open')}));

// ── REVEAL ──
const allReveal=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const ro=new IntersectionObserver(entries=>entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*80);ro.unobserve(e.target)}}),{threshold:0.1});
allReveal.forEach(el=>ro.observe(el));

// ── FAQ ──
document.getElementById('faqList').addEventListener('click',e=>{
  const item=e.target.closest('.faq-item');
  if(!item)return;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen)item.classList.add('open');
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-76,behavior:'smooth'})}
}));

// ── FORM ──
document.getElementById('driverForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('.btn-submit-form');
  const orig=btn.textContent;
  btn.textContent='✓ Application Sent!';btn.style.background='#16a34a';btn.disabled=true;
  setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.disabled=false;e.target.reset()},4000);
});