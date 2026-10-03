const $ = (s) => document.querySelector(s);
const scenes = [...document.querySelectorAll('.scene')];
const goTo = (id) => {
  scenes.forEach(s => s.classList.toggle('active', s.id === id));
};

const envelope = $('#open-envelope');
const openEnvelope = () => {
  envelope.classList.add('open');
  setTimeout(() => goTo('scene-box'), 850);
};
envelope.addEventListener('click', openEnvelope);
$('#open-letter').addEventListener('click', openEnvelope);

const box = $('#open-box');
const openBox = () => {
  box.classList.add('open');
  setTimeout(() => goTo('scene-memories'), 700);
};
box.addEventListener('click', openBox);
$('#try-box').addEventListener('click', openBox);

let memoriesOpened = 0;
document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', () => {
  if (card.classList.contains('open')) return;
  card.classList.add('open');
  memoriesOpened++;
  if (memoriesOpened === 4) setTimeout(() => $('#to-key').classList.remove('hidden'), 550);
}));
$('#to-key').addEventListener('click', () => goTo('scene-key'));
$('#open-key').addEventListener('click', () => goTo('scene-album'));

let page = 0;
const book = $('#book');
book.addEventListener('click', () => {
  page++;
  book.className = `book page-${Math.min(page, 4)}`;
  if (page === 4) $('#book-hint').textContent = 'thêm một lần nữa nhé';
  if (page >= 5) {
    goTo('scene-letter');
    writeLetter();
  }
});

const paragraphs = [
  'Chúc mừng sinh nhật nhé.',
  'Tớ không biết phải nói thế nào cho thật hay, nên tớ chỉ muốn nói rằng…',
  'Cảm ơn cậu vì đã xuất hiện trong cuộc sống của tớ.',
  'Mong tuổi mới của cậu sẽ có thật nhiều niềm vui, nhiều điều bất ngờ và những ngày bình yên.',
  'Mong rằng những điều cậu đang cố gắng sẽ dần trở thành những điều khiến cậu mỉm cười.',
  'Và dù sau này có thêm bao nhiêu tuổi đi nữa, hãy vẫn là cậu — một người rất đặc biệt.',
  'Happy Birthday ♡'
];
function writeLetter() {
  const target = $('#typed-text'); let i = 0;
  const next = () => {
    if (i >= paragraphs.length) { $('#celebrate').classList.remove('hidden'); return; }
    const p = document.createElement('p'); target.appendChild(p);
    const words = paragraphs[i].split(' '); let w = 0;
    const type = () => {
      p.textContent += (w ? ' ' : '') + words[w++];
      if (w < words.length) setTimeout(type, 55);
      else { i++; setTimeout(next, 260); }
    }; type();
  }; next();
}

$('#celebrate').addEventListener('click', () => {
  const confetti = $('#confetti');
  const colors = ['#d88982','#edc66d','#f5eee0','#b893c8','#99baa3'];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty('--x', `${(Math.random() - .5) * 260}px`);
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * .55}s`;
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
  $('#celebrate').textContent = 'Happy Birthday, cậu ♡';
});

const music = $('#music');
const musicToggle = $('#music-toggle');
const showToast = (message) => {
  $('#toast').textContent = message;
  $('#toast').style.opacity = 1;
  setTimeout(() => $('#toast').style.opacity = 0, 2600);
};

musicToggle.addEventListener('click', async () => {
  if (!music.querySelector('source')?.src) {
    showToast('Chưa tìm thấy file nhạc nhé ♫');
    return;
  }

  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add('playing');
      $('.music-label').textContent = 'Tắt nhạc';
      musicToggle.setAttribute('aria-label', 'Tắt nhạc nền');
    } catch (error) {
      console.error('Không thể phát nhạc:', error);
      showToast('Không thể phát nhạc. Hãy mở trang qua Live Server rồi thử lại nhé.');
    }
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
    $('.music-label').textContent = 'Bật nhạc';
    musicToggle.setAttribute('aria-label', 'Bật nhạc nền');
  }
});
