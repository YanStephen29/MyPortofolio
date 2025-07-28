// =========== 3D SPHERES INTERACTIVE EFFECTS ===========

document.addEventListener('DOMContentLoaded', function() {
    init3DSpheres();
});

function init3DSpheres() {
    const spheres = document.querySelectorAll('.floating-sphere');
    
    // Add magnetic effect when mouse is near
    document.addEventListener('mousemove', (e) => {
        spheres.forEach(sphere => {
            const rect = sphere.getBoundingClientRect();
            const sphereX = rect.left + rect.width / 2;
            const sphereY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - sphereX, 2) + 
                Math.pow(e.clientY - sphereY, 2)
            );
            
            // Magnetic effect when cursor is within 100px
            if (distance < 100) {
                sphere.classList.add('magnetic');
                
                // Calculate magnetic pull
                const pullX = (e.clientX - sphereX) * 0.1;
                const pullY = (e.clientY - sphereY) * 0.1;
                
                sphere.style.transform += ` translate(${pullX}px, ${pullY}px)`;
            } else {
                sphere.classList.remove('magnetic');
                // Reset transform to default animation
                setTimeout(() => {
                    sphere.style.transform = '';
                }, 100);
            }
        });
    });
    
    // Add click interaction
    spheres.forEach((sphere, index) => {
        sphere.addEventListener('click', () => {
            // Create explosion effect
            createSphereBurst(sphere, index);
            
            // Temporarily pause animation
            sphere.style.animationPlayState = 'paused';
            sphere.style.transform = 'perspective(1000px) rotateX(360deg) rotateY(360deg) scale(1.5)';
            sphere.style.filter = 'brightness(2) saturate(2)';
            
            setTimeout(() => {
                sphere.style.animationPlayState = 'running';
                sphere.style.transform = '';
                sphere.style.filter = '';
            }, 1000);
        });
        
        // Add hover effect
        sphere.addEventListener('mouseenter', () => {
            sphere.style.animationPlayState = 'paused';
        });
        
        sphere.addEventListener('mouseleave', () => {
            sphere.style.animationPlayState = 'running';
        });
    });
    
    // Add random color changes
    setInterval(() => {
        spheres.forEach(sphere => {
            if (Math.random() > 0.95) { // 5% chance every interval
                changeSpherColor(sphere);
            }
        });
    }, 2000);
}

function createSphereBurst(sphere, index) {
    const rect = sphere.getBoundingClientRect();
    const colors = [
        'linear-gradient(45deg, #0ea5e9, #3b82f6)',
        'linear-gradient(45deg, #8b5cf6, #ec4899)',
        'linear-gradient(45deg, #06b6d4, #10b981)',
        'linear-gradient(45deg, #f59e0b, #ef4444)'
    ];
    
    // Create burst particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${endX}px, ${endY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => particle.remove(), 800);
    }
}

function changeSpherColor(sphere) {
    const colors = [
        'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        'linear-gradient(45deg, #4834d4, #686de0)',
        'linear-gradient(45deg, #00d2d3, #01a3a4)',
        'linear-gradient(45deg, #feca57, #ff9ff3)',
        'linear-gradient(45deg, #ff9f43, #ee5a24)',
        'linear-gradient(45deg, #0abde3, #006ba6)'
    ];
    
    const originalBg = sphere.style.background;
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    
    sphere.style.background = newColor;
    sphere.style.filter = 'brightness(1.5) saturate(1.5)';
    
    setTimeout(() => {
        sphere.style.background = originalBg;
        sphere.style.filter = '';
    }, 2000);
}

// Add sphere trail effect
function addSphereTrail() {
    const spheres = document.querySelectorAll('.floating-sphere');
    
    spheres.forEach(sphere => {
        setInterval(() => {
            const trail = sphere.cloneNode(true);
            trail.style.opacity = '0.3';
            trail.style.transform = sphere.style.transform;
            trail.style.animation = 'none';
            trail.classList.add('sphere-trail');
            
            sphere.parentNode.appendChild(trail);
            
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform += ' scale(2)';
            }, 100);
            
            setTimeout(() => trail.remove(), 500);
        }, 1000);
    });
}

// Initialize trail effect after a delay
setTimeout(addSphereTrail, 3000);
