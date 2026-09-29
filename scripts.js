/* ============================================================
   La Cañada Style · Tarjeta digital
   Todo lo editable está en CONFIG. No se inventan datos: los
   campos marcados como pendientes deben completarse con datos
   reales del cliente.
   ============================================================ */

const CONFIG = {
  cliente: {
    nombre: "La Cañada Style",
    nombreCompleto: "La Cañada Style",
    profesion: "Peluquería Profesional",
    tagline: "Corte · Barba · Tinte · Manicura",
    disponible: true,
    verificado: true
  },
  colores: {
    primary:  "#1a1408",
    secondary:"#c6a43f",
    accent:   "#f6ecd2"
  },
  contacto: {
    telefonoDisplay: "+57 324 214 3861",
    telefonoE164: "+573242143861",
    whatsapp: "573242143861",
    mensajeWhatsapp: "Hola quiero agendar una cita en La Cañada Style",
    email: ""
  },
  urlTarjeta: window.location.href,

  /* PENDIENTE: pegar aquí los enlaces reales (ej. https://instagram.com/lacanadastyle).
     Mientras estén vacíos, los botones NO se muestran (evita enlaces rotos). */
  redes: {
    instagram: "",
    facebook: "",
    tiktok: ""
  },

  servicios: [
    { icono:"fa-solid fa-scissors", nombre:"Corte de Autor", descripcion:"Estilos clásicos, vanguardistas y de tendencia para hombre, mujer o niño.", precio:"" },
    { icono:"fa-solid fa-mug-hot", nombre:"Barba & Toalla", descripcion:"Servicio premium con toalla caliente, navaja y loción hidratante.", precio:"" },
    { icono:"fa-solid fa-palette", nombre:"Tinte & Mechas", descripcion:"Coloración de alta gama, cubrimiento de canas y reflejos estructurados.", precio:"" },
    { icono:"fa-solid fa-hand-sparkles", nombre:"Manicura Premium", descripcion:"Cuidado integral estético y profiláctico de manos y pies.", precio:"" }
  ],

  /* Fotos de trabajos. Se muestran las disponibles + láminas "Foto pendiente"
     para completar el carrusel; al recibir más fotos, agrégalas aquí. */
  galeria: [
    { src:"https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format", alt:"Corte Ejecutivo" },
    { src:"https://images.unsplash.com/photo-1599351431205-1d0a024b4b6d?q=80&w=600&auto=format", alt:"Perfilado de Barba" }
  ],

  cobertura: {
    texto: "Atención en nuestro estudio en la parte alta de El Morro, La Cañada.",
    zonas: ["El Morro", "La Cañada"]
  },

  informacion: {
    horarios: [
      { dias: "Lunes a Viernes", horas: "9:00 AM – 7:00 PM" },
      { dias: "Sábado", horas: "9:00 AM – 4:00 PM" }
    ],
    direccion: "El Morro, La Cañada, Colombia"
  }
};

/* ── utilidades ── */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

(function(){
  "use strict";

  /* ── Servicios (con precio, o "Precio a consultar" si falta) ── */
  const listaServicios = $('#lista-servicios');
  CONFIG.servicios.forEach(s => {
    const precio = s.precio ? `<span class="precio">${esc(s.precio)}</span>` : `<span class="precio precio-pend">Precio a consultar</span>`;
    listaServicios.insertAdjacentHTML('beforeend', `
      <div class="servicio-item">
        <div class="ic"><i class="${s.icono}" aria-hidden="true"></i></div>
        <div class="servicio-cuerpo"><h3>${esc(s.nombre)}</h3><p>${esc(s.descripcion)}</p>${precio}</div>
      </div>`);
  });

  /* ── Galería: fotos reales + láminas "Foto pendiente" ── */
  const wrapper = $('#swiper-wrapper');
  CONFIG.galeria.forEach(g => {
    wrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></div>`);
  });
  const FALTANTES = 6 - CONFIG.galeria.length;
  for (let i = 0; i < FALTANTES; i++) {
    wrapper.insertAdjacentHTML('beforeend', `
      <div class="swiper-slide">
        <div class="ph" role="img" aria-label="Foto pendiente por agregar">
          <i class="fa-regular fa-image" aria-hidden="true"></i>
          <span>Foto pendiente</span>
        </div>
      </div>`);
  }

  /* ── Horarios (tabla visible) ── */
  const tablaHorarios = $('#horarios-tabla');
  CONFIG.informacion.horarios.forEach(h => {
    tablaHorarios.insertAdjacentHTML('beforeend', `
      <div class="horario-row">
        <span class="horario-dias">${esc(h.dias)}</span>
        <span class="horario-horas">${esc(h.horas)}</span>
      </div>`);
  });

  /* ── Información (dirección → Google Maps, correo → mailto) ── */
  const listaInfo = $('#lista-informacion');
  if (CONFIG.informacion.direccion) {
    const q = encodeURIComponent(CONFIG.informacion.direccion);
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener noreferrer">
        <span class="ic"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.informacion.direccion)}</span>
      </a>`);
  }
  if (CONFIG.contacto.email) {
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="mailto:${esc(CONFIG.contacto.email)}">
        <span class="ic"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.contacto.email)}</span>
      </a>`);
  }

  const chips = $('#cobertura-chips');
  CONFIG.cobertura.zonas.forEach(z => {
    chips.insertAdjacentHTML('beforeend', `<span class="chip">${esc(z)}</span>`);
  });

  /* ── Redes: solo se muestran si hay enlace real ── */
  const redesRow = $('#redes-row');
  const redes = [
    { key:'instagram', icono:'fa-brands fa-instagram', nombre:'Instagram' },
    { key:'facebook',  icono:'fa-brands fa-facebook-f', nombre:'Facebook' },
    { key:'tiktok',    icono:'fa-brands fa-tiktok', nombre:'TikTok' }
  ];
  let redesVisibles = 0;
  redes.forEach(r => {
    const url = CONFIG.redes[r.key];
    if (url && !/^https:\/\/(instagram|facebook|tiktok)\.com\/?$/.test(url)) {
      redesRow.insertAdjacentHTML('beforeend',
        `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${r.nombre}"><i class="${r.icono}" aria-hidden="true"></i></a>`);
      redesVisibles++;
    }
  });
  if (!redesVisibles) redesRow.style.display = 'none';

  /* ── Acciones ── */
  function accionWhatsApp(){
    window.open(`https://wa.me/${CONFIG.contacto.whatsapp}?text=${encodeURIComponent(CONFIG.contacto.mensajeWhatsapp)}`, '_blank');
  }
  function accionLlamar(){
    window.location.href = `tel:${CONFIG.contacto.telefonoE164}`;
  }
  function accionGuardarContacto(){
    const v = [
      "BEGIN:VCARD","VERSION:3.0",
      `FN:${CONFIG.cliente.nombreCompleto}`,
      `ORG:${CONFIG.cliente.nombreCompleto}`,
      `TITLE:${CONFIG.cliente.profesion}`,
      `TEL;TYPE=CELL:${CONFIG.contacto.telefonoE164}`
    ];
    if (CONFIG.contacto.email) v.push(`EMAIL:${CONFIG.contacto.email}`);
    v.push(
      `ADR;TYPE=WORK:;;${CONFIG.informacion.direccion};;;Colombia`,
      `URL:${CONFIG.urlTarjeta}`,
      "END:VCARD"
    );
    const blob = new Blob([v.join("\n")], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'La_Canada_Style.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    mostrarToast("Contacto descargado");
  }
  async function accionShareNativo(){
    try {
      await navigator.share({
        title: CONFIG.cliente.nombreCompleto,
        text: CONFIG.cliente.tagline,
        url: CONFIG.urlTarjeta
      });
    } catch (e) { /* cancelado por el usuario */ }
  }
  function accionCopiarLink(){
    const t = CONFIG.urlTarjeta;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(() => mostrarToast("Vínculo copiado"), () => copiarFallback(t));
    } else {
      copiarFallback(t);
    }
  }
  function copiarFallback(texto){
    const ta = document.createElement('textarea');
    ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); mostrarToast("Vínculo copiado"); } catch (e) { mostrarToast("Copia: " + texto); }
    ta.remove();
  }

  /* ── Modales ── */
  let swiperInstance = null;
  function abrirModal(id){
    const el = document.getElementById(id);
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (id === 'modal-galeria' && !swiperInstance) {
      swiperInstance = new Swiper('#swiper-galeria', {
        loop: true, spaceBetween: 10, autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }
    if (id === 'modal-compartir') {
      const qrEl = $('#qr-code');
      if (!qrEl.dataset.rendered) {
        new QRCode(qrEl, { text: CONFIG.urlTarjeta, width: 150, height: 150, colorDark: CONFIG.colores.primary });
        qrEl.dataset.rendered = "1";
      }
    }
  }
  function cerrarModal(el){
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function cerrarTodos(){
    document.querySelectorAll('.modal.is-open').forEach(m => cerrarModal(m));
  }

  /* ── Delegación de clics ── */
  document.addEventListener('click', function(e){
    const btnAction = e.target.closest('[data-action]');
    if (btnAction) {
      const act = btnAction.dataset.action;
      if (act === 'whatsapp') accionWhatsApp();
      else if (act === 'llamar') accionLlamar();
      else if (act === 'guardar') accionGuardarContacto();
      else if (act === 'copiar-link') accionCopiarLink();
      else if (act === 'compartir') abrirModal('modal-compartir');
      return;
    }

    const btnScroll = e.target.closest('[data-scroll]');
    if (btnScroll) {
      const destino = document.getElementById(btnScroll.dataset.scroll);
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const btnModal = e.target.closest('[data-modal]');
    if (btnModal) { abrirModal(btnModal.dataset.modal); return; }

    if (e.target.closest('[data-close]')) { cerrarModal(e.target.closest('[data-modal-root]')); return; }
    if (e.target.hasAttribute('data-modal-root')) { cerrarModal(e.target); return; }
  });

  /* ── Compartir nativo (solo si el navegador lo soporta) ── */
  const btnShare = $('#btn-share-nativo');
  if (navigator.share) {
    btnShare.style.display = '';
    btnShare.addEventListener('click', accionShareNativo);
  }

  /* ── Teclado: Escape cierra modales ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarTodos();
  });

  function mostrarToast(msg){
    const t = $('#toast'); t.textContent = msg; t.classList.add('is-visible');
    setTimeout(() => t.classList.remove('is-visible'), 2200);
  }

  /* ── Splash, año y service worker ── */
  window.addEventListener('load', () => {
    setTimeout(() => $('#splash').classList.add('is-hidden'), 800);
    $('#anio').textContent = new Date().getFullYear();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  });
})();
