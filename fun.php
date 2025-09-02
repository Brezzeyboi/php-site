<?php include __DIR__ . "/includes/header.php"; ?>

<section class="card glass fun-grid" style="margin-top:16px;padding:18px;">
  <div class="fun-left">
    <h2>Fun Zone 🎮</h2>
    <p class="muted">Mini-games, anime roulette, and secret easter-eggs. Progress is stored locally.</p>

    <div class="fun-panel glass">
      <h3>Clicker — Gain Senpai Points</h3>
      <div class="clicker">
        <button id="clickerBtn" class="btn primary big-btn">💥 Click Me</button>
        <div class="score">Points: <span id="clickerScore">0</span></div>
        <div class="clicker-actions">
          <button class="btn" id="buyAuto">Buy Auto (+1/sec) — <span id="buyAutoCost">25</span></button>
          <button class="btn" id="resetClicker">Reset</button>
        </div>
      </div>
    </div>

    <div class="fun-panel glass">
      <h3>Trivia — Test your otaku knowledge</h3>
      <div id="trivia">
        <div id="question">Press Start to get question</div>
        <div id="answers"></div>
        <div class="trivia-actions">
          <button class="btn" id="startTrivia">Start</button>
          <button class="btn ghost" id="skipTrivia">Skip</button>
        </div>
        <div class="muted">Correct: <span id="triviaCorrect">0</span> · Streak: <span id="triviaStreak">0</span></div>
      </div>
    </div>

    <div class="fun-panel glass">
      <h3>Anime Roulette</h3>
      <p class="muted">Spin for a random anime quote / vibe.</p>
      <div class="roulette">
        <div id="rouletteResult" class="big">—</div>
        <button class="btn primary" id="spinRoulette">Spin 🎲</button>
      </div>
    </div>
  </div>

  <aside class="fun-right">
    <div class="card glass">
      <h3>Scoreboard (Local)</h3>
      <div id="scoreboard">
        <ol id="scoresList" class="muted"><li>No scores yet — play!</li></ol>
      </div>
      <div style="margin-top:10px;">
        <button class="btn" id="saveScore">Save Clicker Score</button>
        <button class="btn ghost" id="clearScores">Clear Scores</button>
      </div>
    </div>

    <div class="card glass">
      <h3>Secret</h3>
      <p class="muted">Find the hidden easter egg on this page — something cool unlocks after 10 spins.</p>
      <div id="secretBox" class="placeholder" style="height:80px;">Locked</div>
    </div>
  </aside>
</section>

<?php include __DIR__ . "/includes/footer.php"; ?>
