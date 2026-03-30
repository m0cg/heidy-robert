/**
 * RSVP form handler – Vanilla JS (replaces jQuery $.post)
 * Posts to a Google Apps Script endpoint
 */
(function () {
  'use strict';

  var ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzpGpRBFYsE-B9Ud1_XvMzU51tFIMKwYjeOCos-pBpfNfRxDufukMFVyiiot36AqggLcQ/exec';

  function alertMarkup(type, msg) {
    return (
      '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
        msg +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
      '</div>'
    );
  }

  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var alertWrapper = document.getElementById('alert-wrapper');
      alertWrapper.innerHTML = alertMarkup('info', t('rsvp_processing'));

      var formData = new FormData(form);
      var params = new URLSearchParams(formData);

      fetch(ENDPOINT, {
        method: 'POST',
        body: params,
        redirect: 'follow',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.result === 'error') {
            alertWrapper.innerHTML = alertMarkup('danger', data.message);
          } else {
            alertWrapper.innerHTML = '';
            var modal = new bootstrap.Modal(
              document.getElementById('rsvp-modal')
            );
            modal.show();
            form.reset();
          }
        })
        .catch(function () {
          alertWrapper.innerHTML = alertMarkup('danger', t('rsvp_error'));
        });
    });
  });
})();
