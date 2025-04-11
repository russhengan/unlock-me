// script.js

// Utility function to switch screens
function showScreen(id) {
    document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  
  // Falling hearts setup
  function createFallingHearts() {
    const container = document.createElement('div');
    container.id = 'heart-container';
    document.body.appendChild(container);
  
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'falling-heart';
      heart.textContent = '💖';
      heart.style.left = Math.random() * 100 + 'vw';
      container.appendChild(heart);
  
      setTimeout(() => {
        heart.remove();
      }, 7000);
    }, 500);
  }
  
  // Show modal with typewriter effect
  function showModal(title, message, nextScreenId) {
    const modal = document.getElementById('popup-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalBtn = document.getElementById('modal-btn');
  
    modalTitle.textContent = title;
    modalMessage.innerHTML = '';
    modal.classList.add('show');
  
    let i = 0;
    modalBtn.style.display = 'none';
  
    const typeInterval = setInterval(() => {
      if (i < message.length) {
        modalMessage.innerHTML += message.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        modalBtn.style.display = 'inline-block';
      }
    }, 30);
  
    modalBtn.onclick = () => {
      modal.classList.remove('show');
      showScreen(nextScreenId);
    };
  }
  
  // Background music toggle
  let music;
  function setupMusic() {
    music = new Audio('assets/Ed Sheeran - Perfect Duet (with Beyoncé) [Official Audio].mp3');
    music.loop = true;
    const toggle = document.getElementById('music-toggle');
    toggle.onclick = () => {
      if (music.paused) {
        music.play();
        toggle.textContent = '🔊 Music On';
      } else {
        music.pause();
        toggle.textContent = '🔇 Music Off';
      }
    };
  }
  
  // LEVEL 1 - MEMORY MATCH
  const emojis = ['💋', '🌸', '🍓', '💍', '🐻', '🎀'];
  let firstCard = null;
  let matchedPairs = 0;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function startLevel1() {
    showScreen('level1');
    const board = document.getElementById('memory-game');
    board.innerHTML = '';
    const cards = shuffle([...emojis, ...emojis]);
    cards.forEach((emoji) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.textContent = '?';
      card.dataset.emoji = emoji;
      card.onclick = () => flipCard(card);
      board.appendChild(card);
    });
    matchedPairs = 0;
    firstCard = null;
  }
  
  function flipCard(card) {
    if (card.textContent !== '?') return;
    card.textContent = card.dataset.emoji;
    if (!firstCard) {
      firstCard = card;
    } else {
      if (firstCard.dataset.emoji === card.dataset.emoji) {
        matchedPairs++;
        firstCard = null;
      } else {
        setTimeout(() => {
          card.textContent = '?';
          firstCard.textContent = '?';
          firstCard = null;
        }, 800);
      }
    }
  }
  
  function checkLevel1() {
    if (matchedPairs === emojis.length) {
      showModal(
        '🎉 Wow ang galing ha, sensya na baka nahirapan ka ',
        'You’ve matched all the memories!\n\nSometimes, love is about remembering the little things — like how your smile makes my day. 🫶',
        'level2'
      );
    } else {
      alert("Oops! You haven't matched all pairs yet!");
    }
  }
  
  // LEVEL 2 - LOVE QUIZ
  function quizAnswer(correct) {
    if (correct) {
      showModal(
        '💘 Uy oh tanda niya, ',
        'Tama ka babi, Sa Pepper Lunch tayo nag eat 🍱\n\nHindi ko malilimutan yung araw na yon. Lalo na nung hindi mo maubos food mo hehe. 😚',
        'level3'
      );
    } else {
      alert('mali ka, ulitin mo! 😘');
    }
  }
  
  // LEVEL 3 - DRAG & DROP
  let dropZone = null;
  
  window.onload = () => {
    dropZone = document.getElementById('drop-zone');
    dropZone.ondragover = (e) => e.preventDefault();
    dropZone.ondrop = (e) => {
      e.preventDefault();
      const heart = document.querySelector('.dragging');
      if (heart) dropZone.appendChild(heart);
    };
  
    document.querySelectorAll('.heart').forEach((el) => {
      el.ondragstart = () => el.classList.add('dragging');
      el.ondragend = () => el.classList.remove('dragging');
    });
  
    createFallingHearts();
    setupMusic();
  };
  
  function checkLevel3() {
    const heartsDropped = dropZone.querySelectorAll('.heart').length;
    if (heartsDropped === 3) {
      showScreen('final');
      initGallery();
    } else {
      alert('Make sure all 3 hearts are inside the box 💗');
    }
  }
  
  // Photo Gallery Carousel
  function initGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'carousel';
    for (let i = 1; i <= 6; i++) {
      const img = document.createElement('img');
      img.src = `assets/gallery/photo${i}.jpg`;
      img.alt = `Photo ${i}`;
      gallery.appendChild(img);
    }
    document.getElementById('final').appendChild(gallery);
  }
  