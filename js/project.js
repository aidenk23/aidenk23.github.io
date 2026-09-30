/* ==========================================================================
   Ficha de proyecto: project.html?id=<id>
   Misma estructura para todos: título, descripción, filtro/categorías,
   imagen principal, overview (tiempo, herramientas, rol, resumen) y galería.
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const root = document.querySelector("[data-project]");
  const id = new URLSearchParams(location.search).get("id");
  const list = App.sortedProjects();

  function notFound() {
    document.title = `${t("project.notfound")} — 303/AIDEN`;
    root.innerHTML = `
      <div class="not-found">
        <p class="mono kicker">// 404</p>
        <h1 class="section-title glitch" data-text="${esc(t("project.notfound"))}">${esc(t("project.notfound"))}</h1>
        <p>${esc(t("project.notfound.text"))}</p>
        <a class="btn btn--primary" href="index.html#projects">← ${esc(t("project.back"))}</a>
      </div>`;
  }

  function render() {
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return notFound();
    const p = list[idx];
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    const title = tr(p.title);

    document.title = `${title} — 303/AIDEN`;
    document.querySelector('meta[name="description"]').content = tr(p.summary);

    const tags = (p.categories || []).map((c) => `
      <li><a class="chip chip--link" href="index.html?filter=${encodeURIComponent(c)}#projects" title="${esc(t("project.filterBy"))} ${esc(tr(window.PROJECT_CATEGORIES[c]))}">
        <span class="mono">#</span>${esc(tr(window.PROJECT_CATEGORIES[c]) || c)}</a></li>`).join("");

    const tools = (p.tools || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const highlights = (p.highlights || []).map((h) => `<li>${esc(tr(h))}</li>`).join("");
    const gallery = (p.gallery || []).map((g, i) => `
      <li data-reveal style="--i:${i}">
        <button type="button" class="gallery__item" data-open="${i}">
          <img src="${esc(g.src)}" alt="${esc(tr(g.caption))}" loading="lazy" onload="this.naturalHeight > this.naturalWidth && this.parentNode.classList.add('is-portrait')">
          <span class="gallery__caption mono">${String(i + 1).padStart(2, "0")} · ${esc(tr(g.caption))}</span>
        </button>
      </li>`).join("");

    const links = [
      p.links?.live && `<a class="btn btn--primary" href="${esc(p.links.live)}" target="_blank" rel="noopener">${esc(t("project.live"))} <span aria-hidden="true">↗</span></a>`,
      p.links?.repo && `<a class="btn btn--ghost" href="${esc(p.links.repo)}" target="_blank" rel="noopener">${esc(t("project.repo"))} <span aria-hidden="true">↗</span></a>`,
    ].filter(Boolean).join("");

    root.innerHTML = `
      <a class="back-link mono" href="index.html#projects">← ${esc(t("project.back"))}</a>

      <header class="project-head">
        <p class="kicker mono">// ${String(idx + 1).padStart(2, "0")} · ${esc(String(p.date).slice(0, 4))}</p>
        <h1 class="project-title glitch" data-text="${esc(title)}" data-title>${esc(title)}</h1>
        <div class="project-desc panel" data-glow>
          <p class="project-desc__sub mono">${esc(tr(p.subtitle))}</p>
          <p>${esc(tr(p.summary))}</p>
        </div>
        <ul class="project-tags">${tags}</ul>
      </header>

      <figure class="browser" data-reveal>
        <div class="browser__bar" aria-hidden="true">
          <span class="screen-bar__dots"><i></i><i></i><i></i></span>
          <span class="browser__url mono">${esc(p.links?.live ? p.links.live.replace(/^https?:\/\//, "") : `${p.id}.local`)}</span>
        </div>
        <img src="${esc(p.cover)}" alt="${esc(title)}">
      </figure>

      <section class="overview" aria-labelledby="overview-title">
        <h2 class="overview__title" id="overview-title" data-reveal>${esc(t("project.overview"))}</h2>
        <div class="overview__grid">
          <dl class="overview__meta" data-reveal>
            <div><dt class="mono">${esc(t("project.timeline"))}:</dt><dd>${esc(tr(p.time))}</dd></div>
            <div><dt class="mono">${esc(t("project.role"))}:</dt><dd>${esc(tr(p.role))}</dd></div>
            <div><dt class="mono">${esc(t("project.tools"))}:</dt><dd><ul class="tools">${tools}</ul></dd></div>
          </dl>
          <div class="overview__goal panel" data-reveal data-glow>
            <h3 class="mono">${esc(t("project.goal"))}</h3>
            <p>${esc(tr(p.goal))}</p>
            ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
            ${links ? `<div class="overview__links">${links}</div>` : ""}
          </div>
        </div>
      </section>

      ${gallery ? `
      <section class="gallery" aria-labelledby="gallery-title">
        <h2 class="sub-title mono" id="gallery-title" data-reveal>${esc(t("project.photos"))} <span aria-hidden="true">↓</span></h2>
        <ul class="gallery__grid">${gallery}</ul>
      </section>` : ""}

      <nav class="project-nav" aria-label="${esc(t("nav.projects"))}">
        <a href="project.html?id=${encodeURIComponent(prev.id)}" class="project-nav__link">
          <span class="mono">← ${esc(t("project.prev"))}</span><strong>${esc(tr(prev.title))}</strong>
        </a>
        <a href="project.html?id=${encodeURIComponent(next.id)}" class="project-nav__link project-nav__link--next">
          <span class="mono">${esc(t("project.next"))} →</span><strong>${esc(tr(next.title))}</strong>
        </a>
      </nav>`;

    App.observeReveal(root);
    App.scramble(root.querySelector("[data-title]"), title, { duration: 900 });
    lightbox.items = p.gallery || [];
  }

  /* ---------- Lightbox de la galería ---------- */
  const lb = document.querySelector("[data-lightbox]");
  const lightbox = {
    items: [],
    index: 0,
    lastFocus: null,
    open(i) {
      this.lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.classList.add("no-scroll");
      requestAnimationFrame(() => lb.classList.add("is-open"));
      this.show(i);
      lb.querySelector("[data-lightbox-close]").focus();
    },
    show(i) {
      if (!this.items.length) return;
      this.index = (i + this.items.length) % this.items.length;
      const item = this.items[this.index];
      const img = lb.querySelector("[data-lightbox-img]");
      img.src = item.src;
      img.alt = tr(item.caption);
      lb.querySelector("[data-lightbox-caption]").textContent = `${this.index + 1}/${this.items.length} · ${tr(item.caption)}`;
      const multi = this.items.length > 1;
      lb.querySelector("[data-lightbox-prev]").hidden = !multi;
      lb.querySelector("[data-lightbox-next]").hidden = !multi;
    },
    close() {
      lb.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      setTimeout(() => (lb.hidden = true), 200);
      this.lastFocus?.focus();
    },
  };

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) lightbox.open(Number(btn.dataset.open));
  });
  lb.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
  lb.querySelector("[data-lightbox-prev]").addEventListener("click", () => lightbox.show(lightbox.index - 1));
  lb.querySelector("[data-lightbox-next]").addEventListener("click", () => lightbox.show(lightbox.index + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lightbox.close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lightbox.close();
    if (e.key === "ArrowRight") lightbox.show(lightbox.index + 1);
    if (e.key === "ArrowLeft") lightbox.show(lightbox.index - 1);
    if (e.key === "Tab") {
      // Mantiene el foco dentro del lightbox
      const f = [...lb.querySelectorAll("button:not([hidden])")];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  render();
  document.addEventListener("langchange", render);
})();
