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

   /* ================= Fun Zone: Clicker, Trivia, Roulette + Easter Mood Game ================= */
(function funZoneInit() {
  // --- DOM refs (optional existence checks) ---
  const clickerBtn = document.getElementById("clickerBtn");
  const clickerScoreEl = document.getElementById("clickerScore");
  const buyAutoBtn = document.getElementById("buyAuto");
  const buyAutoCostEl = document.getElementById("buyAutoCost");
  const resetClicker = document.getElementById("resetClicker");

  const saveScoreBtn = document.getElementById("saveScore");
  const scoresList = document.getElementById("scoresList");
  const clearScoresBtn = document.getElementById("clearScores");

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const startTriviaBtn = document.getElementById("startTrivia");
  const skipTriviaBtn = document.getElementById("skipTrivia");
  const triviaCorrectEl = document.getElementById("triviaCorrect");
  const triviaStreakEl = document.getElementById("triviaStreak");

  const rouletteResult = document.getElementById("rouletteResult");
  const spinRouletteBtn = document.getElementById("spinRoulette");

  const secretBox = document.getElementById("secretBox"); // your placeholder card (exists)
  const spinCounterEl = document.getElementById("spinCounter"); // optional UI for showing spins

  // --- small helpers (safe, local) ---
  function escapeHtml(s) { return String(s).replace(/[&<>"'`=\/]/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function animatePop(el) { if (!el) return; el.animate([{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 180, easing: 'cubic-bezier(.2,.9,.3,1)' }); }
  function pulse(el) { if (!el) return; el.animate([{ boxShadow: '0 0 0 0 rgba(124,240,255,0.0)' }, { boxShadow: '0 0 0 6px rgba(124,240,255,0.06)' }], { duration: 420 }); }
  function flash(el, ok=true) { if (!el) return; const color = ok ? 'rgba(124,240,255,0.2)' : 'rgba(255,120,120,0.18)'; el.animate([{ boxShadow: `0 0 0 6px ${color}`, transform: 'translateY(-2px)' }, { boxShadow: '0 0 0 0 rgba(0,0,0,0)', transform:'translateY(0)' }], { duration: 420 }); }

  /* ----------------- CLICKER (safe) ----------------- */
  let clicker = JSON.parse(localStorage.getItem("senpai_clicker") || "{}");
  if (!clicker || typeof clicker.score !== "number") clicker = { score: 0, autos: 0, autoCost: 25 };
  const saveClicker = () => localStorage.setItem("senpai_clicker", JSON.stringify(clicker));

  function updateClickerUI() {
    if (clickerScoreEl) clickerScoreEl.textContent = Math.floor(clicker.score);
    if (buyAutoCostEl) buyAutoCostEl.textContent = clicker.autoCost;
    if (buyAutoBtn) buyAutoBtn.textContent = `Buy Auto (+1/sec) — ${clicker.autoCost}`;
  }
  updateClickerUI();

  clickerBtn?.addEventListener("click", () => { clicker.score += 1; saveClicker(); updateClickerUI(); animatePop(clickerBtn); });
  buyAutoBtn?.addEventListener("click", () => {
    if (clicker.score >= clicker.autoCost) {
      clicker.score -= clicker.autoCost;
      clicker.autos += 1;
      clicker.autoCost = Math.floor(clicker.autoCost * 1.45);
      saveClicker(); updateClickerUI();
    } else pulse(buyAutoBtn);
  });
  resetClicker?.addEventListener("click", () => { clicker = { score: 0, autos: 0, autoCost: 25 }; saveClicker(); updateClickerUI(); });
  setInterval(() => { if (clicker.autos > 0) { clicker.score += clicker.autos; saveClicker(); if (clickerScoreEl) clickerScoreEl.textContent = Math.floor(clicker.score); } }, 1000);

  /* ----------------- SCOREBOARD (safe) ----------------- */
  const loadScores = () => JSON.parse(localStorage.getItem("senpai_scores") || "[]");
  const saveScores = (arr) => localStorage.setItem("senpai_scores", JSON.stringify(arr));
  function renderScores() {
    if (!scoresList) return;
    const arr = loadScores();
    if (!arr.length) { scoresList.innerHTML = "<li class='muted'>No scores yet — play!</li>"; return; }
    scoresList.innerHTML = arr.sort((a,b)=>b.score-a.score).slice(0,10).map(s => `<li><strong>${s.score}</strong> — ${escapeHtml(s.name)}</li>`).join("");
  }
  renderScores();
  saveScoreBtn?.addEventListener("click", () => {
    if (!clicker) return;
    const name = prompt("Save your score — your name:");
    if (!name) return;
    const arr = loadScores(); arr.push({ name: name.slice(0,20), score: Math.floor(clicker.score)}); saveScores(arr); renderScores();
  });
  clearScoresBtn?.addEventListener("click", () => { if (!confirm("Clear local scores?")) return; saveScores([]); renderScores(); });

  /* ----------------- TRIVIA (safe) ----------------- */
  const triviaBank = [
    { q: "Which anime features a pirate crew and a straw hat captain?", a: ["One Piece","Naruto","Bleach","Demon Slayer"] , correct:0 },
    { q: "What is the term for a Japanese animation style lover?", a: ["Otaku","Kawaii","Sensei","Senpai"] , correct:0 },
    { q: "Which studio made 'Your Name'?", a: ["CoMix Wave Films","Madhouse","Toei","Bones"] , correct:0 },
    { q: "What weapon is iconic for 'Samurai Champloo'?", a: ["Katana","Laser","Bow","Gun"] , correct:0 },
    { q: "Which game is known for 'Among Us' style social deduction?", a: ["Among Us","Fall Guys","Minecraft","Valorant"], correct:0 },
    { "q": "Which anime features a pirate crew and a straw hat captain?", "a": ["One Piece","Naruto","Bleach","Demon Slayer"], "correct": 0, "category": "Anime" },
    { "q": "What is the term for a Japanese animation style lover?", "a": ["Otaku","Kawaii","Sensei","Senpai"], "correct": 0, "category": "Anime" },
    { "q": "Which studio made 'Your Name'?", "a": ["CoMix Wave Films","Madhouse","Toei","Bones"], "correct": 0, "category": "Anime" },
    { "q": "What weapon is iconic for 'Samurai Champloo'?", "a": ["Katana","Laser","Bow","Gun"], "correct": 0, "category": "Anime" },
    { "q": "Which anime has the character Light Yagami?", "a": ["Death Note","Bleach","Naruto","Attack on Titan"], "correct": 0, "category": "Anime" },
    { "q": "Who is the main rival of Ash in Pokémon?", "a": ["Gary","Brock","James","Red"], "correct": 0, "category": "Anime" },
    { "q": "What is the name of Naruto’s son?", "a": ["Boruto","Kawaki","Konohamaru","Minato"], "correct": 0, "category": "Anime" },
    { "q": "Which anime features the Survey Corps?", "a": ["Attack on Titan","Fullmetal Alchemist","Bleach","One Punch Man"], "correct": 0, "category": "Anime" },
    { "q": "Who is known as the Flame Alchemist?", "a": ["Roy Mustang","Edward Elric","Riza Hawkeye","Scar"], "correct": 0, "category": "Anime" },
    { "q": "Which anime has Espada villains?", "a": ["Bleach","Naruto","Dragon Ball","One Piece"], "correct": 0, "category": "Anime" },

    { "q": "Which game is known for 'Among Us' style social deduction?", "a": ["Among Us","Fall Guys","Minecraft","Valorant"], "correct": 0, "category": "Gaming" },
    { "q": "What is the default skin name in Minecraft?", "a": ["Steve","Alex","Notch","Creeper"], "correct": 0, "category": "Gaming" },
    { "q": "Which company makes the PlayStation consoles?", "a": ["Sony","Microsoft","Nintendo","Sega"], "correct": 0, "category": "Gaming" },
    { "q": "What game features the Triforce?", "a": ["The Legend of Zelda","Final Fantasy","Metroid","Fire Emblem"], "correct": 0, "category": "Gaming" },
    { "q": "In which game do you collect Chaos Emeralds?", "a": ["Sonic the Hedgehog","Mario","Mega Man","Kirby"], "correct": 0, "category": "Gaming" },
    { "q": "Which shooter popularized the term 'battle royale'?", "a": ["PUBG","Fortnite","Apex Legends","Warzone"], "correct": 0, "category": "Gaming" },
    { "q": "Who is the mascot of Nintendo?", "a": ["Mario","Link","Samus","Donkey Kong"], "correct": 0, "category": "Gaming" },
    { "q": "Which game features Ryu and Chun-Li?", "a": ["Street Fighter","Tekken","Mortal Kombat","Smash Bros"], "correct": 0, "category": "Gaming" },
    { "q": "Which FPS is known for its 'Dust 2' map?", "a": ["Counter-Strike","Call of Duty","Overwatch","Halo"], "correct": 0, "category": "Gaming" },
    { "q": "In Pokémon, which type is super effective against Water?", "a": ["Electric","Fire","Rock","Normal"], "correct": 0, "category": "Gaming" },

    { "q": "Who founded Microsoft?", "a": ["Bill Gates","Steve Jobs","Mark Zuckerberg","Larry Page"], "correct": 0, "category": "Tech" },
    { "q": "What does 'HTML' stand for?", "a": ["HyperText Markup Language","HighText Machine Language","Hyper Transfer Main Logic","Home Tool Markup Language"], "correct": 0, "category": "Tech" },
    { "q": "Which company makes the iPhone?", "a": ["Apple","Samsung","Google","Nokia"], "correct": 0, "category": "Tech" },
    { "q": "What does CPU stand for?", "a": ["Central Processing Unit","Computer Processing Unit","Control Panel Unit","Central Performance Utility"], "correct": 0, "category": "Tech" },
    { "q": "Which programming language powers web browsers?", "a": ["JavaScript","Python","C++","Rust"], "correct": 0, "category": "Tech" },
    { "q": "What year was the first iPhone released?", "a": ["2007","2005","2009","2010"], "correct": 0, "category": "Tech" },
    { "q": "Which OS is open-source and based on Linux?", "a": ["Android","Windows","iOS","macOS"], "correct": 0, "category": "Tech" },
    { "q": "What does 'GPU' stand for?", "a": ["Graphics Processing Unit","General Processing Utility","Game Processing Unit","Graphics Performance Utility"], "correct": 0, "category": "Tech" },
    { "q": "Which company created the Android OS?", "a": ["Google","Apple","Samsung","Microsoft"], "correct": 0, "category": "Tech" },
    { "q": "What does 'URL' stand for?", "a": ["Uniform Resource Locator","Universal Reference Link","Unified Resource Line","Unique Routing Location"], "correct": 0, "category": "Tech" },

    { "q": "What is the capital of Japan?", "a": ["Tokyo","Kyoto","Osaka","Nagoya"], "correct": 0, "category": "General" },
    { "q": "How many continents are there?", "a": ["7","6","5","8"], "correct": 0, "category": "General" },
    { "q": "Which planet is known as the Red Planet?", "a": ["Mars","Jupiter","Venus","Mercury"], "correct": 0, "category": "General" },
    { "q": "What is the largest mammal?", "a": ["Blue Whale","Elephant","Shark","Giraffe"], "correct": 0, "category": "General" },
    { "q": "Which language has the most native speakers?", "a": ["Mandarin Chinese","English","Spanish","Hindi"], "correct": 0, "category": "General" },
    { "q": "What year did World War II end?", "a": ["1945","1939","1941","1948"], "correct": 0, "category": "General" },
    { "q": "What gas do humans need to breathe?", "a": ["Oxygen","Carbon Dioxide","Nitrogen","Helium"], "correct": 0, "category": "General" },
    { "q": "What is the currency of the USA?", "a": ["Dollar","Euro","Yen","Pound"], "correct": 0, "category": "General" },
    { "q": "Which organ pumps blood in the body?", "a": ["Heart","Lungs","Liver","Kidney"], "correct": 0, "category": "General" },
    { "q": "Which instrument has keys, pedals, and strings?", "a": ["Piano","Violin","Drum","Guitar"], "correct": 0, "category": "General" }
  ];
  let triviaState = JSON.parse(localStorage.getItem("senpai_trivia") || "{}");
  if (!triviaState || triviaState.correct === undefined) triviaState = { correct: 0, streak: 0 };
  if (triviaCorrectEl) triviaCorrectEl.textContent = triviaState.correct;
  if (triviaStreakEl) triviaStreakEl.textContent = triviaState.streak;

  function pickQuestion() {
    if (!questionEl || !answersEl) return;
    const currentQ = JSON.parse(JSON.stringify(triviaBank[Math.floor(Math.random()*triviaBank.length)]));
    questionEl.textContent = currentQ.q;
    answersEl.innerHTML = currentQ.a.map((opt) => `<button class="btn answer">${escapeHtml(opt)}</button>`).join("");
    answersEl.querySelectorAll(".answer").forEach((b, i) => {
      b.addEventListener("click", () => {
        if (i === currentQ.correct) {
          triviaState.correct++; triviaState.streak++; if (triviaCorrectEl) triviaCorrectEl.textContent = triviaState.correct; if (triviaStreakEl) triviaStreakEl.textContent = triviaState.streak;
          flash(b, true);
        } else { triviaState.streak = 0; if (triviaStreakEl) triviaStreakEl.textContent = 0; flash(b, false); }
        localStorage.setItem("senpai_trivia", JSON.stringify(triviaState));
        setTimeout(pickQuestion, 700);
      });
    });
  }
  startTriviaBtn?.addEventListener("click", () => { pickQuestion(); animatePop(startTriviaBtn); });
  skipTriviaBtn?.addEventListener("click", () => { pickQuestion(); });

 /* ------------- ROULETTE + SPIN COUNTER + EASTER ------------- */
let spinCount = Number(localStorage.getItem("senpai_spin_count") || "0");
if (spinCounterEl) spinCounterEl.textContent = spinCount;

// Keys for localStorage
const MOOD_KEY = "senpai_mood_clicks";
const EASTER_KEY = "senpai-easter";

/* === Mood Game === */
function initMoodGame() {
  const moodBtn = document.getElementById("moodClicker");
  const moodCounter = document.getElementById("moodCounter");
  const moodEmoji = document.getElementById("moodEmoji");
  if (!moodBtn || !moodCounter || !moodEmoji) return;

  const moods = ["🔥", "😎", "😂", "💻", "🧠", "🎵", "💤"];
  let clicks = Number(localStorage.getItem(MOOD_KEY) || "0");

  // Restore from storage
  moodCounter.textContent = `Moods clicked: ${clicks}/10`;
  if (clicks > 0) {
    const scale = 1 + clicks * 0.1;
    moodEmoji.style.transform = `scale(${scale})`;
  }

  // Already done?
  if (clicks >= 10) {
    moodEmoji.textContent = "🎉";
    moodBtn.disabled = true;
    moodCounter.textContent = "Mood Game Complete! 🎊";
    return;
  }

  // Button click handler
  moodBtn.addEventListener("click", function onClick() {
    clicks++;
    localStorage.setItem(MOOD_KEY, String(clicks));

    // Random mood
    const pick = moods[Math.floor(Math.random() * moods.length)];
    moodEmoji.textContent = pick;
    moodCounter.textContent = `Moods clicked: ${clicks}/10`;

    // Scale up
    const scale = 1 + clicks * 0.1;
    moodEmoji.style.transform = `scale(${scale})`;

    // Completion
    if (clicks >= 10) {
      moodEmoji.animate(
        [
          { transform: `scale(${scale})`, opacity: 1 },
          { transform: "scale(1.8)", opacity: 0 }
        ],
        { duration: 500, easing: "ease-out" }
      );
      setTimeout(() => {
        moodEmoji.textContent = "🎉";
        moodEmoji.style.transform = "scale(1)";
        moodCounter.textContent = "Mood Game Complete! 🎊";
        moodBtn.disabled = true;
        localStorage.setItem("senpai_mood_unlocked", "1");
      }, 520);
      moodBtn.removeEventListener("click", onClick);
    }
  });
}

/* === Easter Unlock (wrapped into a function) === */
function revealSecretIfReady() {
  const secretBox = document.getElementById("secretBox");
  if (!secretBox) return; // ✅ prevents null crash

  if (spinCount >= 10 || localStorage.getItem(EASTER_KEY) === "unlocked") {
    localStorage.setItem(EASTER_KEY, "unlocked");
    secretBox.classList.add("unlocked");
    secretBox.innerHTML = `
      <strong style='color:var(--brand)'>EASTER UNLOCKED</strong>
      <div class='muted'>You found the secret — Senpai-approved.</div>
      <div id="moodGame" style="margin-top:10px;">
        <button id="moodClicker" class="btn">✨ Pop a Mood</button>
        <p id="moodCounter" class="muted">Moods clicked: 0/10</p>
        <div id="moodEmoji" class="mood-emoji" style="font-size:2.6rem;margin-top:6px;">😎</div>
      </div>
    `;

    // 🔄 reset state for fresh play
    localStorage.removeItem(MOOD_KEY);
    localStorage.removeItem("senpai_mood_unlocked");

    // initialize mood game UI safely
    initMoodGame();

    // smooth scroll if visible
    secretBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
// Initial check
revealSecretIfReady();

/* === Spin Button === */
spinRouletteBtn?.addEventListener("click", () => {
  if (!rouletteResult) return;
  const quotes = [
    "No matter how deep the night, it always turns to day. — Anime Proverb",
    "Your limits are only in your head.",
    "Eat, sleep, code, repeat.",
    "That feeling when the boss drops rare loot.",
    "Senpai noticed you.",
    "A small step is still a step.",
    "Press start to believe.",
    "Glitches are just features training."
  ];
  rouletteResult.textContent = "Spinning…";

  // Update counter
  spinCount++;
  localStorage.setItem("senpai_spin_count", String(spinCount));
  if (spinCounterEl) spinCounterEl.textContent = spinCount;

  // Reveal result
  setTimeout(() => {
    rouletteResult.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    animatePop(spinRouletteBtn);
    revealSecretIfReady(); // check unlock again
  }, 600);
});
})(); 
(function liveDiscordStatus() {
  const statusEl = document.getElementById("discordStatus");
  if (!statusEl) return;

  const userId = "828224764086452224"; // ⚠️ Must be YOUR real Discord ID
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  let heartbeat;

  ws.onopen = () => {
    console.log("✅ Connected to Lanyard WS");
    ws.send(JSON.stringify({
      op: 2,
      d: { subscribe_to_id: userId }
    }));
  };

  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);

    // Setup heartbeat when server sends hello
    if (msg.op === 1) {
      console.log("💓 Heartbeat every", msg.d.heartbeat_interval, "ms");
      clearInterval(heartbeat);
      heartbeat = setInterval(() => {
        ws.send(JSON.stringify({ op: 3 }));
      }, msg.d.heartbeat_interval);
    }

    if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
      renderStatus(msg.d);
    }
  };

  ws.onerror = (err) => console.error("❌ WS error:", err);
  ws.onclose = () => console.warn("⚠️ Lanyard WS closed");

  function renderStatus(d) {
    if (!d.discord_user) return;

    const user = d.discord_user;
    const avatar = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : "https://cdn.discordapp.com/embed/avatars/0.png";

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
            <span class="status-dot ${statusMap[d.discord_status] || "status-offline"}"></span>
            ${d.discord_status}
          </span>
        </div>
      </div>
    `;

    // 🎮 Pick activity: normal app/game activity OR custom status
    const activity = d.activities?.find(a => a.type === 0);
    const custom = d.activities?.find(a => a.type === 4);

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
    } else if (custom) {
      // 🌸 Show custom status if no other activity
      html += `
        <div class="discord-activity">
          <div>
            <span class="muted">${custom.state || ""}</span>
          </div>
        </div>
      `;
    }

    statusEl.classList.remove("loading");
    statusEl.innerHTML = html;
  }
})();
})();