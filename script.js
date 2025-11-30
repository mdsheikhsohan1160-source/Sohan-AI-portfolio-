/* script.js - menu, dark mode, smooth scroll, simple reveal */

const navMenu = document.querySelector('.nav');
const hamburgerBtn = document.querySelector('.hamburger');

function toggleMenu(){
  if(!navMenu) return;
  if(navMenu.style.display === 'flex'){
    navMenu.style.display = '';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.right = '20px';
    navMenu.style.top = '64px';
    navMenu.style.background = 'rgba(0,0,0,0.6)';
    navMenu.style.padding = '12px';
    navMenu.style.borderRadius = '10px';
  }
}

/* Dark / Light toggle: remember preference */
function toggleTheme(){
  document.body.classList.toggle('light');
  const nowLight = document.body.classList.contains('light');
  try{ localStorage.setItem('themeLight', nowLight ? '1' : '0') }catch(e){}
}
(function restoreTheme(){
  try{
    const v = localStorage.getItem('themeLight');
    if(v === '1') document.body.classList.add('light');
  }catch(e){}
})();

/* Smooth scroll for all internal links */
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if(el){
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({top, behavior:'smooth'});
    // hide mobile nav after click
    if(window.innerWidth < 700 && navMenu){
      navMenu.style.display = '';
    }
  }
});

/* Simple reveal on scroll */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
