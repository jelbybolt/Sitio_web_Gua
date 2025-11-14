// Efectos de destellos y animaciones al mover el mouse
document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos del mouse si no existen
    let cursorTrail = document.getElementById('cursor-trail');
    let mouseSpotlight = document.getElementById('mouse-spotlight');
    
    if (!cursorTrail) {
        cursorTrail = document.createElement('div');
        cursorTrail.id = 'cursor-trail';
        document.body.appendChild(cursorTrail);
    }
    
    if (!mouseSpotlight) {
        mouseSpotlight = document.createElement('div');
        mouseSpotlight.id = 'mouse-spotlight';
        document.body.appendChild(mouseSpotlight);
    }
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    let isMoving = false;
    let movementTimer;
    
    // Seguir movimiento del mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Mostrar efectos solo si el mouse se está moviendo
        cursorTrail.style.opacity = '1';
        mouseSpotlight.style.opacity = '0.3';
        
        isMoving = true;
        
        // Ocultar efectos después de dejar de mover el mouse
        clearTimeout(movementTimer);
        movementTimer = setTimeout(() => {
            isMoving = false;
            cursorTrail.style.opacity = '0';
            mouseSpotlight.style.opacity = '0';
        }, 1000);
        
        // Efecto especial al pasar sobre elementos interactivos
        const hoveredElement = e.target;
        if (hoveredElement.classList.contains('card') || 
            hoveredElement.classList.contains('nav-menu') || 
            hoveredElement.classList.contains('cta-button') ||
            hoveredElement.classList.contains('scroll-btn')) {
            
            mouseSpotlight.style.transform = 'scale(1.5)';
            mouseSpotlight.style.background = 'radial-gradient(circle, rgba(221, 110, 36, 0.2) 0%, transparent 70%)';
            
            // Efecto de pulso en el cursor
            cursorTrail.style.transform = 'scale(1.5)';
            cursorTrail.style.background = 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)';
        } else {
            mouseSpotlight.style.transform = 'scale(1)';
            mouseSpotlight.style.background = 'radial-gradient(circle, rgba(221, 110, 36, 0.1) 0%, transparent 70%)';
            cursorTrail.style.transform = 'scale(1)';
            cursorTrail.style.background = 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)';
        }
    });
    
    // Ocultar efectos cuando el mouse sale de la ventana
    document.addEventListener('mouseout', function() {
        cursorTrail.style.opacity = '0';
        mouseSpotlight.style.opacity = '0';
    });
    
    // Mostrar efectos cuando el mouse entra a la ventana
    document.addEventListener('mouseenter', function() {
        if (isMoving) {
            cursorTrail.style.opacity = '1';
            mouseSpotlight.style.opacity = '0.3';
        }
    });
    
    // Animación suave del rastro
    function animateTrail() {
        // Movimiento suavizado del rastro
        trailX += (mouseX - trailX) * 0.2;
        trailY += (mouseY - trailY) * 0.2;
        
        // Posicionar elementos
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        
        mouseSpotlight.style.left = mouseX - 50 + 'px';
        mouseSpotlight.style.top = mouseY - 50 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    // Iniciar animación
    animateTrail();
    
    // Efectos de click
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
    
    function createClickEffect(x, y) {
        const clickEffect = document.createElement('div');
        clickEffect.style.position = 'fixed';
        clickEffect.style.left = (x - 5) + 'px';
        clickEffect.style.top = (y - 5) + 'px';
        clickEffect.style.width = '10px';
        clickEffect.style.height = '10px';
        clickEffect.style.background = 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)';
        clickEffect.style.borderRadius = '50%';
        clickEffect.style.pointerEvents = 'none';
        clickEffect.style.zIndex = '9999';
        clickEffect.style.animation = 'clickPulse 0.6s ease-out forwards';
        
        document.body.appendChild(clickEffect);
        
        // Remover después de la animación
        setTimeout(() => {
            if (clickEffect.parentNode) {
                clickEffect.remove();
            }
        }, 600);
    }
});

// Añadir la animación de click al CSS dinámicamente
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickPulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);