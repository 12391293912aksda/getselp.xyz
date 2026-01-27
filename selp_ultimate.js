// Code typing animation
const codeLines = [
    '-- SELP v4.2',
    '-- Loaded successfully',
    '',
    'local Players = game:GetService("Players")',
    'local player = Players.LocalPlayer',
    '',
    'print("Welcome, " .. player.Name)',
    'print("SELP is ready to execute")',
    '',
    '-- Your scripts here...',
];

function typeCode() {
    const codeDisplay = document.getElementById('codeDisplay');
    if (!codeDisplay) return;
    
    let lineIndex = 0;
    let output = '';
    
    function addLine() {
        if (lineIndex < codeLines.length) {
            output += codeLines[lineIndex] + '\n';
            codeDisplay.textContent = output;
            lineIndex++;
            setTimeout(addLine, 200);
        }
    }
    
    addLine();
}

// Download button functionality
function handleDownload() {
    // Show download initiated message
    const btn = event.target.closest('button');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span>Opening Discord...</span>';
    btn.disabled = true;
    
    // Open Discord after short delay
    setTimeout(() => {
        window.open('https://discord.gg/selp', '_blank');
        
        // Reset button
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }, 2000);
    }, 500);
}

// Add event listeners to all download buttons
document.addEventListener('DOMContentLoaded', () => {
    // Start code animation
    typeCode();
    
    // Setup download buttons
    const downloadButtons = document.querySelectorAll('#downloadBtn, #downloadBtn2');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', handleDownload);
    });
    
    // Smooth scrolling
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
    
    // Execute button animation
    const execBtn = document.querySelector('.exec-btn');
    if (execBtn) {
        execBtn.addEventListener('click', () => {
            const originalText = execBtn.textContent;
            execBtn.textContent = 'Executing...';
            execBtn.style.background = '#10b981';
            
            setTimeout(() => {
                execBtn.textContent = '✓ Success';
                
                setTimeout(() => {
                    execBtn.textContent = originalText;
                    execBtn.style.background = '';
                }, 1500);
            }, 1000);
        });
    }
});

// Simple scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});
