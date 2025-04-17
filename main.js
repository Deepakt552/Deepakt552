// Particles animation
function initParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const speed = Math.random() * 50 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;
    const blueVariation = Math.floor(Math.random() * 40 + 180);
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.backgroundColor = `rgba(100, 150, ${blueVariation}, ${opacity})`;
    particle.style.animation = `float ${speed}s ease-in-out infinite`;
    particle.style.animationDelay = `${delay}s`;
    
    // Add glow effect to larger particles
    if (size > 3) {
      particle.classList.add('glow');
    }
    
    container.appendChild(particle);
  }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // ... existing init code ...
  
  initParticles();
}); 