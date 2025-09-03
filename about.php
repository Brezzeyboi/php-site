<?php include __DIR__ . "/includes/header.php"; ?>

<section class="profile-grid">
  <article class="card glass profile-card">
    <div class="profile-left">
      <div class="avatar round">
        <div class="avatar-inner">
          <img src="<?= htmlspecialchars($SITE["profile"]) ?>" alt="Profile Picture" class="avatar-img">
        </div>
      </div>


      <h2 class="profile-name">Taken</h2>
      <div class="muted">Coder • Anime Lover • Maker of neat chaos</div>

      <p class="profile-bio">
        Hey — I'm Taken (AKA Brezzeyboi). I build bots, tiny games, Websites, and flashy UIs. I love anime, Comedy Movies, and anything that looks funny and beautiful. This page is my style + story.
      </p>

      <div class="profile-actions">
        <a class="btn primary" href="<?= asset('fun.php') ?>">Jump to Fun 🎮</a>
        <a class="btn ghost" href="<?= asset('index.php') ?>">Back Home</a>
      </div>

      <div class="badges">
        <span class="chip">PYTHON</span>
        <span class="chip">JS</span>
        <span class="chip">Tailwind</span>
        <span class="chip">HTML</span>
        <span class="chip">CSS</span>
        <span class="chip">Anime</span>
        <span class="chip">Metophile (Music Lover)</span>
        <span class="chip">Funny</span>
      </div>
    </div>

    <div class="profile-right">
      <div class="card glass skills-card">
        <h3>Skills</h3>
        <div class="skill">
          <div class="skill-head"><span>Frontend</span><strong>85%</strong></div>
          <div class="skill-bar" data-progress="85"><div class="fill"></div></div>
        </div>
        <div class="skill">
          <div class="skill-head"><span>Backend</span><strong>78%</strong></div>
          <div class="skill-bar" data-progress="78"><div class="fill"></div></div>
        </div>
        <div class="skill">
          <div class="skill-head"><span>Design</span><strong>72%</strong></div>
          <div class="skill-bar" data-progress="72"><div class="fill"></div></div>
        </div>
      </div>

      <div class="card glass timeline-card">
        <h3>Timeline</h3>
        <ol class="timeline">
          <li class="tl-item">
             <li class="tl-item">
            <time>2024</time>
            <div class="tl-content"><strong>Task Tune</strong><p>A small To-do-List webiste with clean UI.</p></div>
          </li>
          <li class="tl-item">
            <time>2024</time>
            <div class="tl-content"><strong>NeoPlayer</strong><p>Designed a sleek music player inspired by Spotify.</p></div>
          </li>
          <li class="tl-item">
            <time>2024</time>
            <div class="tl-content"><strong>Fynx Browser</strong><p>A web browser built with Electron, and a focus on simplicity.</p></div>
          </li>
          <li class="tl-item">
            <time>2025</time>
            <div class="tl-content"><strong>First Discord bot</strong><p>Built a leveling bot — cried, learned, refactored.</p></div>
          </li>
          <li class="tl-item">
            <time>2025</time>
            <div class="tl-content"><strong>Taken's Hub</strong><p>MADE this hub For Fun and fun things.</p></div>
          </li>
          <li class="tl-item">
            <time>MORE</time>
            <div class="tl-content"><strong>There are many but I can't list them all</strong><p>JUST BECAUSE THE PAGE IS SMALL!!!!</p></div>
          </li>
        </ol>
      </div>
    </div>
  </article>
</section>

<?php include __DIR__ . "/includes/footer.php"; ?>
