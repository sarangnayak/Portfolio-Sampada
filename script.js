document.addEventListener('DOMContentLoaded', function() {

    // HERO CANVAS ANIMATION
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let canvasWidth, canvasHeight;

        const setCanvasSize = () => {
            canvasWidth = canvas.width = window.innerWidth;
            canvasHeight = canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            let particleCount = Math.floor(canvasWidth * canvasHeight / 25000);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvasWidth) p.vx *= -1;
                if (p.y < 0 || p.y > canvasHeight) p.vy *= -1;
            });

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            drawParticles();
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => {
            setCanvasSize();
            createParticles();
        });

        setCanvasSize();
        createParticles();
        animate();
    }

    // GSAP SCROLL-TRIGGERED ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate all sections with the class .page-section
    const animatedSections = document.querySelectorAll('.image-item, .about-content');

    animatedSections.forEach(item => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
            },
            duration: 0.8,
            ease: 'power3.out'
        });
    });
});


