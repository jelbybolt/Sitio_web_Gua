// Efectos interactivos para las cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animated-card');
    
    // Añadir efecto de hover mejorado
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efecto de aparición escalonada
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});