// ==================== MOVIE OF TALAT - CINEMATIC EXPERIENCE ====================

const MovieOfTalat = {
    currentScene: 0,
    totalScenes: 10,
    musicStarted: false,
    autoPlayInterval: null,
    sceneDurations: [8000, 6000, 6000, 25000, 15000, 8000, 12000, 10000, 28000, 8000],
    
    scenes: [
        'scene-opening',
        'scene1',
        'scene2',
        'scene3',
        'scene4',
        'scene5',
        'scene6',
        'scene7',
        'scene-ending',
        'scene-postcredit'
    ],

    init() {
        this.cacheElements();
        this.bindEvents();
        this.createDustParticles();
        this.createGoldenParticles();
        this.createSparkles();
        this.createPetals();
        this.createConfetti();
        this.createFireworks();
        this.createMagicParticles();
        this.updateProgress();
        this.updateNavDots();
    },

    cacheElements() {
        this.bgMusic = document.getElementById('bgMusic');
        this.musicControl = document.getElementById('musicControl');
        this.musicIcon = document.getElementById('musicIcon');
        this.particlesContainer = document.getElementById('particlesContainer');
        this.progressFill = document.getElementById('progressFill');
        this.navDots = document.querySelectorAll('.dot');
        this.envelopeContainer = document.getElementById('envelopeContainer');
        this.letterContent = document.getElementById('letterContent');
    },

    bindEvents() {
        // Music control
        this.musicControl.addEventListener('click', () => this.toggleMusic());

        // Opening scene click to start
        const openingScene = document.getElementById('scene-opening');
        openingScene.addEventListener('click', () => {
            if (!this.musicStarted) {
                this.startMusic();
            }
            this.startAutoPlay();
        });

        // Nav dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToScene(index);
                this.stopAutoPlay();
            });
        });

        // Envelope click
        if (this.envelopeContainer) {
            this.envelopeContainer.addEventListener('click', () => this.openLetter());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextScene();
                this.stopAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevScene();
                this.stopAutoPlay();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextScene();
                } else {
                    this.prevScene();
                }
                this.stopAutoPlay();
            }
        });
    },

    // ==================== MUSIC ====================
    startMusic() {
        if (this.bgMusic) {
            this.bgMusic.volume = 0.5;
            this.bgMusic.play().catch(e => console.log('Audio play failed:', e));
            this.musicStarted = true;
            this.musicControl.classList.add('playing');
            this.musicIcon.textContent = '🎵';
        }
    },

    toggleMusic() {
        if (!this.bgMusic) return;
        
        if (this.bgMusic.paused) {
            this.bgMusic.play();
            this.musicControl.classList.add('playing');
            this.musicIcon.textContent = '🎵';
        } else {
            this.bgMusic.pause();
            this.musicControl.classList.remove('playing');
            this.musicIcon.textContent = '🔇';
        }
    },

    // ==================== SCENE MANAGEMENT ====================
    goToScene(index) {
        if (index < 0 || index >= this.totalScenes) return;
        
        // Hide current scene
        const currentSceneEl = document.getElementById(this.scenes[this.currentScene]);
        if (currentSceneEl) {
            currentSceneEl.classList.remove('active');
        }

        // Show new scene
        this.currentScene = index;
        const newSceneEl = document.getElementById(this.scenes[this.currentScene]);
        if (newSceneEl) {
            newSceneEl.classList.add('active');
        }

        this.updateNavDots();
        this.updateProgress();
        this.triggerSceneEffects(this.currentScene);
    },

    nextScene() {
        if (this.currentScene < this.totalScenes - 1) {
            this.goToScene(this.currentScene + 1);
        }
    },

    prevScene() {
        if (this.currentScene > 0) {
            this.goToScene(this.currentScene - 1);
        }
    },

    // ==================== AUTO PLAY ====================
    startAutoPlay() {
        this.stopAutoPlay();
        const duration = this.sceneDurations[this.currentScene] || 5000;
        
        this.autoPlayInterval = setTimeout(() => {
            if (this.currentScene < this.totalScenes - 1) {
                this.nextScene();
                this.startAutoPlay();
            }
        }, duration);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearTimeout(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    // ==================== VISUAL UPDATES ====================
    updateNavDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentScene);
        });
    },

    updateProgress() {
        const progress = ((this.currentScene + 1) / this.totalScenes) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
    },

    // ==================== PARTICLE SYSTEMS ====================
    createDustParticles() {
        if (!this.particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'dust-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${10 + Math.random() * 20}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            this.particlesContainer.appendChild(particle);
        }
    },

    createGoldenParticles() {
        const container = document.getElementById('goldenParticles');
        if (!container) return;

        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'golden-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 15}s`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.width = `${3 + Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    },

    createSparkles() {
        const container = document.getElementById('sparkles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
            sparkle.style.animationDelay = `${Math.random() * 5}s`;
            const size = 4 + Math.random() * 6;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            container.appendChild(sparkle);
        }
    },

    createPetals() {
        const container = document.getElementById('floatingPetals');
        if (!container) return;

        for (let i = 0; i < 25; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${10 + Math.random() * 15}s`;
            petal.style.animationDelay = `${Math.random() * 10}s`;
            const size = 10 + Math.random() * 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            const colors = ['#ffb6c1', '#ffc0cb', '#ff69b4', '#dda0dd', '#e6e6fa'];
            petal.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
            container.appendChild(petal);
        }
    },

    createConfetti() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;

        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDuration = `${3 + Math.random() * 5}s`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            const size = 6 + Math.random() * 8;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size * 0.6}px`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(confetti);
        }
    },

    createFireworks() {
        const container = document.getElementById('fireworks');
        if (!container) return;

        const createFireworkBurst = () => {
            const x = 20 + Math.random() * 60;
            const y = 10 + Math.random() * 40;
            const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff69b4', '#00cec9', '#fdcb6e'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                particle.style.background = color;
                const angle = (Math.PI * 2 * i) / 30;
                const distance = 50 + Math.random() * 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                particle.style.animation = `fireworkExplode 1.5s ease-out forwards`;
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                // Add custom keyframes for each particle
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }
        };

        // Create fireworks when scene 5 is active
        const checkAndCreateFireworks = () => {
            const scene5 = document.getElementById('scene5');
            if (scene5 && scene5.classList.contains('active')) {
                createFireworkBurst();
            }
        };

        setInterval(checkAndCreateFireworks, 2000);
    },

    createMagicParticles() {
        const container = document.getElementById('magicParticles');
        if (!container) return;

        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#a29bfe', '#fd79a8'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 12}s`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            const size = 3 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
            container.appendChild(particle);
        }
    },

    // ==================== LETTER INTERACTION ====================
    openLetter() {
        if (!this.envelopeContainer || !this.letterContent) return;
        
        this.envelopeContainer.style.display = 'none';
        this.letterContent.classList.add('open');
        this.letterContent.style.display = 'block';
    },

    // ==================== SCENE-SPECIFIC EFFECTS ====================
    triggerSceneEffects(sceneIndex) {
        switch(sceneIndex) {
            case 0: // Opening
                this.resetOpeningAnimations();
                break;
            case 3: // Memory Montage
                this.resetPhotoAnimations();
                break;
            case 5: // Birthday
                this.triggerBirthdayEffects();
                break;
        }
    },

    resetOpeningAnimations() {
        const opening = document.getElementById('scene-opening');
        if (!opening) return;
        
        opening.classList.remove('active');
        void opening.offsetWidth; // Force reflow
        opening.classList.add('active');
    },

    resetPhotoAnimations() {
        const photos = document.querySelectorAll('.photo-slide');
        photos.forEach(photo => {
            photo.style.animation = 'none';
            void photo.offsetWidth;
        });
        
        // Re-trigger animations
        const scene3 = document.getElementById('scene3');
        if (scene3) {
            scene3.classList.remove('active');
            void scene3.offsetWidth;
            scene3.classList.add('active');
        }
    },

    triggerBirthdayEffects() {
        // Trigger confetti burst
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach((c, i) => {
            c.style.animation = 'none';
            void c.offsetWidth;
            c.style.animation = `confettiFall ${3 + Math.random() * 5}s linear ${Math.random() * 3}s infinite`;
        });
    }
};

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    MovieOfTalat.init();
});

// ==================== ADDITIONAL CSS ANIMATIONS VIA JS ====================
// Add firework explosion keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fireworkExplode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx, 100px), var(--ty, 100px)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
