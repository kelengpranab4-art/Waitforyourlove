// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const successPage = document.getElementById('successPage');
const floatingContainer = document.getElementById('floatingElements');

// No button messages that cycle through
const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 💭",
    "Please? 🙏",
    "I'll be sad... 😔",
    "One more chance? 💔",
    "Pretty please? 🥹"
];

let noClickCount = 0;
let yesBtnScale = 1;

// Background Heart Floating Logic
function createFloatingHearts() {
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '✨'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.setProperty('--x', Math.random() * 100 + '%');
        heart.style.setProperty('--d', (Math.random() * 10 + 5) + 's');
        heart.style.animationDelay = Math.random() * 10 + 's';
        floatingContainer.appendChild(heart);
    }
}

createFloatingHearts();

// Function to move the No button to a random position
function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum positions to keep button within viewport
    // Add margin for navbar (approx 80px) and safety padding
    const navbarHeight = 80;
    const padding = 20;

    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;

    // Generate random position, ensuring it doesn't overlap with navbar area at the top
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(navbarHeight + padding, Math.random() * maxY);

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';

    // Change button text
    noClickCount++;
    if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
    }

    // Increase Yes button size
    yesBtnScale += 0.2;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
}

// Improved Confetti logic
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#ff2d55', '#ff4d6d', '#ff8fa3', '#ffffff', '#9333ea'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.font = `${p.size * 2}px serif`;
            ctx.fillText(Math.random() > 0.5 ? '❤️' : '✨', 0, 0);
            ctx.restore();

            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Event Listeners
if (noBtn) {
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        mainCard.style.opacity = '0';
        mainCard.style.transform = 'translateY(-100px) rotateX(20deg)';
        setTimeout(() => {
            mainCard.style.display = 'none';
            successPage.classList.add('active');
            startConfetti();
        }, 600);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
