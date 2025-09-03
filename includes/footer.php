  </main>

  <footer class="footer glass">
    <div class="footer-grid">
      <div>
        <strong><?= htmlspecialchars($SITE["brand"]) ?></strong>
        <div class="muted"><?= htmlspecialchars($SITE["tagline"]) ?></div>
      </div>

      <div class="social">
        
        <a href="<?= htmlspecialchars($SITE["links"]["discord"]) ?>" target="_blank" aria-label="Discord" class="icon-link" rel="noopener">
          <!-- Discord SVG -->
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20.3 4.6a18 18 0 0 0-4.4-1.4l-.2.4c1 .2 2 .6 2.9 1.1-1.3-.6-2.8-1-4.3-1.2-1.5-.2-3-.2-4.5 0-1.5.2-3 .6-4.3 1.2.9-.5 1.9-.9 2.9-1.1l-.2-.4A18 18 0 0 0 3.7 4.6C1.3 8 1 11.3 1 14.5c1.6 1.2 3.3 1.9 5 2.4l1.1-1.9c-.6-.2-1.2-.6-1.7-1.1.6.4 1.3.7 2 .9.7.2 1.5.4 2.3.5.8.1 1.6.2 2.4.2.8 0 1.6-.1 2.4-.2.8-.1 1.6-.3 2.3-.5.7-.2 1.4-.5 2-.9-.5.5-1.1.9-1.7 1.1l1.1 1.9c1.7-.5 3.4-1.2 5-2.4 0-3.2-.3-6.5-2.7-9.9z" fill="currentColor"/></svg>
        </a>

        <a href="<?= htmlspecialchars($SITE["links"]["github"]) ?>" target="_blank" aria-label="GitHub" class="icon-link" rel="noopener">
          <!-- GitHub SVG -->
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2.3c-3.1.7-3.8-1.3-3.8-1.3-.6-1.6-1.4-2-1.4-2-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 3 1.3 3.7 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.4-2.6 5.4-5.1 5.7.4.3.8 1 .8 2v3c0 .3.2.8.9.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" fill="currentColor"/></svg>
        </a>
      </div>
    </div>

    <div class="fineprint">© <?= date("Y") ?> <?= htmlspecialchars($SITE["brand"]) ?> · Made with ❤️ by Taken</div>
  </footer>

</div>

<!-- SITE JS (robust path) -->
<script src="<?= asset('assets/js/app.js') ?>"></script>
</body>
</html>
