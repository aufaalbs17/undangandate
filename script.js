document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GENERATE FLOATING FLORAL PARTICLES ---
    const particlesContainer = document.getElementById('floral-particles');
    const particleCount = 15;
    
    // Array of FontAwesome icons representing flowers/leaves
    const floralIcons = ['fa-leaf', 'fa-seedling', 'fa-clover', 'fa-fan', 'fa-feather'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const iconClass = floralIcons[Math.floor(Math.random() * floralIcons.length)];
        particle.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        
        const left = Math.random() * 100;
        const size = Math.random() * 1.5 + 1;
        const duration = Math.random() * 10 + 12;
        const delay = Math.random() * 10;

        particle.style.left = `${left}%`;
        particle.style.fontSize = `${size}rem`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // --- 2. INTERACTIVE SELECT CARDS ---
    const selectCards = document.querySelectorAll('.select-card');
    let selectedPlace = 'Baliga House';

    selectCards.forEach(card => {
        card.addEventListener('click', () => {
            selectCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedPlace = card.getAttribute('data-place');
        });
    });

    // --- 3. DODGING "NO" BUTTON (Gak dulu 😝) ---
    const btnNo = document.getElementById('btn-no');
    let moveCount = 0;

    const moveNopeButton = () => {
        moveCount++;
        const gaulTexts = [
            "Yee mana bisa nolak 😝",
            "Harus gass Princess! 😘👑",
            "Tombol ini rusak wkwk 🫣",
            "Pencet sebelah buru! 🚀",
            "Gak nerima penolakan! 💖",
            "Ayo dong kangen nih 🥺"
        ];

        btnNo.innerText = gaulTexts[(moveCount - 1) % gaulTexts.length];

        const x = (Math.random() - 0.5) * 220; // -110px to 110px
        const y = (Math.random() - 0.5) * 160; // -80px to 80px

        btnNo.style.transform = `translate(${x}px, ${y}px)`;
        btnNo.style.position = 'absolute';
        btnNo.style.zIndex = '1000';
    };

    btnNo.addEventListener('mouseover', moveNopeButton);
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNopeButton();
    });

    // --- 4. GASSKUUUY (YES) BUTTON ---
    const btnYes = document.getElementById('btn-yes');
    const invitationScreen = document.getElementById('invitation-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const finalPlace = document.getElementById('final-place');
    const btnReset = document.getElementById('btn-reset');

    btnYes.addEventListener('click', () => {
        finalPlace.innerText = selectedPlace;

        invitationScreen.classList.remove('active-screen');
        invitationScreen.classList.add('hidden-screen');

        celebrationScreen.classList.remove('hidden-screen');
        celebrationScreen.classList.add('active-screen');

        createConfetti();
    });

    btnReset.addEventListener('click', () => {
        celebrationScreen.classList.remove('active-screen');
        celebrationScreen.classList.add('hidden-screen');

        invitationScreen.classList.remove('hidden-screen');
        invitationScreen.classList.add('active-screen');

        btnNo.style.transform = 'none';
        btnNo.style.position = 'relative';
        btnNo.innerText = 'Gak dulu 😝';
        moveCount = 0;
    });

    // --- 5. CONFETTI CELEBRATION ---
    function createConfetti() {
        const confettiCount = 35;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `-10vh`;
            confetti.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            const symbols = ['💖', '🚀', '✨', '🎉', '💙', '🌸', '🔥'];
            confetti.innerText = symbols[Math.floor(Math.random() * symbols.length)];

            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            const endX = (Math.random() - 0.5) * 200;

            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${endX}px, 110vh) rotate(360deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
});
