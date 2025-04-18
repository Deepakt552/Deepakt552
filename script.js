// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Global circuit animation for full page background
    const globalCanvas = document.getElementById('global-circuit-canvas');
    
    if (globalCanvas) {
        const ctx = globalCanvas.getContext('2d');
        
        // Set canvas dimensions
        globalCanvas.width = window.innerWidth;
        globalCanvas.height = window.innerHeight;
        
        // Circuit animation configuration
        const circuitConfig = {
            // Nodes configuration
            nodes: {
                count: Math.floor(window.innerWidth * window.innerHeight / 12000), // Dynamically calculate based on screen size
                minRadius: 1,
                maxRadius: 3,
                colors: ['#4fd1c5', '#38b2ac', '#81e6d9', '#2c7a7b'],
                speed: 0.2,
                pulseSpeed: 0.02,
                pulseRange: 0.5
            },
            // Connections configuration
            connections: {
                maxDistance: Math.min(150, window.innerWidth / 10), // Responsive connection distance
                lineWidth: 0.5,
                opacity: 0.8
            },
            // Mouse interaction
            mouse: {
                radius: 150,
                active: false,
                x: 0,
                y: 0
            }
        };
        
        // Node objects array
        let nodes = [];
        
        // Initialize nodes
        function initNodes() {
            nodes = [];
            for (let i = 0; i < circuitConfig.nodes.count; i++) {
                const radius = Math.random() * (circuitConfig.nodes.maxRadius - circuitConfig.nodes.minRadius) + circuitConfig.nodes.minRadius;
                nodes.push({
                    x: Math.random() * globalCanvas.width,
                    y: Math.random() * globalCanvas.height,
                    radius: radius,
                    baseRadius: radius,
                    vx: (Math.random() - 0.5) * circuitConfig.nodes.speed,
                    vy: (Math.random() - 0.5) * circuitConfig.nodes.speed,
                    color: circuitConfig.nodes.colors[Math.floor(Math.random() * circuitConfig.nodes.colors.length)],
                    pulse: Math.random() * Math.PI * 2, // Random starting phase
                    dataPoints: [] // For circuit-like data paths
                });
                
                // Generate data points (small circuit paths)
                const pointCount = Math.floor(Math.random() * 5) + 3;
                for (let j = 0; j < pointCount; j++) {
                    nodes[i].dataPoints.push({
                        x: Math.random() * 40 - 20,
                        y: Math.random() * 40 - 20,
                        active: Math.random() > 0.7,
                        pulse: 0,
                        speed: Math.random() * 0.05 + 0.02
                    });
                }
            }
        }
        
        // Draw circuit animation
        function drawCircuit() {
            // Clear canvas
            ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
            
            // Update and draw each node
            nodes.forEach(node => {
                // Move node
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > globalCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > globalCanvas.height) node.vy *= -1;
                
                // Pulse effect
                node.pulse += circuitConfig.nodes.pulseSpeed;
                const pulseFactor = Math.sin(node.pulse) * circuitConfig.nodes.pulseRange;
                node.radius = node.baseRadius * (1 + pulseFactor);
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Draw data circuit paths around some nodes (more technical look)
                if (Math.random() > 0.95) { // Only draw for some nodes per frame
                    ctx.save();
                    ctx.translate(node.x, node.y);
                    
                    // Draw data paths
                    ctx.beginPath();
                    node.dataPoints.forEach((point, idx) => {
                        // Update pulse
                        point.pulse += point.speed;
                        if (point.pulse > 1) {
                            point.pulse = 0;
                            point.active = Math.random() > 0.3;
                        }
                        
                        // Only draw active points
                        if (point.active) {
                            const nextPoint = node.dataPoints[(idx + 1) % node.dataPoints.length];
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(nextPoint.x, nextPoint.y);
                            
                            // Draw small endpoint
                            ctx.fillStyle = node.color;
                            ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
                        }
                    });
                    
                    ctx.strokeStyle = `rgba(79, 209, 197, ${0.3 + pulseFactor})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.restore();
                }
            });
            
            // Draw connections between nodes
            ctx.lineCap = 'round';
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < circuitConfig.connections.maxDistance) {
                        // Calculate opacity based on distance
                        const opacity = (1 - distance / circuitConfig.connections.maxDistance) * circuitConfig.connections.opacity;
                        
                        // Draw line with gradient
                        const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                        gradient.addColorStop(0, nodes[i].color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));
                        gradient.addColorStop(1, nodes[j].color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));
                        
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = circuitConfig.connections.lineWidth;
                        ctx.stroke();
                        
                        // Occasionally draw data transmission effect
                        if (Math.random() > 0.995) {
                            // Data packet effect
                            const animateDataPacket = () => {
                                let progress = 0;
                                const dataSize = Math.random() * 2 + 1;
                                const animationSpeed = Math.random() * 0.01 + 0.005;
                                
                                const moveData = () => {
                                    if (progress >= 1) return;
                                    
                                    progress += animationSpeed;
                                    const x = nodes[i].x + (nodes[j].x - nodes[i].x) * progress;
                                    const y = nodes[i].y + (nodes[j].y - nodes[i].y) * progress;
                                    
                                    ctx.beginPath();
                                    ctx.arc(x, y, dataSize, 0, Math.PI * 2);
                                    ctx.fillStyle = '#ffffff';
                                    ctx.fill();
                                    
                                    requestAnimationFrame(moveData);
                                };
                                
                                moveData();
                            };
                            
                            animateDataPacket();
                        }
                    }
                }
            }
            
            // Mouse interaction effect
            if (circuitConfig.mouse.active) {
                // Draw mouse influence area
                ctx.beginPath();
                ctx.arc(circuitConfig.mouse.x, circuitConfig.mouse.y, circuitConfig.mouse.radius, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(79, 209, 197, 0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Affect nearby nodes
                nodes.forEach(node => {
                    const dx = node.x - circuitConfig.mouse.x;
                    const dy = node.y - circuitConfig.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < circuitConfig.mouse.radius) {
                        // Repel node from mouse
                        const angle = Math.atan2(dy, dx);
                        const force = (circuitConfig.mouse.radius - distance) * 0.03;
                        node.x += Math.cos(angle) * force;
                        node.y += Math.sin(angle) * force;
                        
                        // Highlight the affected node
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
                        ctx.strokeStyle = '#4fd1c5';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            }
            
            // Continue animation
            requestAnimationFrame(drawCircuit);
        }
        
        // Handle window resize
        function handleResize() {
            globalCanvas.width = window.innerWidth;
            globalCanvas.height = window.innerHeight;
            
            // Update node count and max distance based on new dimensions
            circuitConfig.nodes.count = Math.floor(window.innerWidth * window.innerHeight / 12000);
            circuitConfig.connections.maxDistance = Math.min(150, window.innerWidth / 10);
            
            // Reinitialize nodes
            initNodes();
        }
        
        // Handle mouse movement
        function handleMouseMove(e) {
            circuitConfig.mouse.x = e.clientX;
            circuitConfig.mouse.y = e.clientY;
            circuitConfig.mouse.active = true;
        }
        
        function handleMouseLeave() {
            circuitConfig.mouse.active = false;
        }
        
        // Set up event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        // Initialize and start animation
        initNodes();
        drawCircuit();
    }

    // Typing effect for hero section
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            'Full Stack Web Developer',
            'React.js Developer',
            'Laravel Expert',
            'MERN Stack Developer',
            'WordPress Developer',
            'Inertia.js Specialist'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if completed typing current role
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of typing
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                // Move to next role after deletion
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeRole, typingSpeed);
        }
        
        // Start the typing animation
        typeRole();
    }
    
    // Create floating tech icons background
    const techBackground = document.getElementById('tech-background');
    if (techBackground) {
        const techIcons = [
            'react', 'laravel', 'js', 'node-js', 'wordpress', 
            'github', 'css3', 'html5', 'database', 'bolt', 'fire'
        ];
        
        // Create floating icons
        for (let i = 0; i < 25; i++) {
            const icon = document.createElement('i');
            const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
            
            if (randomIcon === 'database' || randomIcon === 'bolt' || randomIcon === 'fire') {
                icon.className = `fas fa-${randomIcon} tech-icon`;
            } else {
                icon.className = `fab fa-${randomIcon} tech-icon`;
            }
            
            icon.style.fontSize = `${Math.random() * 40 + 20}px`;
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            icon.style.animationDuration = `${Math.random() * 10 + 5}s`;
            icon.style.animationDelay = `${Math.random() * 5}s`;
            
            techBackground.appendChild(icon);
        }
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Toggle menu icon between bars and X
            const icon = menuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Handle navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Create loading indicator
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Check if we're in a local development environment
            const isLocalDev = window.location.hostname === '127.0.0.1' || 
                               window.location.hostname === 'localhost';
            
            if (isLocalDev) {
                // In local development, simulate success after a short delay
                setTimeout(() => {
                    console.log('Development mode: Form data that would be sent:', formDataObj);
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show success message for local development
                    const messageElement = document.createElement('div');
                    messageElement.className = 'mt-4 p-3 bg-teal-900/50 text-teal-300 rounded-md text-center';
                    messageElement.textContent = 'Development mode: Message would be sent in production environment';
                    
                    if (contactForm.querySelector('.form-message')) {
                        contactForm.querySelector('.form-message').remove();
                    }
                    messageElement.classList.add('form-message');
                    contactForm.appendChild(messageElement);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        if (messageElement.parentNode) {
                            messageElement.remove();
                        }
                    }, 5000);
                }, 1500);
                
                return;
            }
            
            // If in production environment, send data via AJAX
            fetch('process_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success/error message
                const messageElement = document.createElement('div');
                messageElement.className = data.success ? 
                    'mt-4 p-3 bg-teal-900/50 text-teal-300 rounded-md text-center' : 
                    'mt-4 p-3 bg-red-900/50 text-red-300 rounded-md text-center';
                messageElement.textContent = data.message || (data.success ? 'Message sent successfully!' : 'Failed to send message.');
                
                // Add message to form
                if (contactForm.querySelector('.form-message')) {
                    contactForm.querySelector('.form-message').remove();
                }
                messageElement.classList.add('form-message');
                contactForm.appendChild(messageElement);
                
                // Reset form on success
                if (data.success) {
                    contactForm.reset();
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        if (messageElement.parentNode) {
                            messageElement.remove();
                        }
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                const messageElement = document.createElement('div');
                messageElement.className = 'mt-4 p-3 bg-red-900/50 text-red-300 rounded-md text-center form-message';
                messageElement.textContent = 'An error occurred. Please email me directly at Deepakt552@gmail.com';
                
                if (contactForm.querySelector('.form-message')) {
                    contactForm.querySelector('.form-message').remove();
                }
                contactForm.appendChild(messageElement);
            });
        });
    }

    // Reveal animations on scroll
    const revealOnScroll = function() {
        const elementsToReveal = document.querySelectorAll('.reveal');
        
        elementsToReveal.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Add reveal class to elements that should animate on scroll
    document.querySelectorAll('.bg-slate-800.p-6.rounded-lg').forEach(el => {
        el.classList.add('reveal');
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Custom style for active reveal elements
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add scroll event listener for reveal animations
    window.addEventListener('scroll', revealOnScroll);
    // Initial check on page load
    revealOnScroll();

    // Add year to copyright text
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }

    // Particles animation for projects section
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'particles-canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        particlesContainer.appendChild(canvas);
        
        // Initialize particles
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;
        
        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
            createParticles();
        };
        
        // Create particles
        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    color: getRandomColor(),
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25
                });
            }
        };
        
        // Get random color from teal palette
        const getRandomColor = () => {
            const colors = ['#4fd1c5', '#38b2ac', '#81e6d9', '#2c7a7b'];
            return colors[Math.floor(Math.random() * colors.length)];
        };
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        // Initialize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // Skills section filtering and animations
    const skillFilters = document.querySelectorAll('.skill-filter');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillFilters.length && skillCards.length) {
        // Initialize AOS animations for skill cards
        initSkillsAnimation();
        
        // Add click event to each filter button
        skillFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                skillFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter skill cards
                skillCards.forEach(card => {
                    // Reset styles first for smooth transition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
        
        // Initialize skill animations
        function initSkillsAnimation() {
            // Set initial styles
            skillCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
                card.style.transitionDelay = `${index * 0.1}s`;
            });
            
            // Trigger animation on page load
            setTimeout(() => {
                skillCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 500);
        }
        
        // Style the filter buttons
        styleSkillFilters();
        
        // Function to style the filter buttons
        function styleSkillFilters() {
            // Set initial styles for buttons
            skillFilters.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.style.backgroundColor = 'rgba(79, 209, 197, 0.2)';
                    btn.style.color = '#4fd1c5';
                    btn.style.borderColor = '#4fd1c5';
                } else {
                    btn.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                    btn.style.color = '#94a3b8';
                    btn.style.borderColor = '#334155';
                }
                
                // Add hover effect
                btn.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('active')) {
                        this.style.backgroundColor = 'rgba(79, 209, 197, 0.1)';
                        this.style.color = '#94a3b8';
                    }
                });
                
                btn.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                        this.style.color = '#94a3b8';
                    }
                });
                
                // Update styles on click
                btn.addEventListener('click', function() {
                    skillFilters.forEach(b => {
                        b.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                        b.style.color = '#94a3b8';
                        b.style.borderColor = '#334155';
                    });
                    
                    this.style.backgroundColor = 'rgba(79, 209, 197, 0.2)';
                    this.style.color = '#4fd1c5';
                    this.style.borderColor = '#4fd1c5';
                });
            });
        }
    }

    // Particles Background
    function initParticles() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;

        const particleCount = 50;
        const colors = ['#4fd1c5', '#38b2ac', '#319795', '#2c7a7b'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size (1-5px)
            const size = 1 + Math.random() * 4;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random opacity
            const opacity = 0.1 + Math.random() * 0.4;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                opacity: ${opacity};
                pointer-events: none;
                animation: float-particle ${10 + Math.random() * 20}s linear infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    function setupProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = "20";
            });
            
            card.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    card.style.zIndex = "10";
                }, 300);
            });
        });
    }

    // Load animations when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // ... existing code ...
        
        // Initialize modern animations
        initParticles();
        setupProjectAnimations();
        
        // Add scroll reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.project-card, .section-title, .skill-item').forEach(el => {
            el.classList.add('reveal-element');
            observer.observe(el);
        });
    });

    // Define animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-30px) translateX(10px);
                }
                50% {
                    transform: translateY(-10px) translateX(20px);
                }
                75% {
                    transform: translateY(-20px) translateX(-10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
            
            .reveal-element {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .reveal-element.visible {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
});

// Add delay to each skill card for staggered animation
setTimeout(() => {
    const skillCards = document.querySelectorAll('.bg-slate-800.p-6.rounded-lg');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}, 100);

// Add downloadable resume functionality (you'll need to add your resume file)
const downloadBtn = document.querySelector('a[href="#"].inline-block.mt-6');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Replace with your actual resume file
         window.open('deepak.pdf', '_blank');
        alert('Resume download would be activated here. Add your resume file path to enable this feature.');
    });
} document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.querySelector('a[href="Deepak.pdf"]');
    if (downloadButton) {
        downloadButton.removeAttribute("download"); // Remove the download attribute
        downloadButton.setAttribute("target", "_blank"); // Open in a new tab
    }
});