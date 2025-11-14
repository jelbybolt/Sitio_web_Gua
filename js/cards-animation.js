// Efectos interactivos para las cards - SCROLL HORIZONTAL MEJORADO
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animated-card');
    const scrollWrapper = document.querySelector('.cards-scroll-wrapper');
    
    if (!scrollWrapper) return;
    
    // Inicializar cards activas
    initCardScroll();
    
    // Configurar observador de intersección para detectar cards visibles
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando una card es visible, hacerla activa
                setActiveCard(entry.target);
            }
        });
    }, {
        threshold: 0.6, // Cuando el 60% de la card es visible
        root: scrollWrapper
    });
    
    // Observar todas las cards
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Efecto de hover mejorado
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.85)';
                this.style.opacity = '0.6';
            }
        });
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        const activeCard = document.querySelector('.cards-grid.horizontal .card.active');
        if (!activeCard) return;
        
        if (e.key === 'ArrowLeft') {
            scrollToAdjacentCard(-1);
        } else if (e.key === 'ArrowRight') {
            scrollToAdjacentCard(1);
        }
    });
    
    // Scroll suave al hacer clic en cards no activas
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                scrollToCard(this);
            }
        });
    });
});

// Función para inicializar el scroll de cards
function initCardScroll() {
    const cards = document.querySelectorAll('.cards-grid.horizontal .card');
    if (cards.length > 0) {
        // Activar solo la primera card inicialmente
        setActiveCard(cards[0]);
        
        // Scroll a la primera card
        setTimeout(() => {
            scrollToCard(cards[0]);
        }, 100);
    }
}

// Función para establecer card activa
function setActiveCard(activeCard) {
    const cards = document.querySelectorAll('.cards-grid.horizontal .card');
    
    // Remover clase active de todas las cards
    cards.forEach(card => {
        card.classList.remove('active');
        card.style.transform = 'scale(0.85)';
        card.style.opacity = '0.6';
    });
    
    // Añadir clase active a la card seleccionada
    activeCard.classList.add('active');
    activeCard.style.transform = 'scale(1.05)';
    activeCard.style.opacity = '1';
}

// Función para scroll a una card específica
function scrollToCard(targetCard) {
    const scrollWrapper = document.querySelector('.cards-scroll-wrapper');
    const cardRect = targetCard.getBoundingClientRect();
    const wrapperRect = scrollWrapper.getBoundingClientRect();
    
    const scrollPosition = targetCard.offsetLeft - (wrapperRect.width - cardRect.width) / 2;
    
    scrollWrapper.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    setActiveCard(targetCard);
}

// Función para scroll a card adyacente
function scrollToAdjacentCard(direction) {
    const cards = document.querySelectorAll('.cards-grid.horizontal .card');
    const activeCard = document.querySelector('.cards-grid.horizontal .card.active');
    
    if (!activeCard) return;
    
    const currentIndex = Array.from(cards).indexOf(activeCard);
    let newIndex = currentIndex + direction;
    
    // Asegurar que el índice esté dentro de los límites
    newIndex = Math.max(0, Math.min(newIndex, cards.length - 1));
    
    if (newIndex !== currentIndex) {
        scrollToCard(cards[newIndex]);
    }
}

// Función para los botones de navegación
function scrollCards(direction) {
    scrollToAdjacentCard(direction);
}