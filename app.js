/* ================================================================
   STUDIIT v7.0 — CUSTOM JAVASCRIPT
   Original features: Rating system, Smart Search, Activity History, Favorites
   ================================================================ */
"use strict";

const TRANSLATIONS = {
  es: {
    "nav.feed": "Inicio",
    "nav.apuntes": "Apuntes",
    "nav.metodos": "Métodos",
    "nav.foro": "Foro",
    "nav.perfil": "Perfil",
    "section.feed.title": "🔥 Tendencias",
    "section.feed.sub": "Lo más popular ahora",
    "section.apuntes.title": "📚 Banco de Apuntes",
    "section.apuntes.sub": "Recursos compartidos",
    "section.metodos.title": "🧠 Técnicas de Estudio",
    "section.metodos.sub": "Métodos probados",
    "section.foro.title": "💬 Foro Q&A",
    "section.foro.sub": "Resuelve tus dudas",
    "profile.title": "Mi Perfil",
    "profile.sub": "Tu espacio personal",
    "profile.name": "✏️ Nombre",
    "profile.color": "🎨 Color Avatar",
    "profile.theme": "🌓 Tema",
    "profile.lang": "🌍 Idioma",
    "profile.stats": "🏆 Estadísticas",
    "profile.achievements": "🥇 Logros",
    "profile.history": "📜 Historial",
    "profile.favorites": "❤️ Favoritos",
    "theme.dark": "Oscuro",
    "theme.light": "Claro",
    "stat.posts": "Publicaciones",
    "stat.votes": "Votos",
    "stat.level": "Nivel",
    "toast.post_created": "Publicación creada ⚡",
    "toast.vote_registered": "Voto registrado",
    "toast.favorite_added": "Agregado a favoritos ❤️",
    "toast.favorite_removed": "Eliminado de favoritos",
    "toast.level_up": "🎉 ¡Subiste a Nivel "
  },
  en: {
    "nav.feed": "Home",
    "nav.apuntes": "Notes",
    "nav.metodos": "Methods",
    "nav.foro": "Forum",
    "nav.perfil": "Profile",
    "section.feed.title": "🔥 Trending",
    "section.feed.sub": "Most popular now",
    "section.apuntes.title": "📚 Notes Bank",
    "section.apuntes.sub": "Shared resources",
    "section.metodos.title": "🧠 Study Techniques",
    "section.metodos.sub": "Proven methods",
    "section.foro.title": "💬 Q&A Forum",
    "section.foro.sub": "Solve your doubts",
    "profile.title": "My Profile",
    "profile.sub": "Your personal space",
    "profile.name": "✏️ Name",
    "profile.color": "🎨 Avatar Color",
    "profile.theme": "🌓 Theme",
    "profile.lang": "🌍 Language",
    "profile.stats": "🏆 Statistics",
    "profile.achievements": "🥇 Achievements",
    "profile.history": "📜 History",
    "profile.favorites": "❤️ Favorites",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "stat.posts": "Posts",
    "stat.votes": "Votes",
    "stat.level": "Level",
    "toast.post_created": "Post created ⚡",
    "toast.vote_registered": "Vote registered",
    "toast.favorite_added": "Added to favorites ❤️",
    "toast.favorite_removed": "Removed from favorites",
    "toast.level_up": "🎉 You reached Level "
  }
};

/* ============================================
   DATOS INICIALES
   ============================================ */
const DEFAULT_POSTS = [
  {
    id: "1",
    titulo: "Técnica Pomodoro + Notas Digitales",
    contenido: "Mi rutina: 25 min de enfoque, 5 min descanso. Uso Notion para organizar y Anki para repaso. Subo 1 nivel cada semana.",
    tag: "Active Recall",
    tipo: "metodo",
    autor: "Elena_Study",
    initials: "ES",
    color: "violet",
    time: "Hace 2h",
    votes: 412,
    rating: 4.8,
    ratings: [5, 5, 4, 5, 4],
    comments: []
  },
  {
    id: "2",
    titulo: "¿Cuál es la mejor forma de estudiar Cálculo?",
    contenido: "Tengo examen mañana y no entiendo los límites. ¿Alguien puede explicar de forma simple?",
    tag: "Calculo",
    tipo: "pregunta",
    autor: "Carlos_Math",
    initials: "CM",
    color: "cyan",
    time: "Hace 4h",
    votes: 185,
    solved: true,
    comments: []
  },
  {
    id: "3",
    titulo: "Apuntes Física: Termodinámica Completa",
    contenido: "45 páginas con diagramas a color. Ciclos Carnot, Otto, ejercicios resueltos. PDF descargable.",
    tag: "Fisica",
    tipo: "apunte",
    autor: "PhysicsKing",
    initials: "PK",
    color: "amber",
    time: "Hace 1 día",
    votes: 320,
    rating: 4.9,
    ratings: [5, 5, 5, 4, 5],
    comments: []
  }
];

const STUDY_METHODS = [
  {
    id: "m1",
    nombre: "Pomodoro Avanzado",
    icon: "ri-timer-line",
    desc: "Sesiones de 25 min con seguimiento automático",
    action: "pomodoro"
  },
  {
    id: "m2",
    nombre: "Tarjetas Interactivas",
    icon: "ri-flashcard-line",
    desc: "Memorización activa con evaluación",
    action: "flashcards"
  }
];

/* ============================================
   STORE: GESTOR DE ESTADO CENTRAL
   ============================================ */
class AppStore {
  constructor() {
    this.storageKey = "studiit_v7_state";
    this.state = this.loadState();
    this.setupAutoSave();
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          profile: parsed.profile || this.defaultProfile(),
          posts: parsed.posts || DEFAULT_POSTS,
          votedPosts: parsed.votedPosts || {},
          favoriteIds: parsed.favoriteIds || [],
          activityHistory: parsed.activityHistory || [],
          postRatings: parsed.postRatings || {},
          lang: parsed.lang || "es",
          theme: parsed.theme || "dark"
        };
      }
    } catch (e) {
      console.warn("Estado corrupto, reiniciando:", e);
    }
    return this.getDefaultState();
  }

  defaultProfile() {
    return {
      username: "Estudiante",
      color: "violet",
      postCount: 0,
      voteCount: 0,
      pomodoroCount: 0,
      level: 1,
      xp: 0,
      achievements: []
    };
  }

  getDefaultState() {
    return {
      profile: this.defaultProfile(),
      posts: DEFAULT_POSTS,
      votedPosts: {},
      favoriteIds: [],
      activityHistory: [],
      postRatings: {},
      lang: "es",
      theme: "dark"
    };
  }

  setupAutoSave() {
    window.addEventListener("beforeunload", () => this.save());
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Error guardando estado:", e);
    }
  }

  addActivityRecord(postId, postTitle) {
    const record = {
      id: postId,
      title: postTitle,
      timestamp: Date.now()
    };
    this.state.activityHistory.unshift(record);
    if (this.state.activityHistory.length > 20) {
      this.state.activityHistory.pop();
    }
    this.save();
  }

  toggleFavorite(postId) {
    const idx = this.state.favoriteIds.indexOf(postId);
    if (idx === -1) {
      this.state.favoriteIds.push(postId);
      return true;
    } else {
      this.state.favoriteIds.splice(idx, 1);
      return false;
    }
  }

  isFavorite(postId) {
    return this.state.favoriteIds.includes(postId);
  }

  ratePost(postId, rating) {
    if (!this.state.postRatings[postId]) {
      this.state.postRatings[postId] = [];
    }
    this.state.postRatings[postId].push(rating);
    this.save();

    const post = this.state.posts.find(p => p.id === postId);
    if (post) {
      const avg = this.state.postRatings[postId].reduce((a, b) => a + b, 0) / this.state.postRatings[postId].length;
      post.rating = parseFloat(avg.toFixed(1));
    }
  }

  addXp(amount) {
    const prevLevel = this.state.profile.level;
    this.state.profile.xp += amount;
    const newLevel = Math.floor(this.state.profile.xp / 100) + 1;
    if (newLevel > prevLevel) {
      this.state.profile.level = newLevel;
      showAchievementNotification(`¡Subiste al Nivel ${newLevel}!`);
    }
    this.save();
    updateProfileUI();
  }

  updateUsername(name) {
    this.state.profile.username = name.substring(0, 20) || "Estudiante";
    this.save();
    updateProfileUI();
  }
}

const store = new AppStore();

/* ============================================
   UTILIDADES
   ============================================ */
function t(key) {
  const lang = store.state.lang;
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.es[key] || key;
}

function showToast(msg, type = "success") {
  const existing = document.querySelector(".s-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "s-toast";
  toast.style.borderColor = type === "success" ? "var(--accent-purple)" : "var(--accent-pink)";
  toast.innerHTML = `<i class="ri-${type === "success" ? "checkbox-circle" : "alert-line"}-fill"></i> ${msg}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("s-toast--in"));
  setTimeout(() => {
    toast.classList.remove("s-toast--in");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showAchievementNotification(title) {
  const notif = document.createElement("div");
  notif.style.cssText = `
    position: fixed;
    top: 100px;
    right: 12px;
    background: var(--grad-primary);
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    z-index: 2001;
    animation: slideIn 0.3s ease;
    font-weight: 700;
  `;
  notif.textContent = title;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

/* ============================================
   SISTEMA DE BÚSQUEDA INTELIGENTE
   ============================================ */
class SmartSearch {
  search(query, posts) {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(p => 
      p.titulo.toLowerCase().includes(q) ||
      p.contenido.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.autor.toLowerCase().includes(q)
    );
  }

  setupSearchInput() {
    const searchInput = document.getElementById("nav-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      const results = this.search(query, store.state.posts);
      renderSearchResults(results, query);
    });
  }
}

function renderSearchResults(posts, query) {
  const feedList = document.getElementById("feed-list");
  if (!feedList) return;

  if (!query) {
    renderFeed();
    return;
  }

  feedList.innerHTML = posts.length ? "" : `
    <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
      <p style="font-size: 1.1rem; margin-bottom: 8px;">No hay resultados</p>
      <p style="font-size: 0.85rem;">Intenta con otras palabras</p>
    </div>
  `;

  posts.forEach(p => {
    const card = createPostCard(p);
    feedList.appendChild(card);
  });
}

const smartSearch = new SmartSearch();

/* ============================================
   RENDERIZADORES
   ============================================ */
function createPostCard(p) {
  const card = document.createElement("article");
  card.className = `post-card ${p.tipo === 'pregunta' ? 'post-card--question' : ''}`;
  card.setAttribute("data-post-id", p.id);

  const isFav = store.isFavorite(p.id);
  const rating = p.rating ? `⭐ ${p.rating}` : "Sin calificar";

  card.innerHTML = `
    <div class="post-card__top">
      <span class="subject-tag subject-tag--${getTagColor(p.tag)}">${p.tag}</span>
      <span class="post-card__author">
        <span class="author-avatar author-avatar--${p.color}">${p.initials}</span>
        ${p.autor}
      </span>
    </div>
    <h2 class="post-card__title">${p.titulo}</h2>
    <p class="post-card__excerpt">${p.contenido.substring(0, 100)}...</p>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; font-size:0.8rem; color:var(--text-muted);">
      <span>${rating}</span>
      <span>${p.time}</span>
    </div>
    <div class="post-card__bottom">
      <div class="vote-group">
        <button class="vote-btn vote-btn--up" data-post="${p.id}">
          <i class="ri-arrow-up-s-fill"></i>
        </button>
        <span class="vote-btn__count">${p.votes}</span>
      </div>
      <button class="comment-btn" data-post-id="${p.id}">
        <i class="ri-chat-3-line"></i> ${p.comments?.length || 0}
      </button>
      <button class="fav-btn" data-post-id="${p.id}" style="
        background: rgba(26, 32, 45, 0.5);
        border: 1px solid var(--border-color);
        padding: 6px 10px;
        border-radius: 12px;
        color: ${isFav ? 'var(--accent-pink)' : 'var(--text-muted)'};
        transition: all 0.2s ease;
        cursor: pointer;
        font-size: 16px;
      ">
        <i class="ri-heart-${isFav ? 'fill' : 'line'}"></i>
      </button>
    </div>
  `;

  return card;
}

function renderFeed() {
  const feedList = document.getElementById("feed-list");
  if (!feedList) return;
  feedList.innerHTML = "";
  store.state.posts.forEach(p => {
    feedList.appendChild(createPostCard(p));
  });
}

function renderApuntes() {
  const grid = document.getElementById("apuntes-grid");
  if (!grid) return;
  grid.innerHTML = "";
  
  store.state.posts.filter(p => p.tipo === "apunte").forEach(p => {
    const card = document.createElement("article");
    card.className = "apunte-card";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
        <span class="subject-tag subject-tag--${getTagColor(p.tag)}">${p.tag}</span>
        <span style="font-size:0.8rem; color:var(--text-muted);">⭐ ${p.rating || "N/A"}</span>
      </div>
      <h3 style="font-size:1rem; font-weight:700; margin-bottom:8px;">${p.titulo}</h3>
      <button class="btn btn--primary btn--sm" style="width:100%; margin-top:10px;">
        <i class="ri-download-2-line"></i> Descargar
      </button>
    `;
    grid.appendChild(card);
  });
}

function renderMetodos() {
  const grid = document.getElementById("metodos-grid");
  if (!grid) return;
  grid.innerHTML = "";

  STUDY_METHODS.forEach(m => {
    const card = document.createElement("article");
    card.className = "metodo-card";
    card.innerHTML = `
      <div style="display:flex; gap:12px; margin-bottom:12px;">
        <i class="${m.icon}" style="font-size:1.8rem; background:var(--grad-primary); -webkit-background-clip:text; -webkit-text-fill-color:transparent;"></i>
        <div style="flex:1;">
          <h3 style="font-size:1rem; font-weight:700; margin-bottom:4px;">${m.nombre}</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary);">${m.desc}</p>
        </div>
      </div>
      <button class="btn btn--primary btn--sm start-method-btn" data-action="${m.action}" style="width:100%;">
        <i class="ri-play-line"></i> Iniciar
      </button>
    `;
    grid.appendChild(card);
  });
}

function renderForum() {
  const list = document.getElementById("foro-list");
  if (!list) return;
  list.innerHTML = "";

  store.state.posts.filter(p => p.tipo === "pregunta").forEach(p => {
    const card = document.createElement("article");
    card.className = "foro-card";
    card.innerHTML = `
      <div style="flex:1;">
        <h3 style="font-size:0.95rem; font-weight:700;">${p.titulo}</h3>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${p.autor} · ${p.time}</div>
      </div>
      <div>
        ${p.solved ? '<span class="solved-badge">✓ Resuelto</span>' : '<span style="color:var(--accent-cyan); font-size:0.8rem;">Abierto</span>'}
      </div>
    `;
    list.appendChild(card);
  });
}

function renderActivityHistory() {
  const container = document.getElementById("activity-history-list");
  if (!container || !store.state.activityHistory.length) {
    if (container) {
      container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">Sin historial aún</p>';
    }
    return;
  }

  container.innerHTML = "";
  store.state.activityHistory.forEach(record => {
    const item = document.createElement("div");
    item.style.cssText = `
      padding: 12px;
      background: rgba(26, 32, 45, 0.5);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s;
    `;
    const time = new Date(record.timestamp);
    const timeStr = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    item.innerHTML = `
      <div style="font-weight: 600; font-size: 0.9rem;">${record.title}</div>
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${timeStr}</div>
    `;
    container.appendChild(item);
  });
}

function renderFavorites() {
  const container = document.getElementById("favorites-list");
  if (!container) return;

  const favorites = store.state.posts.filter(p => store.isFavorite(p.id));
  
  if (!favorites.length) {
    container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">No hay favoritos</p>';
    return;
  }

  container.innerHTML = "";
  favorites.forEach(p => {
    container.appendChild(createPostCard(p));
  });
}

function getTagColor(tag) {
  const colors = {
    "Matematicas": "cyan",
    "Fisica": "amber",
    "Quimica": "violet",
    "Calculo": "cyan",
    "Active Recall": "violet",
    "Programacion": "green"
  };
  return colors[tag] || "violet";
}

/* ============================================
   INTERACCIONES
   ============================================ */
document.addEventListener("click", (e) => {
  // Votos
  const voteBtn = e.target.closest(".vote-btn--up");
  if (voteBtn) {
    const postId = voteBtn.dataset.post;
    const post = store.state.posts.find(p => p.id === postId);
    if (post) {
      post.votes += 1;
      store.state.profile.voteCount += 1;
      store.addXp(10);
      store.save();
      renderFeed();
      showToast(t("toast.vote_registered"));
    }
  }

  // Favoritos
  const favBtn = e.target.closest(".fav-btn");
  if (favBtn) {
    const postId = favBtn.dataset.postId;
    const added = store.toggleFavorite(postId);
    store.save();
    renderFeed();
    showToast(added ? t("toast.favorite_added") : t("toast.favorite_removed"));
  }

  // Métodos
  const methodBtn = e.target.closest(".start-method-btn");
  if (methodBtn) {
    const action = methodBtn.dataset.action;
    if (action === "pomodoro") {
      const modal = document.getElementById("modal-pomodoro");
      const overlay = document.getElementById("modal-pomodoro-overlay");
      if (modal && overlay) {
        modal.classList.add("modal--open");
        overlay.classList.add("modal-overlay--open");
      }
    }
  }
});

/* ============================================
   GESTIÓN DE PERFIL
   ============================================ */
function updateProfileUI() {
  const profile = store.state.profile;
  
  const nameEl = document.getElementById("profile-name-display");
  if (nameEl) nameEl.textContent = profile.username;
  
  const initialsEl = document.getElementById("profile-initials");
  if (initialsEl) initialsEl.textContent = profile.username.substring(0, 2).toUpperCase();
  
  const levelEl = document.getElementById("stat-level");
  if (levelEl) levelEl.textContent = `🌟 ${profile.level}`;
  
  const postsEl = document.getElementById("stat-posts");
  if (postsEl) postsEl.textContent = profile.postCount;
  
  const votesEl = document.getElementById("stat-votes");
  if (votesEl) votesEl.textContent = profile.voteCount;

  const xpProgress = document.getElementById("profile-xp-progress");
  if (xpProgress) {
    const currentXp = profile.xp % 100;
    xpProgress.style.width = `${currentXp}%`;
  }

  const xpCurrent = document.getElementById("profile-xp-current");
  if (xpCurrent) xpCurrent.textContent = `${profile.xp % 100} XP`;
}

document.addEventListener("click", (e) => {
  const saveBtn = e.target.closest("#btn-save-username");
  if (saveBtn) {
    const input = document.getElementById("profile-username-input");
    if (input && input.value.trim()) {
      store.updateUsername(input.value.trim());
      showToast("Nombre guardado ✓");
    }
  }

  const themeBtn = e.target.closest(".theme-btn");
  if (themeBtn) {
    const theme = themeBtn.dataset.theme;
    store.state.theme = theme;
    document.body.classList.toggle("light-theme", theme === "light");
    store.save();
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("theme-btn--active", btn.dataset.theme === theme);
    });
  }

  const langBtn = e.target.closest(".lang-btn");
  if (langBtn) {
    const lang = langBtn.dataset.lang;
    store.state.lang = lang;
    store.save();
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("lang-btn--active", btn.dataset.lang === lang);
    });
  }
});

/* ============================================
   ROUTER SPA
   ============================================ */
const Router = (() => {
  const sections = ["feed", "apuntes", "metodos", "foro", "perfil"];
  let current = "feed";

  function show(id) {
    if (!sections.includes(id)) return;
    current = id;

    sections.forEach(k => {
      const el = document.getElementById(`section-${k}`);
      if (el) el.classList.toggle("section--hidden", k !== id);
    });

    document.querySelectorAll(".bottom-nav__item").forEach(item => {
      item.classList.toggle("bottom-nav__item--active", item.dataset.section === id);
    });

    const content = document.getElementById("app-content");
    if (content) content.scrollTop = 0;
  }

  document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-section]");
    if (item) {
      e.preventDefault();
      show(item.dataset.section);
    }
  });

  return { show, getCurrent: () => current };
})();

/* ============================================
   POMODORO TIMER
   ============================================ */
const PomodoroTimer = (() => {
  let interval = null;
  let timeLeft = 25 * 60;

  function reset() {
    timeLeft = 25 * 60;
    updateDisplay();
  }

  function updateDisplay() {
    const display = document.getElementById("pomodoro-time");
    if (display) {
      const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
      const s = (timeLeft % 60).toString().padStart(2, "0");
      display.textContent = `${m}:${s}`;
    }
  }

  function start() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(interval);
        store.state.profile.pomodoroCount++;
        store.addXp(100);
        store.save();
        showToast("¡Ciclo completado! +100 XP 🎯");
        reset();
      }
    }, 1000);
  }

  const startBtn = document.getElementById("pomodoro-btn-start");
  if (startBtn) startBtn.addEventListener("click", start);

  const resetBtn = document.getElementById("pomodoro-btn-reset");
  if (resetBtn) resetBtn.addEventListener("click", reset);

  const closeBtn = document.getElementById("modal-pomodoro-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (interval) clearInterval(interval);
      document.getElementById("modal-pomodoro").classList.remove("modal--open");
      document.getElementById("modal-pomodoro-overlay").classList.remove("modal-overlay--open");
    });
  }

  return { start, reset, updateDisplay };
})();

/* ============================================
   MODAL DE NUEVA PUBLICACIÓN
   ============================================ */
const ModalNewPost = (() => {
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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const titulo = document.getElementById("post-titulo")?.value.trim();
      const contenido = document.getElementById("post-contenido")?.value.trim();
      const tag = document.getElementById("post-tag")?.value;

      if (!titulo || !contenido) return;

      const initials = store.state.profile.username.substring(0, 2).toUpperCase();
      const newPost = {
        id: Date.now().toString(),
        titulo,
        contenido,
        tag,
        tipo: "metodo",
        autor: store.state.profile.username,
        initials,
        color: store.state.profile.color,
        time: "Justo ahora",
        votes: 1,
        rating: 0,
        comments: []
      };

      store.state.posts.unshift(newPost);
      store.state.profile.postCount += 1;
      store.addXp(50);
      store.save();
      close();
      renderFeed();
      showToast(t("toast.post_created"));
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-new-post")) open();
    if (e.target.closest("#modal-close") || e.target.closest("#modal-cancel") || e.target === overlay) close();
  });
})();

/* ============================================
   INICIALIZACIÓN
   ============================================ */
function init() {
  document.body.classList.toggle("light-theme", store.state.theme === "light");
  updateProfileUI();
  renderFeed();
  renderApuntes();
  renderMetodos();
  renderForum();
  smartSearch.setupSearchInput();
  
  console.log("✅ Studiit v7.0 - Custom features loaded");
}

document.addEventListener("DOMContentLoaded", init);
