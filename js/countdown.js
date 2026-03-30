/**
 * Countdown – Vanilla JS countdown timer
 * Replaces FlipClock + Moment.js
 * Target: July 27, 2025, 10:00 AM (UTC-7, Mexico/Sinaloa)
 */
(function () {
  'use strict';

  // Target date in ISO 8601 with timezone offset
  var TARGET = new Date('2026-06-27T10:00:00-07:00').getTime();

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function render() {
    var container = document.getElementById('countdown');
    if (!container) return;

    var now = Date.now();
    var diff = Math.max(0, Math.floor((TARGET - now) / 1000));

    var days = Math.floor(diff / 86400);
    diff %= 86400;
    var hours = Math.floor(diff / 3600);
    diff %= 3600;
    var minutes = Math.floor(diff / 60);
    var seconds = diff % 60;

    var t = window.i18n ? window.i18n.t : function (k) { return k; };

    container.innerHTML =
      '<div class="countdown-item">' +
        '<span class="countdown-number">' + pad(days) + '</span>' +
        '<span class="countdown-label">' + t('days') + '</span>' +
      '</div>' +
      '<div class="countdown-separator">:</div>' +
      '<div class="countdown-item">' +
        '<span class="countdown-number">' + pad(hours) + '</span>' +
        '<span class="countdown-label">' + t('hours') + '</span>' +
      '</div>' +
      '<div class="countdown-separator">:</div>' +
      '<div class="countdown-item">' +
        '<span class="countdown-number">' + pad(minutes) + '</span>' +
        '<span class="countdown-label">' + t('minutes') + '</span>' +
      '</div>' +
      '<div class="countdown-separator">:</div>' +
      '<div class="countdown-item">' +
        '<span class="countdown-number">' + pad(seconds) + '</span>' +
        '<span class="countdown-label">' + t('seconds') + '</span>' +
      '</div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    setInterval(render, 1000);

    // Re-render when language changes so labels update
    document.addEventListener('languageChanged', render);
  });
})();
