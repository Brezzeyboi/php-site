<?php
// includes/config.php (updated)
// --------------------
// Simple site config + robust asset helper (works in root or subfolder installs)

$BASE = rtrim(str_replace('\\','/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($BASE === '' || $BASE === '/') $BASE = '';

$SITE = [
  "title"   => "Taken's Hub",
  "tagline" => "Clean • Playful • Powerful",
  "brand"   => "Taken's Hub",
  "base"    => $BASE,
  // Optional: put your channel/server IDs here for easy embedding later
  "latest_video" => "dQw4w9WgXcQ", // put a YouTube video id you want shown (default rickroll)
  "links"   => [
    "github"  => "https://github.com/Brezzeyboi",
    "discord" => "https://discord.com/users/828224764086452224",
  ],
  "profile" => "./assets/images/Profile.png"
];

function asset(string $path): string {
  global $SITE;
  $p = ltrim($path, '/');
  return ($SITE['base'] ? $SITE['base'] . '/' . $p : $p);
}

function is_active(string $file): string {
  return basename($_SERVER['PHP_SELF']) === $file ? 'active' : '';
}
