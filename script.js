// ====================
// Данные и настройки
// ====================

let points = parseInt(localStorage.getItem('points')) || 0;
let progressData = JSON.parse(localStorage.getItem('progress')) || {
  alphabet: {},
  greetings: {},
  numbers: {},
  colors: {},
  family: {}
};
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

// Конфигурация достижений
const achievementList = [
  { 
    id: 1, 
    name: "Новичок", 
    description: "Заработайте 50 баллов",
    condition: (p) => p >= 50,
    icon: "🥇"
  },
  {
    id: 2,
    name: "Знаток алфавита",
    description: "Изучите все буквы",
    condition: (data) => Object.keys(data.alphabet).length === 33,
    icon: "🔤"
  }
];

// ====================
// Мультиязычность
// ====================

const translations = {
  ru: {
    headerTitle: "Learn Russian for Foreigners",
    headerSubtitle: "Специально для тех, кто хочет быстро и легко освоить русский язык!",
    tabLessons: "Уроки",
    tabExercises: "Упражнения",
    tabProgress: "Прогресс",
    lessonAlphabet: "Алфавит",
    lessonGreetings: "Приветствия",
    lessonNumbers: "Цифры",
    lessonColors: "Цвета",
    lessonFamily: "Семья",
    exercise1Title: "Упражнение 1: Что за буква?",
    exercise2Title: "Упражнение 2: Что за буква?",
    exercise3Title: "Упражнение 3: Приветствия",
    exercise4Title: "Упражнение 4: Вопрос",
    playBtn: "Проиграть",
    checkBtn: "Проверить",
    enterLetter: "Введите букву",
    enterPhrase: "Введите фразу",
    enterAnswer: "Введите ответ",
    progressHeader: "Ваш прогресс:",
    achievement1Name: "Новичок",
    achievement1Desc: "Заработайте 50 баллов",
    achievement2Name: "Знаток алфавита",
    achievement2Desc: "Изучите все буквы",
    pointsText: "баллов",
    loginBtn: "Войти",
    registerBtn: "Регистрация",
    logoutBtn: "Выйти",
    loginTitle: "Войти",
    registerTitle: "Регистрация",
    loginSubmit: "Войти",
    registerSubmit: "Зарегистрироваться",
    usernamePlaceholder: "Логин",
    passwordPlaceholder: "Пароль",
    selectLanguage: "Выберите язык:",
    introInfo: "Наш сайт создан для иностранцев, стремящихся изучить русский язык. Здесь вы найдете увлекательные уроки, упражнения и аудиоматериалы, которые помогут вам быстро освоить язык."
  },
  en: {
    headerTitle: "Learn Russian for Foreigners",
    headerSubtitle: "Designed especially for those who want to master Russian quickly and easily!",
    tabLessons: "Lessons",
    tabExercises: "Exercises",
    tabProgress: "Progress",
    lessonAlphabet: "Alphabet",
    lessonGreetings: "Greetings",
    lessonNumbers: "Numbers",
    lessonColors: "Colors",
    lessonFamily: "Family",
    exercise1Title: "Exercise 1: What letter is it?",
    exercise2Title: "Exercise 2: What letter is it?",
    exercise3Title: "Exercise 3: Greetings",
    exercise4Title: "Exercise 4: Question",
    playBtn: "Play",
    checkBtn: "Check",
    enterLetter: "Enter letter",
    enterPhrase: "Enter phrase",
    enterAnswer: "Enter answer",
    progressHeader: "Your Progress:",
    achievement1Name: "Beginner",
    achievement1Desc: "Earn 50 points",
    achievement2Name: "Alphabet Expert",
    achievement2Desc: "Learn all letters",
    pointsText: "points",
    loginBtn: "Login",
    registerBtn: "Register",
    logoutBtn: "Logout",
    loginTitle: "Login",
    registerTitle: "Register",
    loginSubmit: "Login",
    registerSubmit: "Register",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    selectLanguage: "Select Language:",
    introInfo: "Our site is designed for foreigners who want to learn Russian. Here you'll find engaging lessons, exercises, and audio materials to help you master the language quickly."
  },
  es: {
    headerTitle: "Aprende Ruso para Extranjeros",
    headerSubtitle: "¡Diseñado especialmente para quienes quieren dominar el ruso de manera rápida y sencilla!",
    tabLessons: "Lecciones",
    tabExercises: "Ejercicios",
    tabProgress: "Progreso",
    lessonAlphabet: "Alfabeto",
    lessonGreetings: "Saludos",
    lessonNumbers: "Números",
    lessonColors: "Colores",
    lessonFamily: "Familia",
    exercise1Title: "Ejercicio 1: ¿Qué letra es?",
    exercise2Title: "Ejercicio 2: ¿Qué letra es?",
    exercise3Title: "Ejercicio 3: Saludos",
    exercise4Title: "Ejercicio 4: Pregunta",
    playBtn: "Reproducir",
    checkBtn: "Verificar",
    enterLetter: "Ingrese la letra",
    enterPhrase: "Ingrese la frase",
    enterAnswer: "Ingrese la respuesta",
    progressHeader: "Tu Progreso:",
    achievement1Name: "Principiante",
    achievement1Desc: "Gana 50 puntos",
    achievement2Name: "Experto en Alfabeto",
    achievement2Desc: "Aprende todas las letras",
    pointsText: "puntos",
    loginBtn: "Iniciar sesión",
    registerBtn: "Registrarse",
    logoutBtn: "Cerrar sesión",
    loginTitle: "Iniciar sesión",
    registerTitle: "Registrarse",
    loginSubmit: "Entrar",
    registerSubmit: "Registrar",
    usernamePlaceholder: "Usuario",
    passwordPlaceholder: "Contraseña",
    selectLanguage: "Seleccione el idioma:",
    introInfo: "Nuestro sitio está diseñado para extranjeros que desean aprender ruso. Aquí encontrarás lecciones, ejercicios y material de audio que te ayudarán a dominar el idioma rápidamente."
  },
  fr: {
    headerTitle: "Apprenez le Russe pour Étrangers",
    headerSubtitle: "Conçu spécialement pour ceux qui veulent maîtriser le russe rapidement et facilement !",
    tabLessons: "Leçons",
    tabExercises: "Exercices",
    tabProgress: "Progression",
    lessonAlphabet: "Alphabet",
    lessonGreetings: "Salutations",
    lessonNumbers: "Chiffres",
    lessonColors: "Couleurs",
    lessonFamily: "Famille",
    exercise1Title: "Exercice 1 : Quelle lettre est-ce ?",
    exercise2Title: "Exercice 2 : Quelle lettre est-ce ?",
    exercise3Title: "Exercice 3 : Salutations",
    exercise4Title: "Exercice 4 : Question",
    playBtn: "Jouer",
    checkBtn: "Vérifier",
    enterLetter: "Entrez la lettre",
    enterPhrase: "Entrez la phrase",
    enterAnswer: "Entrez la réponse",
    progressHeader: "Votre Progression :",
    achievement1Name: "Débutant",
    achievement1Desc: "Gagnez 50 points",
    achievement2Name: "Expert de l'Alphabet",
    achievement2Desc: "Apprenez toutes les lettres",
    pointsText: "points",
    loginBtn: "Se connecter",
    registerBtn: "S'inscrire",
    logoutBtn: "Se déconnecter",
    loginTitle: "Connexion",
    registerTitle: "Inscription",
    loginSubmit: "Connexion",
    registerSubmit: "Inscription",
    usernamePlaceholder: "Nom d'utilisateur",
    passwordPlaceholder: "Mot de passe",
    selectLanguage: "Sélectionnez la langue:",
    introInfo: "Notre site est conçu pour les étrangers désireux d'apprendre le russe. Vous y trouverez des leçons captivantes, des exercices et du matériel audio pour maîtriser rapidement la langue."
  },
  de: {
    headerTitle: "Russisch Lernen für Ausländer",
    headerSubtitle: "Speziell für diejenigen, die schnell und einfach Russisch lernen möchten!",
    tabLessons: "Lektionen",
    tabExercises: "Übungen",
    tabProgress: "Fortschritt",
    lessonAlphabet: "Alphabet",
    lessonGreetings: "Grüße",
    lessonNumbers: "Zahlen",
    lessonColors: "Farben",
    lessonFamily: "Familie",
    exercise1Title: "Übung 1: Welcher Buchstabe?",
    exercise2Title: "Übung 2: Welcher Buchstabe?",
    exercise3Title: "Übung 3: Grüße",
    exercise4Title: "Übung 4: Frage",
    playBtn: "Abspielen",
    checkBtn: "Überprüfen",
    enterLetter: "Buchstabe eingeben",
    enterPhrase: "Phrase eingeben",
    enterAnswer: "Antwort eingeben",
    progressHeader: "Dein Fortschritt:",
    achievement1Name: "Anfänger",
    achievement1Desc: "Sammle 50 Punkte",
    achievement2Name: "Alphabet-Experte",
    achievement2Desc: "Lerne alle Buchstaben",
    pointsText: "Punkte",
    loginBtn: "Anmelden",
    registerBtn: "Registrieren",
    logoutBtn: "Abmelden",
    loginTitle: "Anmeldung",
    registerTitle: "Registrierung",
    loginSubmit: "Anmelden",
    registerSubmit: "Registrieren",
    usernamePlaceholder: "Benutzername",
    passwordPlaceholder: "Passwort",
    selectLanguage: "Sprache wählen:",
    introInfo: "Unsere Website ist für Ausländer konzipiert, die Russisch lernen möchten. Hier finden Sie spannende Lektionen, Übungen und Audiomaterial, um die Sprache schnell zu beherrschen."
  }
};

let currentLang = localStorage.getItem('language') || 'ru';

// Функция обновления переводов
function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });
}

// Обработчик переключения языка через кнопки с флагами
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.getAttribute('data-lang');
    localStorage.setItem('language', currentLang);
    updateTranslations();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayers();
  initExercises();
  updatePoints();
  updateProgress();
  renderAchievements();
  initTabs();
  updateTranslations();
  initAccountSystem();
});

// ====================
// Аудиоплеер и упражнения
// ====================

function initAudioPlayers() {
  document.querySelectorAll('[data-audio]').forEach(button => {
    button.addEventListener('click', (e) => {
      const audioUrl = e.currentTarget.dataset.audio;
      playAudio(audioUrl);
      
      // Определяем категорию
      const card = e.currentTarget.closest('.lesson-card');
      let category = card ? card.querySelector('h2').textContent.toLowerCase().replace(/\s/g, '_') : 'other';
      
      // Создаем уникальный ID для элемента
      const itemId = e.currentTarget.textContent.trim() || audioUrl.split('/').pop();
      
      if (!progressData[category]) progressData[category] = {};
      if (!progressData[category][itemId]) {
        points += 1;
        progressData[category][itemId] = true;
        saveProgress();
      }
    });
  });
}

function playAudio(url) {
  try {
    const audio = new Audio(url);
    audio.play().catch(error => console.error('Ошибка воспроизведения:', error));
  } catch (error) {
    console.error('Ошибка загрузки аудио:', error);
  }
}

function initExercises() {
  document.querySelectorAll('.check-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const exercise = e.target.closest('.exercise-card');
      const input = exercise.querySelector('.answer-input');
      const result = exercise.querySelector('.exercise-result');
      const correct = exercise.dataset.correct.toLowerCase().trim();

      if (input.value.toLowerCase().trim() === correct) {
        result.textContent = '✅ ' + translations[currentLang]['checkBtn'] + '! +5 ' + translations[currentLang]['pointsText'];
        result.style.color = '#4CAF50';
        points += 5;
        exercise.classList.add('completed');
      } else {
        result.textContent = '❌ ' + translations[currentLang]['checkBtn'] + '.';
        result.style.color = '#d52b1e';
      }
      
      updatePoints();
      checkAchievements();
    });
  });
}

// ====================
// Вкладки
// ====================

function initTabs() {
  document.querySelectorAll('.tab-content').forEach((tab, index) => {
    tab.style.display = index === 0 ? 'block' : 'none';
  });
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const tabId = e.target.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
      });
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.style.display = 'block';
        e.target.classList.add('active');
      }
    });
  });
}

function updatePoints() {
  document.getElementById('points').textContent = points;
  localStorage.setItem('points', points);
}

function updateProgress() {
  const totalItems = Object.values(progressData).reduce((acc, category) => acc + Object.keys(category).length, 0);
  const progressPercent = Math.min(Math.floor((totalItems / 106) * 100), 100);
  const progressBar = document.querySelector('.progress-fill');
  progressBar.style.width = `${progressPercent}%`;
  document.querySelector('.progress-percent').textContent = `${progressPercent}%`;
  localStorage.setItem('progress', JSON.stringify(progressData));
}

function checkAchievements() {
  achievementList.forEach(ach => {
    if (!achievements.includes(ach.id)) {
      const conditionMet = ach.condition(points, progressData);
      if (conditionMet) {
        achievements.push(ach.id);
        showAchievementNotification(ach);
      }
    }
  });
  localStorage.setItem('achievements', JSON.stringify(achievements));
  renderAchievements();
}

function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.innerHTML = `
    <div class="achievement-icon">${achievement.icon}</div>
    <div>
      <h4>Достижение разблокировано!</h4>
      <p>${achievement.name}</p>
      <small>${achievement.description}</small>
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

function renderAchievements() {
  const container = document.querySelector('.achievements-container');
  container.innerHTML = achievementList.map(ach => `
    <div class="achievement ${achievements.includes(ach.id) ? 'unlocked' : 'locked'}">
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-info">
        <h4>${ach.name}</h4>
        <p>${ach.description}</p>
      </div>
    </div>
  `).join('');
}

function saveProgress() {
  localStorage.setItem('progress', JSON.stringify(progressData));
  updateProgress();
  checkAchievements();
}

// ====================
// Система аккаунтов
// ====================

function initAccountSystem() {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');

  loginBtn.addEventListener('click', () => { loginModal.style.display = 'block'; });
  registerBtn.addEventListener('click', () => { registerModal.style.display = 'block'; });
  document.querySelectorAll('.close-modal').forEach(span => {
    span.addEventListener('click', () => {
      document.getElementById(span.dataset.modal).style.display = 'none';
    });
  });
  document.getElementById('login-submit').addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', username);
      updateAccountUI();
      loginModal.style.display = 'none';
    } else {
      alert('Неверный логин или пароль');
    }
  });
  document.getElementById('register-submit').addEventListener('click', () => {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    if (!username || !password) {
      alert('Заполните все поля');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      alert('Пользователь с таким именем уже существует');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    updateAccountUI();
    registerModal.style.display = 'none';
  });
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    updateAccountUI();
  });
  updateAccountUI();
}

function updateAccountUI() {
  const currentUser = localStorage.getItem('currentUser');
  const accountSection = document.getElementById('account-section');
  const userInfo = document.getElementById('user-info');
  if (currentUser) {
    accountSection.style.display = 'none';
    userInfo.style.display = 'block';
    document.getElementById('welcome-msg').textContent = `Добро пожаловать, ${currentUser}!`;
  } else {
    accountSection.style.display = 'block';
    userInfo.style.display = 'none';
  }
}