# 🌟 Deepak Tiwari | Full Stack Developer Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, interactive portfolio website showcasing my skills, projects, and professional experience as a Full Stack Developer.

## 🔥 Live Preview

Visit the portfolio at: [deepaktiwari.com](https://example.com) (link to be updated)

![Portfolio Preview](https://placehold.co/800x400/1e293b/e2e8f0?text=Portfolio+Preview)

## ✨ Key Features

- 🖥️ Fully responsive design that adapts to any device
- 🎨 Modern UI with glass morphism and gradient effects
- 🌠 Interactive particle animations and circuit backgrounds
- ⚡ Dynamic typing animations and smooth scroll effects
- 🧩 Interactive skill filtering and categorization
- 📱 Mobile-friendly navigation with animated transitions
- 📊 Animated skill progress bars with clean visualization
- 🖼️ Project cards with interactive hover effects

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with advanced animations
- **JavaScript** - ES6+ for interactive elements and animations
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### Animation & Graphics
- **Canvas API** - For the circuit and particle animations
- **CSS Animations** - For smooth transitions and effects
- **JavaScript Animations** - For dynamic particle movements

### Libraries
- **Font Awesome** - For high-quality icons
- **Google Fonts** - For typography enhancement

## 💫 Particle Animation System

The portfolio features a sophisticated particle animation system that creates a dynamic, interactive background:

- **Canvas-based particles** - Efficiently rendered for performance
- **Physics-based movements** - Natural floating animations with randomized parameters
- **Interactive connections** - Particles connect when in proximity
- **Mouse interaction** - Particles react to mouse movement
- **Circuit-like data paths** - Simulates data flow for a tech aesthetic
- **Adaptive density** - Particle count adjusts based on screen size

## 📂 Project Structure

```
portfolio/
├── index.html         # Main HTML document
├── styles.css         # Main CSS styling
├── script.js          # Primary JavaScript with animations
├── style.css          # Supplementary CSS for particles
├── main.js            # Additional JavaScript functionality
├── *.png              # Project images and profile picture
└── README.md          # Project documentation
```

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Deepakt552/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Open `index.html` in your browser or use a local development server:
   ```bash
   # Using Python's built-in server
   python -m http.server
   
   # Or with Node.js
   npx serve
   ```

## 📱 Responsive Breakpoints

The portfolio is fully responsive with breakpoints at:

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Laptop**: 768px - 1024px
- **Desktop**: > 1024px

## 🧠 Technical Implementation Highlights

### Circuit Animation
```javascript
function drawCircuit() {
    // Clear canvas and draw nodes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update nodes with physics-based movement
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary collision detection
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node with pulse animation
        node.pulse += circuitConfig.nodes.pulseSpeed;
        node.radius = node.baseRadius * (1 + Math.sin(node.pulse) * circuitConfig.nodes.pulseRange);
    });
    
    // Create dynamic connections between proximate nodes
    // with gradient styling and data packet effects
}
```

### Particle Container
```javascript
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;
    const colors = ['#4fd1c5', '#38b2ac', '#319795', '#2c7a7b'];
    
    // Create particles with randomized properties
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Apply randomized styling and animations
        particle.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${1 + Math.random() * 4}px;
            height: ${1 + Math.random() * 4}px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: ${0.1 + Math.random() * 0.4};
            pointer-events: none;
            animation: float-particle ${10 + Math.random() * 20}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Feel free to reach out for collaborations or questions:

- GitHub: [@Deepakt552](https://github.com/Deepakt552)
- LinkedIn: [Deepakt552](https://linkedin.com/in/Deepakt552)
- Twitter: [@Deepakt552](https://twitter.com/Deepakt552)
- Email: Deepakt552@gmail.com

---

⚡ Designed & developed with 💻 by [Deepak Tiwari](https://github.com/Deepakt552) 