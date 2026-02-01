 // ==================== INITIALIZE AOS ====================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
});

// ==================== TYPING ANIMATION ====================
const roles = [
    'Frontend Developer',
    'React.js Developer',
    'React Native Developer',
    'Android App Developer',
    'UI Developer',
    'Aspiring Software Developer'
];


let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

const roleElement = document.getElementById('dynamicRole');

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
        
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
        
        if (charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        }
    }
    
    setTimeout(typeRole, typeSpeed);
}

setTimeout(typeRole, 1000);

// ==================== PARTICLE ANIMATION ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (this.y > canvas.height) {
            this.reset();
        }
        
        if (this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
    }
}

const particlesArray = [];
const numberOfParticles = window.innerWidth < 768 ? 40 : 60;

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ==================== MOUSE INTERACTION ====================
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    particlesArray.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
            const force = (120 - distance) / 120;
            particle.x += (dx / distance) * force * 2;
            particle.y += (dy / distance) * force * 2;
        }
    });
});

// ==================== PROFILE IMAGE PLACEHOLDER ====================
const profileImg = document.getElementById('profileImage');

profileImg.addEventListener('error', function() {
    const canvas = document.createElement('canvas');
    canvas.width = 350;
    canvas.height = 350;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 350, 350);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#ec4899');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 350, 350);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KA', 175, 175);
    
    this.src = canvas.toDataURL();
});

// ==================== STATS COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseFloat(stat.getAttribute('data-target'));
            animateValue(stat, 0, target, 1500);
            statsObserver.unobserve(stat);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const decimals = end % 1 !== 0 ? 2 : 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        element.textContent = decimals ? current.toFixed(decimals) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = decimals ? end.toFixed(decimals) : end;
        }
    }
    
    requestAnimationFrame(update);
}

// ==================== SMOOTH SCROLL ====================
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



// ==================== PROFILE CARD 3D TILT ====================
const profileCard = document.querySelector('.profile-card');

if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== TECH BUBBLE TOOLTIP ====================
const techBubbles = document.querySelectorAll('.tech-bubble');

techBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', function() {
        const title = this.getAttribute('title');
        if (title) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                bottom: 110%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(2, 6, 23, 0.95);
                color: #f1f5f9;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.75rem;
                font-weight: 600;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                border: 1px solid rgba(99, 102, 241, 0.3);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        }
    });
    
    bubble.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    });
});

// ==================== CURSOR GLOW EFFECT ====================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    floatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        canvas.style.display = 'none';
    } else {
        canvas.style.display = 'block';
    }
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c👋 Hey Developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking to connect? Let\'s chat!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 karthik.alle.cse@gmail.com', 'font-size: 14px; color: #ec4899; font-weight: bold;');
console.log('%c🔗 github.com/Allekarthik', 'font-size: 14px; color: #14b8a6;');