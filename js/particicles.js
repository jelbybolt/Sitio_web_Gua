// Sistema de partículas para efectos de destellos en el fondo - VERSIÓN MEJORADA
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.flashes = [];
        this.movingLights = [];
        this.init();
    }

    init() {
        console.log('Iniciando sistema de partículas...');
        this.createParticleLayer();
        this.generateParticles();
        this.generateFlashes();
        this.createMovingLights();
        this.animate();
        
        // Verificar que las partículas se crearon
        setTimeout(() => {
            const particles = document.querySelectorAll('.particle');
            console.log(`Partículas creadas: ${particles.length}`);
        }, 1000);
    }

    createParticleLayer() {
        // Remover capa existente si hay
        const existingLayer = document.querySelector('.particle-layer');
        if (existingLayer) {
            existingLayer.remove();
        }
        
        this.particleLayer = document.createElement('div');
        this.particleLayer.className = 'particle-layer';
        
        const backgroundAnimation = document.querySelector('.background-animation');
        if (backgroundAnimation) {
            backgroundAnimation.appendChild(this.particleLayer);
            console.log('Capa de partículas creada correctamente');
        } else {
            console.error('No se encontró el elemento .background-animation');
        }
    }

    generateParticles() {
        console.log('Generando partículas...');
        
        // Crear partículas normales (más visibles)
        for (let i = 0; i < 40; i++) {
            setTimeout(() => this.createParticle('normal'), i * 100);
        }
        
        // Crear partículas grandes
        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createParticle('large'), i * 150);
        }
        
        // Crear partículas de acento
        for (let i = 0; i < 25; i++) {
            setTimeout(() => this.createParticle('accent'), i * 120);
        }
    }

    createParticle(type = 'normal') {
        if (!this.particleLayer) {
            console.error('No hay capa de partículas disponible');
            return;
        }
        
        const particle = document.createElement('div');
        let className = 'particle';
        
        switch(type) {
            case 'large':
                className += ' large';
                break;
            case 'accent':
                className += ' accent';
                break;
        }
        
        particle.className = className;
        
        // Posición inicial aleatoria - más dispersa
        const startX = Math.random() * 100;
        const startY = 100 + Math.random() * 50; // Comenzar más abajo
        
        // Tiempo de animación aleatorio
        const duration = 3 + Math.random() * 7; // Más rápido
        const delay = Math.random() * 3; // Menos delay
        
        // Estilos de la partícula
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Elegir animación aleatoria
        const animations = ['particleFloat', 'particleMove', 'particleSpin'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        particle.style.animationName = randomAnimation;
        
        // Hacer partículas más visibles
        particle.style.opacity = '0.9';
        
        this.particleLayer.appendChild(particle);
        this.particles.push({
            element: particle,
            createdAt: Date.now(),
            duration: duration * 1000
        });
    }

    generateFlashes() {
        console.log('Generando flashes...');
        
        // Crear destellos aleatorios - más frecuentes
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.createFlash(), i * 800);
        }
    }

    createFlash() {
        if (!this.particleLayer) return;
        
        const flash = document.createElement('div');
        flash.className = 'flash';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tiempos aleatorios
        const duration = 2 + Math.random() * 4; // Más rápido
        const delay = Math.random() * 5;
        
        flash.style.left = `${posX}%`;
        flash.style.top = `${posY}%`;
        flash.style.animationDuration = `${duration}s`;
        flash.style.animationDelay = `${delay}s`;
        flash.style.opacity = '0.4'; // Más visibles
        
        this.particleLayer.appendChild(flash);
        this.flashes.push({
            element: flash,
            createdAt: Date.now(),
            duration: duration * 1000
        });
    }

    createMovingLights() {
        if (!this.particleLayer) return;
        
        console.log('Creando luces móviles...');
        
        // Crear luces móviles
        const light1 = document.createElement('div');
        light1.className = 'moving-light';
        light1.style.opacity = '0.3'; // Más visibles
        this.particleLayer.appendChild(light1);
        this.movingLights.push(light1);
        
        const light2 = document.createElement('div');
        light2.className = 'moving-light';
        light2.style.opacity = '0.2';
        this.particleLayer.appendChild(light2);
        this.movingLights.push(light2);
    }

    cleanup() {
        const now = Date.now();
        
        // Limpiar partículas antiguas
        this.particles = this.particles.filter(particle => {
            if (now - particle.createdAt > particle.duration + 2000) {
                if (particle.element.parentNode) {
                    particle.element.remove();
                }
                return false;
            }
            return true;
        });
        
        // Limpiar flashes antiguos
        this.flashes = this.flashes.filter(flash => {
            if (now - flash.createdAt > flash.duration + 2000) {
                if (flash.element.parentNode) {
                    flash.element.remove();
                }
                return false;
            }
            return true;
        });
    }

    replenish() {
        // Reponer partículas si hay pocas
        if (this.particles.length < 50) {
            const needed = 50 - this.particles.length;
            for (let i = 0; i < needed; i++) {
                setTimeout(() => this.createParticle(), i * 200);
            }
        }
        
        // Reponer flashes si hay pocos
        if (this.flashes.length < 6) {
            this.createFlash();
        }
    }

    animate() {
        this.cleanup();
        this.replenish();
        
        // Continuar la animación
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar el sistema de partículas de manera más robusta
function initParticles() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => new ParticleSystem(), 100);
        });
    } else {
        setTimeout(() => new ParticleSystem(), 100);
    }
}

// Inicializar partículas
initParticles();

// También reiniciar cuando cambie la visibilidad de la página
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(() => new ParticleSystem(), 500);
    }
});