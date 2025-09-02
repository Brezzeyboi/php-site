// assets/js/app.js
// Full consolidated script: theme toggle, counters, mood, particles, plus About & Fun page interactions, mini-games, carousel

document.addEventListener("DOMContentLoaded", () => {

  /* ================= Theme Toggle ================= */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("theme-light");
      if (isLight) document.body.classList.remove("theme-dark");
      else document.body.classList.add("theme-dark");
      localStorage.setItem("senpai-theme", isLight ? "light" : "dark");
    });
    const pref = localStorage.getItem("senpai-theme");
    if (pref === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  }

  /* ================= Counters & Mood ================= */
  const counters = document.querySelectorAll(".num[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const dur = 1200;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.floor(target * (0.1 + 0.9 * p)).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  counters.forEach(animateCount);

  const moods = ["🔥 Hype", "😎 Chill", "😂 Meme Mode", "💻 Coding Grind", "🧠 Big Brain", "🎵 Vibing", "💤 Sleepy"];
  const moodBtn = document.getElementById("moodBtn");
  const moodText = document.getElementById("moodText");
  if (moodBtn && moodText) {
    moodBtn.addEventListener("click", () => {
      const pick = moods[Math.floor(Math.random() * moods.length)];
      moodText.textContent = `Your vibe: ${pick}`;
    });
  }

  /* ================= Particle background ================= */
  (function particlesInit() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const init = () => {
      w = canvas.width = Math.floor(window.innerWidth * DPR);
      h = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      particles = Array.from({ length: Math.floor((w * h) / (10000 / DPR)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (1.5 * DPR) + 0.4 * DPR,
        vx: (Math.random() - 0.5) * 0.12 * DPR,
        vy: (Math.random() - 0.5) * 0.12 * DPR,
        a: 0.12 + Math.random() * 0.5
      }));
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,240,255,${p.a})`;
        ctx.fill();
      }
      requestAnimationFrame(tick);
    };
    window.addEventListener("resize", init);
    init(); tick();
  })();

  /* ================= About page: skill bars & timeline reveal ================= */
  (function aboutPageInit() {
    const skillBars = document.querySelectorAll(".skill-bar");
    if (skillBars.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const pct = Number(el.dataset.progress || 0);
            const fill = el.querySelector(".fill");
            if (fill) fill.style.width = pct + "%";
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      skillBars.forEach(sb => observer.observe(sb));
    }

    const tlItems = document.querySelectorAll(".tl-item");
    if (tlItems.length) {
      const tObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            tObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      tlItems.forEach(i => tObserver.observe(i));
    }
  })();
/* ================= Carousel (Custom -1 to 2 cycle) ================= */
  (function carouselInit() {
    const track = document.querySelector(".carousel-track");
    if (!track) return;
    
    const items = track.querySelectorAll(".carousel-item");
    const leftBtn = document.querySelector(".carousel-nav.left");
    const rightBtn = document.querySelector(".carousel-nav.right");
    
    if (items.length === 0) return;
    
    let currentIndex = -3; // Start at -1
    
    // Define your 4 positions: -1, 0, 1, 2
    const positions = [-2, -1, 0, 1, 2];
    let positionIndex = 0; // Start at position 0 in the positions array (which is -2)

    const updateCarousel = () => {
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = 18;
      const offset = -currentIndex * (itemWidth + gap);
      track.style.transform = `translateX(${offset}px)`;
      
      console.log(`Carousel: position ${currentIndex} - showing item ${currentIndex + 2}/${items.length + 1}`);
    };
    
    const goLeft = () => {
      // Move to previous position in the cycle
      positionIndex = (positionIndex - 1 + positions.length) % positions.length;
      currentIndex = positions[positionIndex];
      updateCarousel();
    };
    
    const goRight = () => {
      // Move to next position in the cycle
      positionIndex = (positionIndex + 1) % positions.length;
      currentIndex = positions[positionIndex];
      updateCarousel();
    };
    
    // Event listeners
    leftBtn?.addEventListener("click", goLeft);
    rightBtn?.addEventListener("click", goRight);
    
    // Handle window resize
    window.addEventListener("resize", () => updateCarousel());
    
    // Initialize - start at position -1
    currentIndex = -2;
    positionIndex = 0;
    updateCarousel();
  })();

  /* ================= Fun Zone: Clicker, Trivia, Roulette ================= */
  (function funZoneInit() {
    // clicker
    const clickerBtn = document.getElementById("clickerBtn");
    const clickerScoreEl = document.getElementById("clickerScore");
    const buyAutoBtn = document.getElementById("buyAuto");
    const buyAutoCostEl = document.getElementById("buyAutoCost");
    const resetClicker = document.getElementById("resetClicker");

    let clicker = JSON.parse(localStorage.getItem("senpai_clicker") || "{}");
    if (!clicker || !clicker.score) {
      clicker = { score: 0, autos: 0, autoCost: 25 };
    }
    const saveClicker = () => localStorage.setItem("senpai_clicker", JSON.stringify(clicker));
    const updateClickerUI = () => {
      clickerScoreEl.textContent = Math.floor(clicker.score);
      buyAutoCostEl.textContent = clicker.autoCost;
      buyAutoBtn.textContent = `Buy Auto (+1/sec) — ${clicker.autoCost}`;
    };
    updateClickerUI();

    clickerBtn?.addEventListener("click", () => {
      clicker.score += 1;
      saveClicker();
      updateClickerUI();
      animatePop(clickerBtn);
    });

    buyAutoBtn?.addEventListener("click", () => {
      if (clicker.score >= clicker.autoCost) {
        clicker.score -= clicker.autoCost;
        clicker.autos += 1;
        clicker.autoCost = Math.floor(clicker.autoCost * 1.45);
        saveClicker();
        updateClickerUI();
      } else {
        pulse(buyAutoBtn);
      }
    });

    resetClicker?.addEventListener("click", () => {
      clicker = { score: 0, autos: 0, autoCost: 25 };
      saveClicker();
      updateClickerUI();
    });

    // auto increment tick
    setInterval(() => {
      if (clicker.autos > 0) {
        clicker.score += clicker.autos;
        saveClicker();
        if (clickerScoreEl) clickerScoreEl.textContent = Math.floor(clicker.score);
      }
    }, 1000);

    // save scoreboard
    const saveScoreBtn = document.getElementById("saveScore");
    const scoresList = document.getElementById("scoresList");
    const clearScoresBtn = document.getElementById("clearScores");
    const loadScores = () => JSON.parse(localStorage.getItem("senpai_scores") || "[]");
    const saveScores = (arr) => localStorage.setItem("senpai_scores", JSON.stringify(arr));
    const renderScores = () => {
      const arr = loadScores();
      if (!arr.length) {
        scoresList.innerHTML = "<li class='muted'>No scores yet — play!</li>";
        return;
      }
      scoresList.innerHTML = arr.sort((a,b)=>b.score-a.score).slice(0,10).map(s => `<li><strong>${s.score}</strong> — ${escapeHtml(s.name)}</li>`).join("");
    };
    renderScores();
    saveScoreBtn?.addEventListener("click", () => {
      const name = prompt("Save your score — your name:");
      if (!name) return;
      const arr = loadScores();
      arr.push({ name: name.slice(0,20), score: Math.floor(clicker.score) });
      saveScores(arr);
      renderScores();
    });
    clearScoresBtn?.addEventListener("click", () => {
      if (!confirm("Clear local scores?")) return;
      saveScores([]);
      renderScores();
    });

    // trivia (client-side bank)
    const triviaBank = [
      { q: "Which anime features a pirate crew and a straw hat captain?", a: ["One Piece","Naruto","Bleach","Demon Slayer"] , correct:0 },
      { q: "What is the term for a Japanese animation style lover?", a: ["Otaku","Kawaii","Sensei","Senpai"] , correct:0 },
      { q: "Which studio made 'Your Name'?", a: ["CoMix Wave Films","Madhouse","Toei","Bones"] , correct:0 },
      { q: "What weapon is iconic for 'Samurai Champloo'?", a: ["Katana","Laser","Bow","Gun"] , correct:0 },
      { q: "Which game is known for 'Among Us' style social deduction?", a: ["Among Us","Fall Guys","Minecraft","Valorant"], correct:0 }
    ];
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const startTriviaBtn = document.getElementById("startTrivia");
    const skipTriviaBtn = document.getElementById("skipTrivia");
    const triviaCorrectEl = document.getElementById("triviaCorrect");
    const triviaStreakEl = document.getElementById("triviaStreak");
    let triviaState = JSON.parse(localStorage.getItem("senpai_trivia") || "{}");
    if (!triviaState || triviaState.correct === undefined) triviaState = { correct: 0, streak: 0 };
    triviaCorrectEl && (triviaCorrectEl.textContent = triviaState.correct);
    triviaStreakEl && (triviaStreakEl.textContent = triviaState.streak);

    let currentQ = null;
    const pickQuestion = () => {
      currentQ = JSON.parse(JSON.stringify(triviaBank[Math.floor(Math.random()*triviaBank.length)]));
      if (!questionEl || !answersEl) return;
      questionEl.textContent = currentQ.q;
      answersEl.innerHTML = currentQ.a.map((opt, i) => `<button class="btn answer">${escapeHtml(opt)}</button>`).join("");
      // hook answers
      answersEl.querySelectorAll(".answer").forEach((b, i) => {
        b.addEventListener("click", () => {
          if (i === currentQ.correct) {
            triviaState.correct += 1;
            triviaState.streak += 1;
            triviaCorrectEl.textContent = triviaState.correct;
            triviaStreakEl.textContent = triviaState.streak;
            flash(b, true);
          } else {
            triviaState.streak = 0;
            triviaStreakEl.textContent = 0;
            flash(b, false);
          }
          localStorage.setItem("senpai_trivia", JSON.stringify(triviaState));
          // small delay then new question
          setTimeout(pickQuestion, 700);
        });
      });
    };

    startTriviaBtn?.addEventListener("click", () => {
      pickQuestion();
      animatePop(startTriviaBtn);
    });

    skipTriviaBtn?.addEventListener("click", () => {
      pickQuestion();
    });

    // roulette (quotes)
    const rouletteQuotes = [
      "“No matter how deep the night, it always turns to day.” — Anime Proverb",
      "“Your limits are only in your head.”",
      "“Eat, sleep, code, repeat.”",
      "“That feeling when the boss drops rare loot.”",
      "“Senpai noticed you.”",
      "“A small step is still a step.”",
      "“Press start to believe.”",
      "“Glitches are just features training.”"
    ];
    const rouletteResult = document.getElementById("rouletteResult");
    const spinRouletteBtn = document.getElementById("spinRoulette");
    let spinCount = Number(localStorage.getItem("senpai_spin_count") || "0");
    const secretBox = document.getElementById("secretBox");

    function revealSecretIfReady() {
      if (spinCount >= 10) {
        secretBox.innerHTML = "<strong style='color:var(--brand)'>EASTER UNLOCKED</strong><div class='muted'>You found the secret — Senpai-approved.</div>";
        secretBox.classList.add("unlocked");
      }
    }
    revealSecretIfReady();

    spinRouletteBtn?.addEventListener("click", () => {
      const pick = rouletteQuotes[Math.floor(Math.random()*rouletteQuotes.length)];
      rouletteResult.textContent = "…spinning…";
      spinCount++;
      localStorage.setItem("senpai_spin_count", String(spinCount));
      setTimeout(() => {
        rouletteResult.textContent = pick;
        revealSecretIfReady();
        animatePop(spinRouletteBtn);
      }, 600);
    });

    /* ================= Helpers (UI) ================= */
    function animatePop(el) {
      if (!el) return;
      el.animate([{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 180, easing: 'cubic-bezier(.2,.9,.3,1)' });
    }
    function pulse(el) {
      if (!el) return;
      el.animate([{ boxShadow: '0 0 0 0 rgba(124,240,255,0.0)' }, { boxShadow: '0 0 0 6px rgba(124,240,255,0.06)' }], { duration: 420 });
    }
    function flash(el, ok=true) {
      if (!el) return;
      const color = ok ? 'rgba(124,240,255,0.2)' : 'rgba(255,120,120,0.18)';
      const a = el.animate([{ boxShadow: `0 0 0 6px ${color}`, transform: 'translateY(-2px)' }, { boxShadow: '0 0 0 0 rgba(0,0,0,0)', transform:'translateY(0)' }], { duration: 420 });
    }

    function escapeHtml(s) { return String(s).replace(/[&<>"'`=\/]/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }

  })();

});
(function liveDiscordStatus() {
  const statusEl = document.getElementById("discordStatus");
  if (!statusEl) return;

  const userId = "828224764086452224";
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  let heartbeat;

  ws.onopen = () => {
    ws.send(JSON.stringify({
      op: 2,
      d: { subscribe_to_id: userId }
    }));
  };

  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);

    // Heartbeat keep-alive
    if (msg.op === 1) {
      heartbeat = setInterval(() => ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
    }

    if (msg.t !== "INIT_STATE" && msg.t !== "PRESENCE_UPDATE") return;

    const d = msg.d;
    renderStatus(d);
  };

  function renderStatus(d) {
    const user = d.discord_user;
    const activity = d.activities.find(a => a.type === 0); // "Playing" activity
    const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    const statusMap = {
  online: "status-online",
  idle: "status-idle",
  dnd: "status-dnd",
  offline: "status-offline"
};

    let html = `
  <div class="discord-user">
    <img src="${avatar}" alt="${user.username}" />
    <div>
      <strong>${user.username}</strong><br>
      <span class="muted">
        <span class="status-dot ${statusMap[d.discord_status]}"></span>
        ${d.discord_status}
      </span>
    </div>
  </div>
`;


    if (activity) {
      const large = activity.assets?.large_image?.replace("mp:", "");
      const small = activity.assets?.small_image?.replace("mp:", "");
      const largeImg = large ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${large}.png` : "";
      const smallImg = small ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${small}.png` : "";

      html += `
        <div class="discord-activity">
          <div style="position:relative;">
            ${largeImg ? `<img class="large" src="${largeImg}" alt="Large image"/>` : ""}
            ${smallImg ? `<img class="small" src="${smallImg}" alt="Small image"/>` : ""}
          </div>
          <div>
            <strong>${activity.name}</strong><br>
            <span>${activity.details || ""}</span><br>
            <span class="muted">${activity.state || ""}</span>
          </div>
        </div>
      `;
    }

    statusEl.classList.remove("loading");
    statusEl.innerHTML = html;
  }
})();

fetchStatus();
setInterval(fetchStatus, 15000);
