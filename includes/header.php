<?php require_once __DIR__ . "/config.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#0b0f14" />
  <title><?= htmlspecialchars($SITE["title"]) ?></title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">

  <!-- SITE CSS (robust path) -->
  <link rel="stylesheet" href="<?= asset('assets/css/style.css') ?>" />
</head>
<body class="theme-dark">
<div id="app">
  <div class="bg gradient"></div>
  <canvas id="particles" aria-hidden="true"></canvas>

  <header class="nav glass">
    <div class="brand">
      <span class="logo-dot" aria-hidden="true"></span>
      <a href="<?= asset('index.php') ?>" class="brand-name"><?= htmlspecialchars($SITE["brand"]) ?></a>
    </div>

    <nav class="nav-links" role="navigation" aria-label="Main">
      <a class="<?= is_active('index.php') ?>" href="<?= asset('index.php') ?>">Home</a>
      <a class="<?= is_active('about.php') ?>" href="<?= asset('about.php') ?>">About</a>
      <a class="<?= is_active('fun.php') ?>" href="<?= asset('fun.php') ?>">Fun</a>
      <button id="themeToggle" class="btn ghost" aria-label="Toggle theme">◐</button>
    </nav>
  </header>

  <main class="page">
