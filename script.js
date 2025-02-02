// Инициализация данных
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

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initAudioPlayers();
    initExercises();
    updatePoints();
    updateProgress();
    renderAchievements();
    initTabs();
});

// Инициализация аудиоплееров
function initAudioPlayers() {
    document.querySelectorAll('[data-audio]').forEach(button => {
        button.addEventListener('click', (e) => {
            const audioUrl = e.currentTarget.dataset.audio;
            playAudio(audioUrl);
            
            // Определяем категорию
            const card = e.currentTarget.closest('.lesson-card');
            const category = card ? card.querySelector('h2').textContent.toLowerCase().replace(/\s/g, '_') : 'other';
            
            // Создаем уникальный ID для элемента
            const itemId = e.currentTarget.textContent.trim() || audioUrl.split('/').pop();
            
            if (!progressData[category][itemId]) {
                points += 1;
                progressData[category][itemId] = true;
                saveProgress();
            }
        });
    });
}

// Воспроизведение аудио
function playAudio(url) {
    try {
        const audio = new Audio(url);
        audio.play().catch(error => console.error('Ошибка воспроизведения:', error));
    } catch (error) {
        console.error('Ошибка загрузки аудио:', error);
    }
}

// Инициализация упражнений
function initExercises() {
    document.querySelectorAll('.check-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const exercise = e.target.closest('.exercise-card');
            const input = exercise.querySelector('.answer-input');
            const result = exercise.querySelector('.exercise-result');
            const correct = exercise.dataset.correct.toLowerCase().trim();

            if (input.value.toLowerCase().trim() === correct) {
                result.textContent = '✅ Правильно! +5 баллов';
                result.style.color = '#4CAF50';
                points += 5;
                exercise.classList.add('completed');
            } else {
                result.textContent = '❌ Неправильно. Попробуйте ещё!';
                result.style.color = '#d52b1e';
            }
            
            updatePoints();
            checkAchievements();
        });
    });
}

// Инициализация вкладок
function initTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            document.querySelectorAll('.tab-content, .tab-button').forEach(el => {
                el.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
            button.classList.add('active');
        });
    });
}

// Обновление баллов
function updatePoints() {
    document.getElementById('points').textContent = points;
    localStorage.setItem('points', points);
}

// Обновление прогресса
function updateProgress() {
    const totalItems = Object.values(progressData).reduce((acc, category) => {
        return acc + Object.keys(category).length;
    }, 0);
    
    const progressPercent = Math.min(Math.floor((totalItems / 106) * 100), 100);
    const progressBar = document.querySelector('.progress-fill');
    
    progressBar.style.width = `${progressPercent}%`;
    document.querySelector('.progress-percent').textContent = `${progressPercent}%`;
    localStorage.setItem('progress', JSON.stringify(progressData));
}

// Проверка достижений
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

// Показать уведомление о достижении
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

// Отображение достижений
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

// Сохранение прогресса
function saveProgress() {
    localStorage.setItem('progress', JSON.stringify(progressData));
    updateProgress();
    checkAchievements();
}

// Инициализация вкладок (исправленная версия)
function initTabs() {
    // Показываем первую вкладку по умолчанию
    document.querySelectorAll('.tab-content').forEach((tab, index) => {
        tab.style.display = index === 0 ? 'block' : 'none';
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            
            // Скрываем все вкладки
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Убираем активность у всех кнопок
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Показываем выбранную вкладку
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.style.display = 'block';
                e.target.classList.add('active');
            }
        });
    });
}