/* ================================================================
   STUDIIT app.js — v6.0 (Sin Errores / Local-First / ES6)
   ================================================================ */
"use strict";

const TRANSLATIONS = {
  es: {
    "nav.feed": "Inicio",
    "nav.apuntes": "Apuntes",
    "nav.metodos": "Métodos",
    "nav.foro": "Foro",
    "nav.perfil": "Perfil",
    "section.feed.title": "🔥 Trending ahora",
    "section.feed.sub": "Lo más popular de la comunidad",
    "section.apuntes.title": "📚 Banco de Apuntes",
    "section.apuntes.sub": "PDFs compartidos por estudiantes",
    "section.metodos.title": "🧠 Métodos de Estudio",
    "section.metodos.sub": "Técnicas probadas por la comunidad",
    "section.foro.title": "💬 Foro Q&A",
    "section.foro.sub": "Resuelve tus dudas paso a paso",
    "profile.title": "Mi Perfil",
    "profile.sub": "Estudiante de Studiit",
    "profile.name": "✏️ Mi Nombre",
    "profile.color": "🎨 Color de mi avatar",
    "profile.theme": "🌓 Apariencia",
    "profile.lang": "🌍 Idioma",
    "profile.stats": "🏆 Mis Estadísticas",
    "profile.achievements": "🥇 Logros Desbloqueados",
    "theme.dark": "Oscuro",
    "theme.light": "Claro",
    "stat.posts": "Publicaciones",
    "stat.votes": "Votos dados",
    "stat.level": "Nivel",
    "toast.lang": "Idioma cambiado a Español",
    "toast.theme": "Tema actualizado",
    "toast.profile_saved": "Nombre guardado correctamente",
    "toast.post_created": "Publicación creada con éxito ⚡",
    "toast.comment_added": "Comentario publicado ✨",
    "toast.vote_registered": "Voto registrado",
    "toast.level_up": "🎉 ¡Subiste al Nivel "
  },
  en: {
    "nav.feed": "Home",
    "nav.apuntes": "Notes",
    "nav.metodos": "Methods",
    "nav.foro": "Forum",
    "nav.perfil": "Profile",
    "section.feed.title": "🔥 Trending now",
    "section.feed.sub": "Most popular in the community",
    "section.apuntes.title": "📚 Notes Bank",
    "section.apuntes.sub": "PDFs shared by students",
    "section.metodos.title": "🧠 Study Methods",
    "section.metodos.sub": "Proven techniques by thousands",
    "section.foro.title": "💬 Q&A Forum",
    "section.foro.sub": "Ask and solve doubts together",
    "profile.title": "My Profile",
    "profile.sub": "Studiit Student",
    "profile.name": "✏️ My Name",
    "profile.color": "🎨 Avatar Color",
    "profile.theme": "🌓 Appearance",
    "profile.lang": "🌍 Language",
    "profile.stats": "🏆 My Stats",
    "profile.achievements": "🥇 Unlocked Achievements",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "stat.posts": "Posts",
    "stat.votes": "Votes",
    "stat.level": "Level",
    "toast.lang": "Language changed to English",
    "toast.theme": "Theme updated",
    "toast.profile_saved": "Name saved successfully",
    "toast.post_created": "Post created successfully ⚡",
    "toast.comment_added": "Comment posted ✨",
    "toast.vote_registered": "Vote registered",
    "toast.level_up": "🎉 You reached Level "
  }
};

// --- MOCK DATA INICIAL ---
const DEFAULT_POSTS = [
  {
    id: "1",
    titulo: "Mi flujo de Active Recall + Spaced Repetition en Notion y Anki",
    contenido: "Llevo 6 meses usando esta plantilla combinada. Separo la fase de estudio activo de la memoria a largo plazo. Aquí desgloso mi rutina paso a paso para exámenes finales.",
    tag: "Active Recall",
    tipo: "metodo",
    autor: "Elena_Neuro",
    initials: "EN",
    color: "violet",
    time: "Hace 2h",
    votes: 412,
    comments: [
      { autor: "Carlos_Math", color: "cyan", content: "¡Increíble aporte! ¿Podrías compartir el enlace a la plantilla?", time: "Hace 1h" },
      { autor: "Sofia_Bio", color: "pink", content: "Lo probé para Biología Celular y me ahorró horas de memorización.", time: "Hace 30m" }
    ]
  },
  {
    id: "2",
    titulo: "¿Cómo demostrar que d/dx(e^x) = e^x usando la función inversa?",
    contenido: "Tengo examen de Cálculo mañana. No quiero usar la definición formal por límites, ¿alguien puede explicarlo con logaritmos naturales?",
    tag: "Calculo",
    tipo: "pregunta",
    autor: "Carlos_Math",
    initials: "CM",
    color: "cyan",
    time: "Hace 4h",
    votes: 185,
    solved: true,
    comments: [
      { autor: "David_Code", color: "amber", content: "Si y = ln(x) => x = e^y. Aplicas derivación implícita dy/dx = 1/x, luego sustituyes y obtienes la identidad directamente.", time: "Hace 3h" }
    ]
  },
  {
    id: "3",
    titulo: "Resumen de Física Termodinámica — Ciclos Carnot, Otto y Rankine (45 pág.)",
    contenido: "PDF completo con diagramas P-V y T-S resueltos en color. Incluye ejercicios de exámen universitario.",
    tag: "Fisica",
    tipo: "apunte",
    autor: "PhysicsKing",
    initials: "PK",
    color: "amber",
    time: "Hace 1 día",
    votes: 320,
    comments: []
  }
];

const DEFAULT_APUNTES = [
  { id: "a1", titulo: "Termodinámica y Fluidos — Guía Definitiva", materia: "Fisica", paginas: 45, dl: "1.4k", autor: "PhysicsKing", col: "amber", ini: "PK", rating: "4.9", tags: ["Física", "PDF Gratis"] },
  { id: "a2", titulo: "Álgebra Lineal: Matrices y Transformaciones", materia: "Matematicas", paginas: 30, dl: "890", autor: "Carlos_Math", col: "cyan", ini: "CM", rating: "4.8", tags: ["Mates", "Álgebra"] },
  { id: "a3", titulo: "Cheat Sheet Python 3.12: Estructuras de Datos", materia: "Programacion", paginas: 12, dl: "2.1k", autor: "David_Code", col: "violet", ini: "DC", rating: "5.0", tags: ["Python", "Código"] }
];

const STUDY_METHODS = [
  {
    id: "m1",
    nombre: "Pomodoro Technique",
    icon: "ri-timer-line",
    tiempo: "25 min estudio / 5 min descanso",
    desc: "Aumenta el enfoque dividiendo el trabajo en bloques de alta concentración.",
    pasos: ["Elige una tarea específica", "Trabaja 25 min sin distracciones", "Toma un descanso activo de 5 min", "Cada 4 ciclos toma un descanso largo"],
    tags: ["Enfoque", "Productividad"],
    action: "pomodoro"
  },
  {
    id: "m2",
    nombre: "Active Recall Flashcards",
    icon: "ri-flashcard-line",
    tiempo: "Interactivo",
    desc: "Recuperación activa de información para consolidar la memoria a largo plazo.",
    pasos: ["Lee la pregunta", "Intenta responder sin mirar", "Voltea la tarjeta", "Evalúa tu nivel de recuerdo"],
    tags: ["Memoria", "Repaso"],
    action: "flashcards"
  }
];

const DEFAULT_FORO = [
  { id: "q1", titulo: "¿Cuál es la diferencia intuitiva entre entalpía y energía interna?", resp: 12, vistas: "450", resuelto: true, autor: "ChemStudent", col: "cyan", ini: "CS", time: "Hace 5h", tags: ["Química", "Termodinámica"] },
  { id: "q2", titulo: "¿Cómo organizar mi tiempo en semana de exámenes con el Método Feynman?", resp: 8, vistas: "310", resuelto: false, autor: "Laura_M", col: "pink", ini: "LM", time: "Hace 8h", tags: ["Métodos", "Organización"] }
];

const MOCK_FLASHCARDS = [
  { materia: "Física", question: "¿Qué establece el primer principio de la termodinámica?", answer: "Establece la conservación de la energía: ΔU = Q - W (La variación de energía interna es igual al calor absorbed menos el trabajo realizado)." },
  { materia: "Cálculo", question: "¿Cuál es la derivada de e^(2x)?", answer: "Usando la regla de la cadena: 2 * e^(2x)." },
  { materia: "Química", question: "¿Cuál es el grupo funcional de los alcoholes?", answer: "El grupo hidroxilo (-OH)." }
];

const ALL_ACHIEVEMENTS = [
  { id: "first-vote", title: "Primer Voto 🗳️", desc: "Has emitido tu primera valoración.", condition: store => store.state.profile.voteCount > 0 },
  { id: "first-post", title: "Creador Studiit ✍️", desc: "Has publicado tu primer contenido.", condition: store => store.state.profile.postCount > 0 },
  { id: "pomodoro-master", title: "Mente de Acero ⏱️", desc: "Completaste tu primer ciclo Pomodoro.", condition: store => store.state.profile.pomodoroCount > 0 }
];

// --- GESTOR DE ESTADO (AppStore) ---
class AppStore {
  constructor() {
    this.storageKey = "studiit_state_v6";
    this.state = this.loadState();
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        if (!parsed.posts || !parsed.posts.length) parsed.posts = DEFAULT_POSTS;
        if (!parsed.apuntes || !parsed.apuntes.length) parsed.apuntes = DEFAULT_APUNTES;
        if (!parsed.foro || !parsed.foro.length) parsed.foro = DEFAULT_FORO;
        if (!parsed.votedPosts) parsed.votedPosts = {};
        if (!parsed.profile) parsed.profile = this.getDefaultProfile();
        return parsed;
      }
    } catch (e) {
      console.warn("Error leyendo localStorage, reiniciando estado local:", e);
    }
    return this.getDefaultState();
  }

  getDefaultProfile() {
    return {
      username: "Estudiante",
      color: "violet",
      postCount: 1,
      voteCount: 0,
      pomodoroCount: 0,
      level: 1,
      xp: 0,
      achievements: []
    };
  }

  getDefaultState() {
    return {
      profile: this.getDefaultProfile(),
      posts: DEFAULT_POSTS,
      apuntes: DEFAULT_APUNTES,
      foro: DEFAULT_FORO,
      votedPosts: {},
      lang: "es",
      theme: "dark"
    };
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Límite de memoria alcanzado en LocalStorage", e);
    }
  }

  addXp(amount) {
    const prevLevel = this.state.profile.level;
    this.state.profile.xp += amount;
    const newLevel = Math.floor(this.state.profile.xp / 100) + 1;
    if (newLevel > prevLevel) {
      this.state.profile.level = newLevel;
      showToast(`${TRANSLATIONS[this.state.lang]["toast.level_up"]}${newLevel}! 🎉`);
    }
    this.save();
    this.updateProfileUi();
  }

  checkAchievements() {
    ALL_ACHIEVEMENTS.forEach(ach => {
      if (!this.state.profile.achievements.includes(ach.id) && ach.condition(this)) {
        this.state.profile.achievements.push(ach.id);
        this.addXp(50);
        showToast(`🏆 Logro Desbloqueado: ${ach.title}`);
        this.save();
        this.updateProfileUi();
      }
    });
  }

  updateProfileUi() {
    const levelEl = document.getElementById("stat-level");
    const postsEl = document.getElementById("stat-posts");
    const votesEl = document.getElementById("stat-votes");
    const xpProgress = document.getElementById("profile-xp-progress");
    const xpCurrent = document.getElementById("profile-xp-current");
    const initialsEl = document.getElementById("profile-initials");
    const nameEl = document.getElementById("profile-name-display");

    if (levelEl) levelEl.textContent = `🌟 ${this.state.profile.level}`;
    if (postsEl) postsEl.textContent = this.state.profile.postCount;
    if (votesEl) votesEl.textContent = this.state.profile.voteCount;

    if (nameEl) nameEl.textContent = this.state.profile.username;
    if (initialsEl) initialsEl.textContent = this.state.profile.username.substring(0, 2).toUpperCase();

    const currentXp = this.state.profile.xp % 100;
    if (xpProgress) xpProgress.style.width = `${currentXp}%`;
    if (xpCurrent) xpCurrent.textContent = `${currentXp} XP`;

    const achievementsList = document.getElementById("achievements-list");
    if (achievementsList) {
      achievementsList.innerHTML = "";
      if (!this.state.profile.achievements.length) {
        achievementsList.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:10px;">¡Participa en la comunidad para desbloquear insignias!</div>`;
      } else {
        this.state.profile.achievements.forEach(id => {
          const ach = ALL_ACHIEVEMENTS.find(a => a.id === id);
          if (ach) {
            const card = document.createElement("div");
            card.style = "display:flex; align-items:center; gap:10px; padding:10px; border:var(--border-dim); background:var(--bg-subtle); margin-bottom:6px;";
            card.innerHTML = `<div>🌟</div><div><div style="font-size:0.82rem; font-weight:700;">${ach.title}</div><div style="font-size:0.72rem; color:var(--text-muted);">${ach.desc}</div></div>`;
            achievementsList.appendChild(card);
          }
        });
      }
    }
  }
}

const store = new AppStore();

// --- SISTEMA DE TOASTS ---
function showToast(msg) {
  const existing = document.querySelector(".s-toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.className = "s-toast";
  t.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("s-toast--in"));
  setTimeout(() => {
    t.classList.remove("s-toast--in");
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

// --- ROUTER SPA ---
const Router = (() => {
  const SECTIONS = ["feed", "apuntes", "metodos", "foro", "perfil"];
  let current = "feed";

  function show(id) {
    if (!SECTIONS.includes(id)) return;
    current = id;

    SECTIONS.forEach(k => {
      const el = document.getElementById(`section-${k}`);
      if (el) {
        el.classList.toggle("section--hidden", k !== id);
      }
    });

    document.querySelectorAll(".bottom-nav__item").forEach(item => {
      item.classList.toggle("bottom-nav__item--active", item.dataset.section === id);
    });

    const content = document.getElementById("app-content");
    if (content) content.scrollTop = 0;
  }

  document.addEventListener("click", e => {
    const item = e.target.closest("[data-section]");
    if (item) {
      e.preventDefault();
      show(item.dataset.section);
    }
  });

  return { show, getCurrent: () => current };
})();

// --- GESTIÓN DE TEMAS E IDIOMAS ---
const ThemeManager = {
  apply(theme) {
    store.state.theme = theme;
    store.save();
    document.body.classList.toggle("light-theme", theme === "light");
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("theme-btn--active", btn.dataset.theme === theme);
    });
  }
};

const I18n = {
  apply(lang) {
    if (!TRANSLATIONS[lang]) return;
    store.state.lang = lang;
    store.save();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("lang-btn--active", btn.dataset.lang === lang);
    });
  }
};

// --- RENDERIZADORES DE VISTA ---
const Renderers = {
  tagColor(tag) {
    const map = { "Matematicas": "cyan", "Fisica": "amber", "Quimica": "violet", "Calculo": "cyan", "Active Recall": "violet" };
    return map[tag] || "violet";
  },

  renderFeed() {
    const feedList = document.getElementById("feed-list");
    if (!feedList) return;
    feedList.innerHTML = "";

    store.state.posts.forEach(p => {
      const art = document.createElement("article");
      art.className = `post-card ${p.tipo === 'pregunta' ? 'post-card--question' : (p.tipo === 'apunte' ? 'post-card--notes' : '')}`;
      art.setAttribute("data-post-id", p.id);

      const voteState = store.state.votedPosts[p.id];
      const upClass = voteState === "up" ? "vote-btn--voted" : "";
      const commentsCount = p.comments ? p.comments.length : 0;

      art.innerHTML = `
        <div class="post-card__top">
          <span class="subject-tag subject-tag--${this.tagColor(p.tag)}">${p.tag}</span>
          <span class="post-card__author">
            <span class="author-avatar author-avatar--${p.color}">${p.initials}</span>
            ${p.autor}
          </span>
        </div>
        <h2 class="post-card__title"><a href="#" class="post-card__title-link">${p.titulo}</a></h2>
        <p class="post-card__excerpt">${p.contenido}</p>
        <div class="post-card__bottom">
          <div class="vote-group">
            <button class="vote-btn vote-btn--up ${upClass}" data-post="${p.id}"><i class="ri-arrow-up-s-fill"></i></button>
            <span class="vote-btn__count">${p.votes}</span>
          </div>
          <button class="comment-btn" data-post-id="${p.id}">
            <i class="ri-chat-3-line"></i> <span>${commentsCount}</span>
          </button>
          ${p.solved ? `<span class="solved-badge"><i class="ri-checkbox-circle-fill"></i> Resuelto</span>` : ""}
        </div>
      `;
      feedList.appendChild(art);
    });
  },

  renderApuntes() {
    const grid = document.getElementById("apuntes-grid");
    if (!grid) return;
    grid.innerHTML = "";

    store.state.apuntes.forEach(a => {
      const card = document.createElement("article");
      card.className = "apunte-card";
      card.innerHTML = `
        <div class="post-card__top">
          <span class="subject-tag subject-tag--${this.tagColor(a.materia)}">${a.materia}</span>
          <span style="font-size:0.7rem; color:var(--text-muted);">${a.paginas} pág.</span>
        </div>
        <h3 style="font-size:0.95rem; font-weight:700; margin:8px 0;">${a.titulo}</h3>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:12px;">Por ${a.autor}</div>
        <button class="btn btn--primary btn--sm view-apunte-btn" style="width:100%" data-id="${a.id}">
          <i class="ri-download-2-line"></i> Descargar PDF (${a.dl})
        </button>
      `;
      grid.appendChild(card);
    });
  },

  renderMetodos() {
    const grid = document.getElementById("metodos-grid");
    if (!grid) return;
    grid.innerHTML = "";

    STUDY_METHODS.forEach(m => {
      const card = document.createElement("article");
      card.className = "metodo-card";
      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
          <i class="${m.icon}" style="font-size:1.5rem; color:#c4b5fd;"></i>
          <h3 style="font-size:1rem; font-weight:800;">${m.nombre}</h3>
        </div>
        <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:12px;">${m.desc}</p>
        <button class="btn btn--primary btn--sm start-method-btn" data-action="${m.action}">
          <i class="ri-play-line"></i> Iniciar Herramienta
        </button>
      `;
      grid.appendChild(card);
    });
  },

  renderForo() {
    const list = document.getElementById("foro-list");
    if (!list) return;
    list.innerHTML = "";

    store.state.foro.forEach(q => {
      const art = document.createElement("article");
      art.className = "foro-card";
      art.innerHTML = `
        <div style="flex:1;">
          <h3 style="font-size:0.9rem; font-weight:700;">${q.titulo}</h3>
          <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">${q.autor} · ${q.time}</div>
        </div>
        <div>
          ${q.resuelto ? '<span class="solved-badge">Resuelta</span>' : '<span class="filter-pill">Abierta</span>'}
        </div>
      `;
      list.appendChild(art);
    });
  }
};

// --- MODAL DE NUEVA PUBLICACIÓN ---
const ModalManager = (() => {
  const modal = document.getElementById("modal-new-post");
  const overlay = document.getElementById("modal-overlay");
  const form = document.getElementById("form-new-post");

  function open() {
    if (modal && overlay) {
      modal.classList.add("modal--open");
      overlay.classList.add("modal-overlay--open");
    }
  }

  function close() {
    if (modal && overlay) {
      modal.classList.remove("modal--open");
      overlay.classList.remove("modal-overlay--open");
      if (form) form.reset();
    }
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const titulo = document.getElementById("post-titulo").value.trim();
      const contenido = document.getElementById("post-contenido").value.trim();
      const tag = document.getElementById("post-tag").value;
      const tipo = document.getElementById("post-tipo").value;

      if (!titulo || !contenido) return;

      const initials = store.state.profile.username.substring(0, 2).toUpperCase();
      const newPost = {
        id: `${Date.now()}`,
        titulo, contenido, tag, tipo,
        autor: store.state.profile.username,
        initials, color: store.state.profile.color,
        time: "Justo ahora", votes: 1, comments: []
      };

      store.state.posts.unshift(newPost);
      store.state.profile.postCount += 1;
      store.addXp(50);
      store.checkAchievements();
      store.save();

      close();
      Renderers.renderFeed();
      showToast(TRANSLATIONS[store.state.lang]["toast.post_created"]);
    });
  }

  document.addEventListener("click", e => {
    if (e.target.closest("#btn-new-post")) open();
    if (e.target.closest("#modal-close") || e.target.closest("#modal-cancel") || e.target === overlay) close();
  });
})();

// --- VOTOS E INTERACCIÓN ---
document.addEventListener("click", e => {
  const voteBtn = e.target.closest(".vote-btn--up");
  if (voteBtn) {
    const id = voteBtn.dataset.post;
    const post = store.state.posts.find(p => p.id === id);
    if (post) {
      post.votes += 1;
      store.state.profile.voteCount += 1;
      store.state.votedPosts[id] = "up";
      store.addXp(10);
      store.checkAchievements();
      store.save();
      Renderers.renderFeed();
      showToast(TRANSLATIONS[store.state.lang]["toast.vote_registered"]);
    }
  }

  const themeBtn = e.target.closest(".theme-btn");
  if (themeBtn) ThemeManager.apply(themeBtn.dataset.theme);

  const langBtn = e.target.closest(".lang-btn");
  if (langBtn) I18n.apply(langBtn.dataset.lang);
});

// --- HERRAMIENTAS MÉTODOS (POMODORO & FLASHCARDS) ---
const StudyTools = (() => {
  let pomodoroInterval = null;
  let pomodoroTime = 25 * 60;

  function startPomodoro() {
    const display = document.getElementById("pomodoro-time");
    if (pomodoroInterval) clearInterval(pomodoroInterval);
    pomodoroInterval = setInterval(() => {
      pomodoroTime--;
      const m = Math.floor(pomodoroTime / 60).toString().padStart(2, "0");
      const s = (pomodoroTime % 60).toString().padStart(2, "0");
      if (display) display.textContent = `${m}:${s}`;

      if (pomodoroTime <= 0) {
        clearInterval(pomodoroInterval);
        store.state.profile.pomodoroCount++;
        store.addXp(100);
        store.checkAchievements();
        showToast("¡Ciclo Pomodoro completado! +100 XP 🎯");
      }
    }, 1000);
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest(".start-method-btn");
    if (!btn) return;
    const act = btn.dataset.action;
    if (act === "pomodoro") {
      document.getElementById("modal-pomodoro").classList.add("modal--open");
      document.getElementById("modal-pomodoro-overlay").classList.add("modal-overlay--open");
    } else if (act === "flashcards") {
      document.getElementById("modal-flashcards").classList.add("modal--open");
      document.getElementById("modal-flashcards-overlay").classList.add("modal-overlay--open");
    }
  });

  const pStart = document.getElementById("pomodoro-btn-start");
  if (pStart) pStart.addEventListener("click", startPomodoro);

  const pClose = document.getElementById("modal-pomodoro-close");
  if (pClose) {
    pClose.addEventListener("click", () => {
      document.getElementById("modal-pomodoro").classList.remove("modal--open");
      document.getElementById("modal-pomodoro-overlay").classList.remove("modal-overlay--open");
      if (pomodoroInterval) clearInterval(pomodoroInterval);
    });
  }
})();

// --- INICIALIZACIÓN ---
function init() {
  ThemeManager.apply(store.state.theme);
  I18n.apply(store.state.lang);
  Renderers.renderFeed();
  Renderers.renderApuntes();
  Renderers.renderMetodos();
  Renderers.renderForo();
  store.updateProfileUi();
  console.log("Studiit v6.0 listo y cargado correctamente.");
}

document.addEventListener("DOMContentLoaded", init);