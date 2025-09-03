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
        Hey — I'm Taken (AKA Brezzeyboi). I build bots, tiny games, and flashy UIs. I love brown-skinned Japanese characters, rom-coms, and anything that looks heartbreakingly beautiful. This page is my style + story.
      </p>

      <div class="profile-actions">
        <a class="btn primary" href="<?= asset('fun.php') ?>">Jump to Fun 🎮</a>
        <a class="btn ghost" href="<?= asset('index.php') ?>">Back Home</a>
      </div>

      <div class="badges">
        <span class="chip">PHP</span>
        <span class="chip">JS</span>
        <span class="chip">Tailwind</span>
        <span class="chip">Electron</span>
        <span class="chip">Anime</span>
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
            <time>2021</time>
            <div class="tl-content"><strong>First Discord bot</strong><p>Built a leveling bot — cried, learned, refactored.</p></div>
          </li>
          <li class="tl-item">
            <time>2022</time>
            <div class="tl-content"><strong>NeoPlayer UI</strong><p>Designed a sleek music player inspired by Spotify.</p></div>
          </li>
          <li class="tl-item">
            <time>2023</time>
            <div class="tl-content"><strong>SenOS start</strong><p>Started a simulated OS project combining JS and Python.</p></div>
          </li>
          <li class="tl-item">
            <time>2024</time>
            <div class="tl-content"><strong>Taken's Hub</strong><p>Launched this hub to collect experiments and fun things.</p></div>
          </li>
        </ol>
      </div>
    </div>
  </article>
</section>

<?php include __DIR__ . "/includes/footer.php"; ?>
