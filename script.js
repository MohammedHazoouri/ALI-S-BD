/*
  THE ALI ISSUE — personalisation
  Change the text in LETTER_TEXT below to make the note truly yours.
  You can also replace the four image files inside /assets (keep their filenames).
*/
const LETTER_TEXT = [
  "علي يا علي ...كيفك من جوا؟ كل عام وانت بخير يا صديقي 🥳عقبال ما تسافر وترتاح من الي كانت طلعت وتعيش مرتاح انت ورسماتك وحياتك الي رح تبنيها وانا متاكد انو يوما ما رح يحسدوك عليها.",
  "وثاق بحالك شوي والامور كلا تمام ... انت بجوز ما تحس باثرك بس حرفيا كنت دائما الدكتور النفسي النا والحدا الي دائما موجود يسمعنا ويحل مشاكلنا ويقدر وجودنا.",
  "قد تكون الفترة الماضية مرت عليك قاسية زيادة عن اللزوم بس متل الالماس لازم تضغطو مشان يظبط. شو ما درست انا رح اوثق فيك. كتير محظوظ إني بقدر سمّيك رفيقي — وإن شاء الله أحلى أيامك لساتها جاية!"
];

const letterBody = document.querySelector('#letter-body');
letterBody.lang = 'ar';
letterBody.dir = 'rtl';
LETTER_TEXT.forEach(text => {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  letterBody.appendChild(paragraph);
});

const progressBar = document.querySelector('#progress-bar');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealTargets = document.querySelectorAll('.section-heading, .gallery-card, .gallery-footnote, .letter-wrap, .letter-decoration');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const closeButton = document.querySelector('#lightbox-close');
let lastFocused = null;
function openLightbox(card) {
  lastFocused = document.activeElement;
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  document.querySelector('#lightbox-title').textContent = card.dataset.title;
  document.querySelector('#lightbox-note').textContent = card.dataset.note;
  document.querySelector('#lightbox-label').textContent = `A LITTLE PIECE OF ALI · ${card.dataset.title.toUpperCase()}`;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}
document.querySelectorAll('.gallery-card').forEach(card => card.addEventListener('click', () => openLightbox(card)));
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

const toast = document.querySelector('#toast');
let toastTimer;
function celebrate() {
  toast.textContent = 'A whole lot of love, headed your way. Happy birthday, Ali!';
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
  const colors = ['#8a2d36', '#d7aa63', '#a6ad96', '#e9e0d4'];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 34;
    const distance = 55 + Math.random() * 125;
    piece.style.cssText = `position:fixed;z-index:50;left:50%;top:52%;width:${5 + Math.random() * 6}px;height:${7 + Math.random() * 9}px;background:${colors[i % colors.length]};pointer-events:none;border-radius:${i % 3 ? '1px' : '50%'};`;
    document.body.appendChild(piece);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 60;
    piece.animate([{ transform: 'translate(-50%,-50%) scale(.3) rotate(0deg)', opacity: 1 }, { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(1) rotate(${180 + i * 17}deg)`, opacity: 0 }], { duration: 850 + Math.random() * 500, easing: 'cubic-bezier(.12,.72,.24,1)' }).onfinish = () => piece.remove();
  }
}
document.querySelector('#open-letter').addEventListener('click', celebrate);
