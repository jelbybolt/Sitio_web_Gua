// Efectos interactivos para las cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animated-card');
    
    // Añadir efecto de hover mejorado
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Efecto de aparición escalonada
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});