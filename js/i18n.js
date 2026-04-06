/**
 * i18n – Lightweight translation system
 * Supports English (en), Svenska (sv), and Español (es)
 * Uses data-i18n attributes for text and data-i18n-placeholder for placeholders
 */
(function () {
  'use strict';

  var translations = {
    en: {
      gift_message:
        "Our greatest gift is your presence.",
      countdown_label: 'Forever starts in:',
      confirm_btn: 'Confirm attendance',
      event_title: 'Event',
      ceremony_title: 'Ceremony',
      ceremony_date: 'June 27, 2026',
      ceremony_venue_prefix: 'Parish',
      reception_title: 'Reception',
      reception_date: 'June 27, 2026',
      reception_venue_prefix: 'At',
      start_of_day_title: 'Start of the day',
      start_of_day_message: 'Accompany us before the main event on the following address at 12:30:',
      start_of_day_groom_label: 'Guests of the groom:',
      start_of_day_bride_label: 'Guests of the bride:',
      gallery_title: 'Gallery',
      thank_you_title: 'Thank you!',
      thank_you_message:
        'We are excited to see you on the day of the event.',
      rsvp_title: 'Confirm Attendance',
      rsvp_subtitle: '<br>Please let us know if you can attend by May 27.<br>Fill the form below or message us at 0705950514',
      rsvp_children_note: 'Children are a gift from God, but tonight they get to stay home and sleep.',
      form_name: 'Name',
      form_adults: 'No. of persons',
      form_submit: 'Send',
      rsvp_processing:
        '<strong>One moment</strong> — We are processing your request.',
      rsvp_error:
        '<strong>Oops!</strong> There was a problem with the server.',
      footer_message:
        'Made with ❤️ for Heidy & Robert',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    sv: {
      gift_message:
        'Vår största gåva är er närvaro.',
      countdown_label: 'Evigheten börjar om:',
      confirm_btn: 'Bekräfta närvaro',
      event_title: 'Evenemang',
      ceremony_title: 'Ceremoni',
      ceremony_date: '27 juni 2026',
      ceremony_venue_prefix: 'Församling',
      reception_title: 'Mottagning',
      reception_date: '27 juni 2026',
      reception_venue_prefix: 'På',
      start_of_day_title: 'Dagens start',
      start_of_day_message: 'Följ med oss innan huvudevenemanget på följande adress kl. 12:30:',
      start_of_day_groom_label: 'Brudgummens gäster:',
      start_of_day_bride_label: 'Brudens gäster:',
      gallery_title: 'Galleri',
      thank_you_title: 'Tack!',
      thank_you_message:
        'Vi ser fram emot att träffa er på evenemangsdagen.',
      rsvp_title: 'Bekräfta närvaro',
      rsvp_subtitle:
        '<br>Vänligen meddela om ni kan närvara senast 27 Maj.<br>Fyll i formuläret nedan eller kontakta oss på 0705950514',
      rsvp_children_note: 'Barn är en gudagåva men denna kväll får de stanna hemma och sova.',
      form_name: 'Namn',
      form_adults: 'Antal personer',
      form_submit: 'Skicka',
      rsvp_processing:
        '<strong>Ett ögonblick</strong> — Vi bearbetar din förfrågan.',
      rsvp_error:
        '<strong>Hoppsan!</strong> Det uppstod ett problem med servern.',
      footer_message:
        'Gjord med ❤️ för Heidy & Robert',
      days: 'Dagar',
      hours: 'Timmar',
      minutes: 'Minuter',
      seconds: 'Sekunder',
    },
    es: {
      gift_message:
        'Nuestro mayor regalo es su presencia.',
      countdown_label: 'Para siempre comienza en:',
      confirm_btn: 'Confirmar asistencia',
      event_title: 'Evento',
      ceremony_title: 'Ceremonia',
      ceremony_date: '27 de junio de 2026',
      ceremony_venue_prefix: 'Parroquia',
      reception_title: 'Recepción',
      reception_date: '27 de junio de 2026',
      reception_venue_prefix: 'En',
      start_of_day_title: 'Inicio del día',
      start_of_day_message: 'Acompáñanos antes del evento principal en la siguiente dirección a las 12:30:',
      start_of_day_groom_label: 'Invitados del novio:',
      start_of_day_bride_label: 'Invitados de la novia:',
      gallery_title: 'Galería',
      thank_you_title: '¡Gracias!',
      thank_you_message:
        'Estamos emocionados de verlos el día del evento.',
      rsvp_title: 'Confirmar asistencia',
      rsvp_subtitle:
        '<br>Por favor confirma tu asistencia antes del 27 de mayo.<br>Rellena el formulario a continuación o escríbenos al 0705950514',
      rsvp_children_note: 'Los niños son un regalo de Dios, pero esta noche se quedan en casa a dormir.',
      form_name: 'Nombre',
      form_adults: 'Nº de personas',
      form_submit: 'Enviar',
      rsvp_processing:
        '<strong>Un momento</strong> — Estamos procesando tu solicitud.',
      rsvp_error:
        '<strong>¡Ups!</strong> Hubo un problema con el servidor.',
      footer_message:
        'Hecho con ❤️ para Heidy &amp; Robert',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
    },
  };

  var currentLang = localStorage.getItem('lang') || 'en';

  /**
   * Get a translated string by key.
   * Falls back to English, then to the raw key.
   */
  function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
      return translations[currentLang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  }

  /** Apply all translations to the DOM */
  function applyTranslations() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      els[i].innerHTML = t(key);
    }

    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var pKey = placeholders[j].getAttribute('data-i18n-placeholder');
      placeholders[j].setAttribute('placeholder', t(pKey));
    }
  }

  /** Switch the active language */
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    applyTranslations();

    // Update selector label
    var label = document.getElementById('currentLangLabel');
    if (label) label.textContent = lang.toUpperCase();

    // Highlight active item in dropdown
    var items = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute('data-lang') === lang) {
        items[i].classList.add('active');
      } else {
        items[i].classList.remove('active');
      }
    }

    // Notify other scripts (e.g. countdown needs to re-render labels)
    document.dispatchEvent(
      new CustomEvent('languageChanged', { detail: { lang: lang } })
    );
  }

  function getCurrentLang() {
    return currentLang;
  }

  // ── Initialise on DOM ready ──
  document.addEventListener('DOMContentLoaded', function () {
    // Bind language switcher clicks
    var langButtons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < langButtons.length; i++) {
      langButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        setLanguage(this.getAttribute('data-lang'));
      });
    }

    // Apply saved or default language
    setLanguage(currentLang);
  });

  // Expose public API
  window.i18n = {
    t: t,
    setLanguage: setLanguage,
    getCurrentLang: getCurrentLang,
  };
})();
