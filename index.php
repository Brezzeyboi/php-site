<?php include __DIR__ . "/includes/header.php"; ?>

<section class="hero">
  <div class="hero-content">
    <div class="badge">Welcome</div>
    <h1>Hey, I’m <span class="grad">Taken</span> 👋</h1>
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
      <h3>Taken's Theories</h3>
      <span class="chip">Theories Session</span>
    </div>

    <div class="carousel" id="animeCarousel" role="region" aria-label="Anime carousel">
      <button class="carousel-nav left" data-dir="-1" aria-label="Previous"><b>‹</b></button>
      <div class="carousel-track">
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/Juth.jpg') ?>" alt="AYO WHERE IS THE FKING IMAGE" />
          <div class="carousel-caption"><strong>Nothing...</strong><span>— Iam Your Best Buddy</span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/hmm.png') ?>" alt="AYO WHERE IS THE FKING IMAGE" />
          <div class="carousel-caption"><strong>Why I Exist</strong><span>— You know?</span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/Dandadan.png') ?>" alt="AYO WHERE IS THE FKING IMAGE" />
          <div class="carousel-caption"><strong>DANDADAN IS</strong><span><b>CINEMA</b></span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/spiderman.png') ?>" alt="AYO WHERE IS THE FKING IMAGE" />
          <div class="carousel-caption"><strong>THIS IS</strong><span><b>SPIDERMAN</b></span></div>
        </div>
        <div class="carousel-item glass">
          <img src="<?= asset('assets/images/mood.gif') ?>" alt="AYO WHERE IS THE FKING IMAGE" />
          <div class="carousel-caption"><strong>THIS IS</strong><span><b>MOOOOOOD</b></span></div>
      </div>
      </div>
      
      <button class="carousel-nav right" data-dir="1" aria-label="Next"><b>›</b></button>
    </div>
  </article>
</section>
<?php include __DIR__ . "/includes/footer.php"; ?>
