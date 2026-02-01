// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scroll behavior to interests slider
    const slider = document.querySelector('.interests-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        slider.style.cursor = 'grab';
    }

    // Add intersection observer for cards animation on scroll
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Add click effect to interest items
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            interestItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add a subtle pulse animation
            this.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Parallax effect for card images on mouse move
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / cardRect.height) * 5;
            const rotateY = -(mouseX / cardRect.width) * 5;
            
            const cardImage = card.querySelector('.card-image img');
            if (cardImage) {
                cardImage.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            const cardImage = card.querySelector('.card-image img');
            if (cardImage) {
                cardImage.style.transform = 'scale(1.1) rotateX(0) rotateY(0)';
            }
        });
    });

    // Add dynamic gradient background animation
    const aboutSection = document.querySelector('.about-section');
    let hue = 0;
    
    function animateBackground() {
        hue = (hue + 0.1) % 360;
        aboutSection.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 65%) 0%, 
            hsl(${(hue + 30) % 360}, 60%, 60%) 100%)`;
        requestAnimationFrame(animateBackground);
    }
    
    // Uncomment below to enable animated gradient (optional)
    // animateBackground();

    // Smooth scroll for any internal links (if you add navigation later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add a subtle floating animation to cards
    cards.forEach((card, index) => {
        setInterval(() => {
            const currentTransform = card.style.transform || 'translateY(0)';
            const offset = Math.sin(Date.now() / 1000 + index) * 3;
            if (!card.matches(':hover')) {
                card.style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${offset}px)`;
            }
        }, 50);
    });

    console.log('About Me section loaded successfully! 🚀');
});

// Add CSS for pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .interest-item.active {
        position: relative;
    }
    
    .interest-item.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 2px;
    }
`;
document.head.appendChild(style);