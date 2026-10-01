/* ============================================================
   site.js — logique d'affichage du site Crème Anglaise
   Remplit : menu, galerie photos, vidéos, agenda (media.json),
   répertoire & programmes (data.js), formulaire de contact.
   Requiert : var LANG ('fr'|'en'), var I18N, data.js chargé avant.
   ============================================================ */
(function () {
  'use strict';

  var FLAGS = { fr: '\uD83C\uDDEB\uD83C\uDDF7', en: '\uD83C\uDDEC\uD83C\uDDE7', bilingual: '\uD83C\uDF0D', other: '\uD83C\uDF10' };

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function tr(obj, base) { return obj[base + '_' + LANG] || obj[base + '_fr'] || ''; }

  /* ---------------- Menu burger ---------------- */
  var menuBtn = $('menuBtn'), menuPanel = $('menuPanel'), menuOverlay = $('menuOverlay');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  if ($('menuLinks')) {
    $('menuLinks').querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------------- Répertoire (data.js) ---------------- */
  if (typeof PROGRAMS !== 'undefined' && $('progGrid')) {
    $('progGrid').innerHTML = PROGRAMS.map(function (p) {
      return '<div class="rep-prog"><h3>' + esc(tr(p, 'title')) + '</h3>' +
        '<p class="prog-sub">' + esc(tr(p, 'sub')) + '</p>' +
        '<ul>' + p.songs.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
  }

  var currentTab = 'all';
  function renderSongs() {
    var grid = $('songGrid');
    if (!grid || typeof SONGS === 'undefined') return;
    var list = SONGS.filter(function (s) { return currentTab === 'all' || s.lang === currentTab; });
    grid.innerHTML = list.map(function (s) {
      return '<div class="song-card fade-in"><span class="song-flag">' + (FLAGS[s.lang] || '\uD83C\uDFB5') +
        '</span><span class="song-title">' + esc(s.title) + '</span></div>';
    }).join('');
  }
  document.querySelectorAll('.rep-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.rep-tab').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab') || 'all';
      renderSongs();
    });
  });
  renderSongs();

  var repToggle = $('repToggle'), repFull = $('repFull');
  if (repToggle && repFull) {
    repToggle.addEventListener('click', function () {
      var hidden = repFull.hasAttribute('hidden');
      if (hidden) { repFull.removeAttribute('hidden'); } else { repFull.setAttribute('hidden', ''); }
      repToggle.setAttribute('aria-expanded', hidden ? 'true' : 'false');
      repToggle.innerHTML = hidden ? I18N.hideAll : I18N.showAll;
      if (hidden) renderSongs();
    });
  }

  /* ---------------- Médias & agenda (media.json) ---------------- */
  function renderGallery(media) {
    var grid = $('galleryGrid');
    if (!grid) return;
    var photos = media.photos || [];
    var html = photos.map(function (p, i) {
      var cap = tr(p, 'caption');
      return '<div class="gallery-item gallery-item--photo" data-idx="' + i + '" role="button" tabindex="0" aria-label="' + esc(cap) + '">' +
        '<img src="' + esc(p.file) + '" alt="' + esc(cap) + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.parentElement.classList.add(\'img-fallback\');" />' +
        '<div class="gallery-caption">' + esc(cap) + '</div></div>';
    }).join('');
    html += '<div class="gallery-item gallery-item--placeholder">' +
      '<div class="gallery-item-icon">\uD83D\uDCF8</div>' +
      '<div class="gallery-item-label"><strong>' + I18N.phTitle + '</strong>' + I18N.phSub + '</div>' +
      '<span class="gallery-upload-hint">' + I18N.phHint + '</span></div>';
    grid.innerHTML = html;
    initLightbox(photos);
  }

  /* ---------------- Lightbox (agrandissement des photos) ---------------- */
  var lb = null, lbImg = null, lbCap = null;
  function initLightbox(photos) {
    if (!photos.length) return;
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.innerHTML = '<button class="lightbox-close" aria-label="Fermer">\u2715</button>' +
        '<img alt="" /><figcaption></figcaption>';
      document.body.appendChild(lb);
      lbImg = lb.querySelector('img');
      lbCap = lb.querySelector('figcaption');
      function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
      lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
    }
    document.querySelectorAll('#galleryGrid .gallery-item--photo').forEach(function (el) {
      function open() {
        var p = photos[parseInt(el.getAttribute('data-idx'), 10)];
        if (!p) return;
        lbImg.src = p.file;
        var cap = tr(p, 'caption');
        lbImg.alt = cap;
        lbCap.textContent = cap;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      el.addEventListener('click', open);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function renderVideos(media) {
    var grid = $('videosGrid');
    if (!grid) return;
    grid.innerHTML = (media.videos || []).map(function (v) {
      return '<div class="video-card"><video class="video-native" preload="metadata" controls playsinline controlsList="nodownload">' +
        '<source src="' + esc(v.file) + '" type="video/mp4"/></video>' +
        '<div class="video-info"><h3>' + esc(tr(v, 'title')) + '</h3><p>' + esc(tr(v, 'desc')) + '</p></div></div>';
    }).join('');
  }

  function renderAgenda(media) {
    var wrap = $('agendaWrap');
    if (!wrap) return;
    var events = media.events || [];
    if (!events.length) { wrap.innerHTML = ''; return; }
    var upcoming = events.filter(function (e) { return e.type === 'upcoming'; });
    var past = events.filter(function (e) { return e.type !== 'upcoming'; });

    function itemHtml(e, isUpcoming) {
      var month = LANG === 'en' ? (e.month_en || e.month_fr) : (e.month_fr || e.month_en);
      return '<div class="agenda-item ' + (isUpcoming ? 'agenda-upcoming' : 'agenda-past') + '">' +
        '<div class="agenda-date"><div class="day">' + esc(e.day || '--') + '</div>' +
        '<div class="month">' + esc(month || '') + '</div></div>' +
        '<div class="agenda-info"><h3>' + esc(tr(e, 'title')) + '</h3>' +
        '<p>\uD83D\uDCCD ' + esc(tr(e, 'place')) + '</p>' +
        '<span class="tag">' + (isUpcoming ? I18N.tagUpcoming : I18N.tagPast) + '</span></div></div>';
    }

    var html = '';
    if (upcoming.length) {
      html += '<p class="section-label" style="margin:8px 0 16px;">' + I18N.future + '</p>' +
        '<div class="agenda-list">' + upcoming.map(function (e) { return itemHtml(e, true); }).join('') + '</div>';
    }
    if (past.length) {
      html += '<p class="section-label" style="margin:' + (upcoming.length ? '34px' : '8px') + ' 0 16px;">' + I18N.past + '</p>' +
        '<div class="agenda-list">' + past.map(function (e) { return itemHtml(e, false); }).join('') + '</div>';
    }
    wrap.innerHTML = html;
  }

  function animate() {
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.about-card, .agenda-item, .rejoindre-card, .video-card, .gallery-item').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(el);
    });
  }

  /* Copie de secours des médias : garantit l'affichage des photos/vidéos/agenda
     même si media.json est momentanément inaccessible (cache, réseau, file://). */
  var FALLBACK_MEDIA = {"photos":[{"file":"images/photo-3.jpg","caption_fr":"Concert dans une église · Village breton","caption_en":"Church concert · Breton village","wide":true},{"file":"images/photo-2.jpg","caption_fr":"Stand de présentation · Forum des associations","caption_en":"Presentation stand · Associations fair","wide":false},{"file":"images/photo-1.jpg","caption_fr":"80ème anniversaire de la Libération · La Rance Libérée — Évran, août 2024","caption_en":"80th anniversary of Liberation · La Rance Libérée — Évran, August 2024","wide":false},{"file":"images/photo-4.jpg","caption_fr":"Concert en plein air · Bretagne","caption_en":"Outdoor concert · Brittany","wide":true}],"videos":[{"file":"videos/concert-1.mp4","title_fr":"Concert · Extrait 1","title_en":"Concert · Clip 1","desc_fr":"Chorale Crème Anglaise en performance","desc_en":"Crème Anglaise choir in performance"},{"file":"videos/concert-2.mp4","title_fr":"Concert · Extrait 2","title_en":"Concert · Clip 2","desc_fr":"Chorale Crème Anglaise en performance","desc_en":"Crème Anglaise choir in performance"},{"file":"videos/concert-3.mp4","title_fr":"Concert · Extrait 3","title_en":"Concert · Clip 3","desc_fr":"Chorale Crème Anglaise en performance","desc_en":"Crème Anglaise choir in performance"},{"file":"videos/concert-4.mp4","title_fr":"Concert · Extrait 4","title_en":"Concert · Clip 4","desc_fr":"Chorale Crème Anglaise en performance","desc_en":"Crème Anglaise choir in performance"},{"file":"videos/concert-5.mp4","title_fr":"Concert · Extrait 5","title_en":"Concert · Clip 5","desc_fr":"Chorale Crème Anglaise en performance","desc_en":"Crème Anglaise choir in performance"}],"events":[{"type":"past","day":"19","month_fr":"Juin 26","month_en":"Jun 26","title_fr":"Fête de la Musique","title_en":"Music Day (Fête de la Musique)","place_fr":"Durée : 42 min · 15 titres","place_en":"Duration: 42 min · 15 songs"},{"type":"past","day":"30","month_fr":"Mai 26","month_en":"May 26","title_fr":"Concert à l'EHPAD d'Évran & St Pern","title_en":"Concert at Évran & St Pern care home","place_fr":"EHPAD Évran & St Pern · 45 min · 15 titres","place_en":"Évran & St Pern care home · 45 min · 15 songs"},{"type":"past","day":"23","month_fr":"Mai 26","month_en":"May 26","title_fr":"Concert à l'EHPAD d'Évran & St Pern","title_en":"Concert at Évran & St Pern care home","place_fr":"EHPAD Évran & St Pern · 45 min · 15 titres","place_en":"Évran & St Pern care home · 45 min · 15 songs"}]};

  function showMedia(media) {
    renderGallery(media);
    renderVideos(media);
    renderAgenda(media);
    animate();
  }

  fetch('media.json?v=' + Date.now())
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (media) {
      if (!media || !Array.isArray(media.photos) || media.photos.length === 0) throw new Error('vide');
      showMedia(media);
    })
    .catch(function () {
      /* media.json inaccessible ou vide : on affiche la copie de secours */
      showMedia(FALLBACK_MEDIA);
    });

  /* ---------------- Formulaire de contact ---------------- */
  var form = $('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var first = ($('fFirst') || {}).value || '';
      var last = ($('fLast') || {}).value || '';
      var mail = ($('fMail') || {}).value || '';
      var obj = ($('fObj') || {}).value || (LANG === 'en' ? 'Message from the website' : 'Message depuis le site');
      var msg = ($('fMsg') || {}).value || '';
      var subject = encodeURIComponent('[Crème Anglaise] ' + obj);
      var body = encodeURIComponent(
        (LANG === 'en' ? 'First name: ' : 'Prénom : ') + first.trim() + '\n' +
        (LANG === 'en' ? 'Last name: ' : 'Nom : ') + last.trim() + '\n' +
        'E-mail : ' + mail.trim() + '\n\n' + msg.trim()
      );
      window.location.href = 'mailto:c.a.chorale22@gmail.com?subject=' + subject + '&body=' + body;
      var btn = form.querySelector('button[type="submit"], .btn-submit');
      if (btn) {
        var old = btn.innerHTML;
        btn.innerHTML = '\u2713 ' + I18N.thanks;
        btn.disabled = true;
        setTimeout(function () { btn.innerHTML = old; btn.disabled = false; }, 4000);
      }
    });
  }
})();
