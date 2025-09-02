<?php include __DIR__ . "/includes/header.php"; ?>

<section class="hero">
  <div class="hero-content">
    <div class="badge">Welcome</div>
    <h1>Hey, I’m <span class="grad">Senpai</span> 👋</h1>
    <p class="lead">I build playful things — bots, dashboards, and experiences with anime energy.</p>
    <div class="cta">
      <a class="btn primary" href="<?= asset('about.php') ?>">About Me</a>
      <a class="btn" href="<?= asset('fun.php') ?>">Fun Zone 🎮</a>
      <a class="btn ghost" href="<?= htmlspecialchars($SITE["links"]["discord"]) ?>" target="_blank" rel="noopener">Discord</a>
    </div>
  </div>

  <div class="hero-card glass lift">
    <div class="hero-stat">
      <span class="num" data-count="99">0</span>
      <span class="label">Projects & Experiments</span>
    </div>
    <div class="hero-stat">
      <span class="num" data-count="120">0</span>
      <span class="label">Anime Episodes This Year</span>
    </div>
    <div class="hero-stat">
      <span class="num" data-count="7">0</span>
      <span class="label">Active Side Quests</span>
    </div>
  </div>
</section>

<section class="cards">
  <!-- YOUTUBE CARD -->
  <article class="card glass hoverable">
    <div class="card-head">
      <h3>Latest Video</h3>
      <span class="chip">YouTube</span>
    </div>

    <div class="ratio-16x9 round">
      <iframe src="https://www.youtube.com/embed/<?= htmlspecialchars($SITE['latest_video']) ?>?rel=0" title="YouTube"
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
    </div>
    <p class="muted">Current pick — change <code>$SITE['latest_video']</code> in <code>includes/config.php</code>.</p>
  </article>

  <!-- LANYARD STATUS CARD -->
  <article class="card glass hoverable" id="discordStatusCard">
  <div class="card-head">
    <h3>My Live Status</h3>
    <span class="chip">Discord</span>
  </div>

  <div id="discordStatus" class="discord-status loading">
    <div class="shimmer"></div>
    <p class="muted">Fetching live presence…</p>
  </div>
</article>

  <!-- CAROUSEL -->
  <article class="card glass hoverable">
    <div class="card-head">
      <h3>Anime / Game Carousel</h3>
      <span class="chip">Gallery</span>
    </div>

    <div class="carousel" id="animeCarousel" role="region" aria-label="Anime carousel">
      <button class="carousel-nav left" data-dir="-1" aria-label="Previous">‹</button>
      <div class="carousel-track">
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/placeholder-anime-1.jpg') ?>" alt="Anime 1" />
          <div class="carousel-caption"><strong>Kitsune Drift</strong><span>— Indie RPG</span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/placeholder-game-1.jpg') ?>" alt="Game 1" />
          <div class="carousel-caption"><strong>Neon Runner</strong><span>— Highscore</span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/placeholder-anime-2.jpg') ?>" alt="Anime 2" />
          <div class="carousel-caption"><strong>Starfall</strong><span>— Ongoing</span></div>
        </div>
      </div>
      <button class="carousel-nav right" data-dir="1" aria-label="Next">›</button>
    </div>

    <p class="muted">Fun carousel — replace images in <code>assets/images/</code> with your art.</p>
  </article>
</section>
<?php include __DIR__ . "/includes/footer.php"; ?>
