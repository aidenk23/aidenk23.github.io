/* ==========================================================================
   Home: hero, carrusel de proyectos con filtros, about, skills y experiencia.
   Todo se genera a partir de data/profile.js y data/projects.js.
   ========================================================================== */
(function () {
  const { t, tr, esc } = App;
  const P = window.PROFILE;
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------------- HERO ---------------- */
  const hero = {
    typedEl: $("[data-typed]"),
    timer: null,

    render() {
      $("[data-name]").textContent = P.name;
      $("[data-name]").dataset.text = P.name;
      $("[data-role]").textContent = tr(P.role);
      $("[data-role-visible]").textContent = tr(P.role);
      $("[data-sticky-text]").textContent = tr(P.stickyNote);
      $("[data-status]").hidden = !P.available;
    },

    // Teclea texto carácter a carácter
    type(el, text, speed = 55) {
      return new Promise((resolve) => {
        if (App.reduceMotion) { el.textContent = text; return resolve(); }
        let i = 0;
        const step = () => {
          el.textContent = text.slice(0, ++i);
          if (i < text.length) this.timer = setTimeout(step, speed + Math.random() * 40);
          else resolve();
        };
        step();
      });
    },
    erase(el, speed = 28) {
      return new Promise((resolve) => {
        const step = () => {
          el.textContent = el.textContent.slice(0, -1);
          if (el.textContent.length) this.timer = setTimeout(step, speed);
          else resolve();
        };
        step();
      });
    },
    wait(ms) { return new Promise((r) => (this.timer = setTimeout(r, ms))); },

    async loopTitles() {
      const token = (this.token = {});
      const titles = tr(P.titles);
      if (App.reduceMotion) { this.typedEl.textContent = titles.join(" · "); return; }
      let i = 0;
      while (token === this.token) {
        await this.type(this.typedEl, titles[i % titles.length]);
        await this.wait(1800);
        if (token !== this.token) break;
        await this.erase(this.typedEl);
        await this.wait(250);
        i++;
      }
    },

    restartTitles() {
      clearTimeout(this.timer);
      this.typedEl.textContent = "";
      this.loopTitles();
    },

    async boot() {
      this.render();
      const bootEl = $("[data-boot]");
      const screen = $(".monitor__screen");
      if (!App.reduceMotion) {
        screen.classList.add("is-booting");
        await this.type(bootEl, `${t("hero.boot")}...`, 30);
        await this.wait(250);
      } else {
        bootEl.textContent = `${t("hero.boot")}... ok`;
      }
      screen.classList.remove("is-booting");
      screen.classList.add("is-on");
      this.loopTitles();
    },

    clock() {
      const el = $("[data-clock]");
      const tick = () => {
        el.textContent = new Date().toLocaleTimeString(App.lang === "es" ? "es-ES" : "en-GB", { hour: "2-digit", minute: "2-digit" });
      };
      tick();
      setInterval(tick, 15000);
    },

    // Inclinación 3D suave del monitor siguiendo al cursor
    tilt() {
      const el = $("[data-tilt]");
      if (App.reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
      let raf;
      window.addEventListener("pointermove", (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const x = e.clientX / innerWidth - 0.5;
          const y = e.clientY / innerHeight - 0.5;
          el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
        });
      }, { passive: true });
    },
  };

  /* ---------------- PROYECTOS ---------------- */
  const projects = {
    track: $("[data-track]"),
    filter: new URLSearchParams(location.search).get("filter") || "all",

    usedCategories() {
      const used = new Set(window.PROJECTS.flatMap((p) => p.categories || []));
      return Object.keys(window.PROJECT_CATEGORIES).filter((k) => used.has(k));
    },

    renderFilters() {
      const wrap = $("[data-filters]");
      const cats = this.usedCategories();
      if (!cats.includes(this.filter)) this.filter = "all";
      wrap.innerHTML = ["all", ...cats].map((key) => {
        const label = key === "all" ? t("projects.all") : tr(window.PROJECT_CATEGORIES[key]);
        const n = key === "all" ? window.PROJECTS.length : window.PROJECTS.filter((p) => p.categories?.includes(key)).length;
        return `<button type="button" class="chip${key === this.filter ? " is-active" : ""}" data-filter="${key}" aria-pressed="${key === this.filter}">
          ${esc(label)}<span class="chip__n mono">${n}</span></button>`;
      }).join("");
    },

    card(p, i, total) {
      const cats = (p.categories || []).map((c) => `<li>${esc(tr(window.PROJECT_CATEGORIES[c]) || c)}</li>`).join("");
      return `
      <article class="project-card" role="listitem" style="--i:${i}" data-glow>
        <a class="project-card__link" href="project.html?id=${encodeURIComponent(p.id)}" draggable="false">
          <div class="project-card__media">
            <img src="${esc(p.cover)}" alt="" loading="lazy" draggable="false">
            <span class="project-card__index mono">${String(i + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}</span>
            <span class="project-card__year mono">${esc(String(p.date).slice(0, 4))}</span>
          </div>
          <div class="project-card__body">
            <ul class="tags">${cats}</ul>
            <h3 class="project-card__title">${esc(tr(p.title))}</h3>
            <p class="project-card__sub">${esc(tr(p.subtitle))}</p>
            <p class="project-card__summary">${esc(tr(p.summary))}</p>
            <span class="project-card__cta mono">${esc(t("projects.open"))} <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </article>`;
    },

    render() {
      const list = App.sortedProjects().filter((p) => this.filter === "all" || p.categories?.includes(this.filter));
      this.track.innerHTML = list.map((p, i) => this.card(p, i, list.length)).join("");
      $("[data-empty]").hidden = list.length > 0;
      $("[data-count]").textContent = t("projects.count", { n: list.length });
      this.track.scrollLeft = 0;
      this.update();
    },

    setFilter(key) {
      this.filter = key;
      const url = new URL(location.href);
      key === "all" ? url.searchParams.delete("filter") : url.searchParams.set("filter", key);
      history.replaceState(null, "", url);
      this.renderFilters();
      this.track.classList.remove("is-animating");
      void this.track.offsetWidth; // reinicia la animación de entrada
      this.track.classList.add("is-animating");
      this.render();
    },

    step() {
      const card = this.track.querySelector(".project-card");
      if (!card) return 0;
      return card.getBoundingClientRect().width + parseFloat(getComputedStyle(this.track).columnGap || 0);
    },

    go(dir) {
      const max = this.track.scrollWidth - this.track.clientWidth;
      const atEnd = this.track.scrollLeft >= max - 4;
      const atStart = this.track.scrollLeft <= 4;
      // Carrusel infinito: al llegar al final vuelve al principio y viceversa
      if (dir > 0 && atEnd) this.track.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir < 0 && atStart) this.track.scrollTo({ left: max, behavior: "smooth" });
      else this.track.scrollBy({ left: dir * this.step(), behavior: "smooth" });
    },

    update() {
      const max = this.track.scrollWidth - this.track.clientWidth;
      const ratio = max > 0 ? this.track.scrollLeft / max : 1;
      const visible = max > 0 ? this.track.clientWidth / this.track.scrollWidth : 1;
      const bar = $("[data-progress]");
      bar.style.width = `${Math.max(visible, 0.08) * 100}%`;
      bar.style.transform = `translateX(${ratio * (1 / Math.max(visible, 0.08) - 1) * 100}%)`;
      const scrollable = max > 4;
      $("[data-prev]").disabled = !scrollable;
      $("[data-next]").disabled = !scrollable;
    },

    initDrag() {
      const tr_ = this.track;
      let down = false, startX = 0, startLeft = 0, moved = false;
      tr_.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        down = true; moved = false;
        startX = e.clientX; startLeft = tr_.scrollLeft;
      });
      window.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5 && !moved) { moved = true; tr_.classList.add("is-dragging"); }
        if (moved) tr_.scrollLeft = startLeft - dx;
      });
      window.addEventListener("pointerup", () => {
        if (!down) return;
        down = false;
        tr_.classList.remove("is-dragging");
      });
      // Si se ha arrastrado, no abrir el proyecto al soltar
      tr_.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
    },

    init() {
      this.renderFilters();
      this.render();
      $("[data-filters]").addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (btn) this.setFilter(btn.dataset.filter);
      });
      $("[data-prev]").addEventListener("click", () => this.go(-1));
      $("[data-next]").addEventListener("click", () => this.go(1));
      this.track.addEventListener("scroll", () => this.update(), { passive: true });
      this.track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); this.go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); this.go(-1); }
      });
      window.addEventListener("resize", () => this.update());
      this.initDrag();
    },
  };

  /* ---------------- ABOUT ---------------- */
  const about = {
    render() {
      $("[data-about-hello]").textContent = tr(P.about.hello);
      $("[data-about-lead]").textContent = tr(P.about.lead);
      $("[data-about-body]").textContent = tr(P.about.body);
      $("[data-linkedin]").href = P.linkedin;
      const photo = $("[data-photo]");
      photo.src = P.photo;
      photo.alt = P.name;

      const stats = [
        { n: App.yearsSince(P.careerStart), label: t("about.stat.years"), plus: true },
        { n: window.PROJECTS.length, label: t("about.stat.projects") },
        { n: P.skills.length, label: t("about.stat.tools") },
      ];
      const dl = $("[data-stats]");
      dl.innerHTML = stats.map((s) => `
        <div class="stat"><dt>${esc(s.label)}</dt><dd class="mono"><span data-count-to="${s.n}">${s.n}</span>${s.plus ? "+" : ""}</dd></div>`).join("");
      this.countUp(dl);

      const langs = P.languages.map((l) => `${tr(l.name)} <small>(${tr(l.level)})</small>`).join(" · ");
      $("[data-contact-list]").innerHTML = `
        <li><span class="mono">@</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a></li>
        <li><span class="mono">in</span><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
        ${P.github ? `<li><span class="mono">gh</span><a href="${esc(P.github)}" target="_blank" rel="noopener">${esc(P.github.replace(/^https?:\/\//, ""))}</a></li>` : ""}
        <li><span class="mono">◎</span>${esc(tr(P.location))}</li>
        <li><span class="mono">Aa</span><span>${langs}</span></li>
        ${P.available ? `<li class="is-available"><span class="status-pill__dot"></span>${esc(t("hero.status"))}</li>` : ""}`;
    },

    countUp(root) {
      if (App.reduceMotion) return;
      const els = root.querySelectorAll("[data-count-to]");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const target = Number(el.dataset.countTo);
          const start = performance.now();
          const frame = (now) => {
            const p = Math.min(1, (now - start) / 900);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
          io.unobserve(el);
        });
      }, { threshold: 0.6 });
      els.forEach((el) => io.observe(el));
    },
  };

  /* ---------------- SKILLS ---------------- */
  const skills = {
    render() {
      $("[data-skill-grid]").innerHTML = P.skills.map((s, i) => {
        const mono = `<span class="mono">${esc(s.abbr || s.name.slice(0, 2))}</span>`;
        // Si el icono no existe o falla, se sustituye por el monograma
        const icon = s.icon
          ? `<img class="skill__icon" src="img/icons/${esc(s.icon)}.svg" alt="" loading="lazy"
               onerror="this.outerHTML='<span class=&quot;skill__icon is-mono&quot;>${esc(s.abbr || s.name.slice(0, 2))}</span>'">`
          : `<span class="skill__icon is-mono">${mono}</span>`;
        return `
        <li class="skill" style="--i:${i}" data-glow>
          ${icon}
          <span class="skill__name">${esc(s.name)}</span>
        </li>`;
      }).join("");

      $("[data-soft-list]").innerHTML = P.softSkills.map((s, i) => `
        <li style="--i:${i}"><span class="mono">0${i + 1}</span>${esc(tr(s))}</li>`).join("");
    },
  };

  /* ---------------- EXPERIENCIA / ESTUDIOS ---------------- */
  const experience = {
    item(e) {
      const tasks = (e.tasks || []).map((x) => `<li>${esc(tr(x))}</li>`).join("");
      return `
      <li class="tl-item" data-reveal>
        <div class="tl-item__row">
          <h4 class="tl-item__title">${esc(tr(e.title))}</h4>
          <span class="tl-item__leader" aria-hidden="true"></span>
          <p class="tl-item__date mono">
            <time datetime="${esc(e.start)}">${esc(App.formatYM(e.start))}</time> | ${e.end ? `<time datetime="${esc(e.end)}">${esc(App.formatYM(e.end))}</time>` : `<span class="is-now">${esc(t("exp.present"))}</span>`}
          </p>
        </div>
        <p class="tl-item__place">${esc(tr(e.place))} <span class="tl-item__dur mono">· ${esc(App.duration(e.start, e.end))}</span></p>
        ${tasks ? `<ul class="tl-item__tasks">${tasks}</ul>` : ""}
      </li>`;
    },
    render() {
      const byDate = (a, b) => String(b.start).localeCompare(String(a.start));
      $("[data-experience]").innerHTML = [...P.experience].sort(byDate).map((e) => this.item(e)).join("");
      $("[data-studies]").innerHTML = [...P.studies].sort(byDate).map((e) => this.item(e)).join("");
    },
  };

  /* ---------------- Arranque ---------------- */
  function renderAll() {
    hero.render();
    about.render();
    skills.render();
    experience.render();
    App.observeReveal();
  }

  hero.boot();
  hero.clock();
  hero.tilt();
  projects.init();
  renderAll();

  document.addEventListener("langchange", () => {
    renderAll();
    hero.restartTitles();
    projects.renderFilters();
    projects.render();
    // Vuelve a "descifrar" los títulos visibles con el nuevo idioma
    document.querySelectorAll("[data-scramble].is-visible").forEach((el) => App.scramble(el.querySelector("[data-i18n]") || el));
    $("[data-name]").classList.remove("glitch-once");
    void $("[data-name]").offsetWidth;
    $("[data-name]").classList.add("glitch-once");
  });
})();
