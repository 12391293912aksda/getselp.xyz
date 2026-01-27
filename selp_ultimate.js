// ================================================================
// SELP ULTIMATE - Advanced JavaScript
// 50 Pro Developers Edition
// ================================================================

// ================================================================
// LOADING SCREEN
// ================================================================
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loaderProgress');
let loadProgress = 0;

function updateLoader() {
    loadProgress += Math.random() * 15;
    if (loadProgress > 100) loadProgress = 100;
    loaderProgress.style.width = loadProgress + '%';
    
    if (loadProgress < 100) {
        setTimeout(updateLoader, 100 + Math.random() * 200);
    } else {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initAllAnimations();
        }, 500);
    }
}

window.addEventListener('load', () => {
    setTimeout(updateLoader, 300);
});

// ================================================================
// CUSTOM CURSOR
// ================================================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .magnetic');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ================================================================
// MAGNETIC ELEMENTS
// ================================================================
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// ================================================================
// WEBGL BACKGROUND (Three.js)
// ================================================================
function initWebGL() {
    const canvas = document.getElementById('webglCanvas');
    if (!canvas || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse movement effect
    let targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        
        particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ================================================================
// NAVIGATION
// ================================================================
const nav = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        // Add mobile menu logic here
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ================================================================
// CODE EDITOR TYPING ANIMATION
// ================================================================
const codeContent = document.getElementById('codeContent');
const codeLines = [
    { text: '-- SELP Executor v4.0.2', class: 'code-comment' },
    { text: '-- Hyperion Bypass Active', class: 'code-comment' },
    { text: '', class: '' },
    { text: 'local player = game.Players.LocalPlayer', class: '' },
    { text: 'local character = player.Character', class: '' },
    { text: '', class: '' },
    { text: '-- Load Premium Script', class: 'code-comment' },
    { text: 'loadstring(game:HttpGet(', class: '' },
    { text: '  "https://selp.dev/scripts/premium.lua"', class: 'code-string' },
    { text: '))()', class: '' },
    { text: '', class: '' },
    { text: '✓ Script executed successfully!', class: 'code-success' }
];

function typeCode() {
    if (!codeContent) return;
    codeContent.innerHTML = '';
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            const lineEl = document.createElement('div');
            lineEl.className = 'code-line';
            lineEl.style.animationDelay = `${index * 0.1}s`;
            
            if (line.class) {
                lineEl.innerHTML = `<span class="${line.class}">${line.text}</span>`;
            } else {
                // Syntax highlighting
                let text = line.text;
                text = text.replace(/\b(local|function|if|then|end|return|true|false|nil)\b/g, '<span class="code-keyword">$1</span>');
                text = text.replace(/\b(game|player|character|Players|LocalPlayer|Character)\b/g, '<span class="code-variable">$1</span>');
                text = text.replace(/\b(loadstring|HttpGet)\b/g, '<span class="code-function">$1</span>');
                text = text.replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>');
                lineEl.innerHTML = text || '&nbsp;';
            }
            
            codeContent.appendChild(lineEl);
        }, index * 150);
    });
}

// Execute button effect
const executeBtn = document.getElementById('executeBtn');
if (executeBtn) {
    executeBtn.addEventListener('click', () => {
        executeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" class="spin"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2" stroke-dasharray="30 70"/></svg> Executing...';
        
        setTimeout(() => {
            executeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" fill="none"/></svg> Success!';
            executeBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            
            setTimeout(() => {
                executeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Execute';
                executeBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ================================================================
// COUNTER ANIMATION
// ================================================================
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    if (!target) return;
    
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// ================================================================
// SCROLL ANIMATIONS (AOS Alternative)
// ================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                    
                    // Trigger counter animation
                    const counter = entry.target.querySelector('[data-count]');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                }, parseInt(delay));
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ================================================================
// FAQ ACCORDION
// ================================================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ================================================================
// PRICING TOGGLE
// ================================================================
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const isLifetime = pricingToggle.checked;
        const toggleLabels = document.querySelectorAll('.toggle-label');
        
        toggleLabels.forEach((label, index) => {
            label.classList.toggle('active', index === (isLifetime ? 1 : 0));
        });
        
        document.querySelectorAll('.pricing-price .amount').forEach(amount => {
            const value = isLifetime ? amount.dataset.lifetime : amount.dataset.monthly;
            amount.textContent = value;
        });
        
        document.querySelectorAll('.pricing-price .period').forEach(period => {
            const value = isLifetime ? period.dataset.lifetime : period.dataset.monthly;
            if (value) period.textContent = value;
        });
    });
}

// ================================================================
// TESTIMONIALS AUTO-DUPLICATE FOR INFINITE SCROLL
// ================================================================
function setupTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    // Duplicate testimonials for seamless loop
    const cards = track.innerHTML;
    track.innerHTML = cards + cards;
}

// ================================================================
// PARALLAX EFFECTS
// ================================================================
function initParallax() {
    const orbs = document.querySelectorAll('.orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translate(${Math.sin(scrollY * 0.01) * 20}px, ${scrollY * speed}px)`;
        });
    });
}

// ================================================================
// GLITCH EFFECT RANDOMIZER
// ================================================================
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    setInterval(() => {
        glitchElements.forEach(el => {
            if (Math.random() > 0.95) {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = '';
            }
        });
    }, 100);
}

// ================================================================
// SOUND EFFECTS (Optional - Uncomment to enable)
// ================================================================
/*
const sounds = {
    hover: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10...'), // Add base64 sound
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10...')
};

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play().catch(() => {});
    }
}

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => playSound('hover'));
    el.addEventListener('click', () => playSound('click'));
});
*/

// ================================================================
// EASTER EGG - KONAMI CODE
// ================================================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 24px; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
}

// ================================================================
// CONSOLE BRANDING
// ================================================================
console.log('%c███████╗███████╗██╗     ██████╗ ', 'color: #00f0ff; font-size: 12px;');
console.log('%c██╔════╝██╔════╝██║     ██╔══██╗', 'color: #00f0ff; font-size: 12px;');
console.log('%c███████╗█████╗  ██║     ██████╔╝', 'color: #00f0ff; font-size: 12px;');
console.log('%c╚════██║██╔══╝  ██║     ██╔═══╝ ', 'color: #bf00ff; font-size: 12px;');
console.log('%c███████║███████╗███████╗██║     ', 'color: #bf00ff; font-size: 12px;');
console.log('%c╚══════╝╚══════╝╚══════╝╚═╝     ', 'color: #bf00ff; font-size: 12px;');
console.log('%cNext-Gen Roblox Executor', 'color: #ffffff; font-size: 14px; margin-top: 10px;');
console.log('%c⚠️ For educational purposes only', 'color: #ffaa00; font-size: 11px;');

// ================================================================
// PERFORMANCE MONITOR (Dev Mode)
// ================================================================
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (isDev) {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    // measureFPS(); // Uncomment to enable FPS logging
}

// ================================================================
// INITIALIZE ALL
// ================================================================
function initAllAnimations() {
    initWebGL();
    initScrollAnimations();
    initParallax();
    setupTestimonials();
    randomGlitch();
    typeCode();
    
    // Trigger initial animations for visible elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('aos-animate');
        }
    });
}

// Fallback if load event already fired
if (document.readyState === 'complete') {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAllAnimations();
    }, 1000);
}

// ================================================================
// SERVICE WORKER REGISTRATION (PWA Support)
// ================================================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
*/
