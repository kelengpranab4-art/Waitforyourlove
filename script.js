// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const successPage = document.getElementById('successPage');

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

// Function to move the No button to a random position
function moveNoButton() {
    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate maximum positions to keep button within viewport
    const maxX = window.innerWidth - btnRect.width - 40;
    const maxY = window.innerHeight - btnRect.height - 40;
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Change button text
    noClickCount++;
    if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
    }
    
    // Increase Yes button size
    yesBtnScale += 0.15;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';
}

// Function to create confetti
function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff4d6d', '#ff758f', '#ffd6e0', '#ffb3c1', '#ff8fa3', '#c9184a'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }
    
    // Animate confetti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            ctx.restore();
            
            // Update position
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            
            // Reset if out of bounds
            if (piece.y > canvas.height) {
                piece.y = -20;
                piece.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
}

// Event Listeners
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// For mobile touch
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    // Hide main card
    mainCard.style.display = 'none';
    
    // Show success page
    successPage.classList.add('active');
    
    // Create confetti animation
    createConfetti();
    
    // Play a little celebration animation
    setTimeout(() => {
        const successTitle = document.querySelector('.success-title');
        successTitle.style.animation = 'bounce 0.5s ease infinite';
    }, 100);
});

// Prevent No button from being clicked easily on mobile
noBtn.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

// Handle window resize for confetti
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (successPage.classList.contains('active')) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
