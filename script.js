document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GENERATE FLOATING PARTICLES (CUTE & THEMED) ---
    const particlesContainer = document.getElementById('floral-particles');
    const particleCount = 20;
    
    // Array of FontAwesome icons representing cinema, food, juice, hearts
    const floralIcons = ['fa-heart', 'fa-film', 'fa-camera-retro', 'fa-ticket', 'fa-star', 'fa-face-grin-stars', 'fa-cubes-stacked', 'fa-utensils'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const iconClass = floralIcons[Math.floor(Math.random() * floralIcons.length)];
        particle.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        
        const left = Math.random() * 100;
        const size = Math.random() * 1.5 + 1.2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        particle.style.left = `${left}%`;
        particle.style.fontSize = `${size}rem`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // --- 2. GLOBAL CLICK MAGIC SPARKLES ---
    document.addEventListener('click', (e) => {
        // Only create sparkles if it's not a heavy spam button like the tap game
        if (e.target.closest('#btn-tap-heart')) return;

        const sparkleCount = 4;
        const emojis = ['✨', '💖', '🌟', '😍', '🎉'];
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('click-sparkle');
            sparkle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = Math.random() * 60 + 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 20;

            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }
    });

    // Helper function for mini boom effects on widget interactions
    function createMiniBoom(x, y, emojis = ['💖', '✨', '😍', '🎉']) {
        for (let i = 0; i < 6; i++) {
            const floating = document.createElement('div');
            floating.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            floating.style.position = 'fixed';
            floating.style.left = `${x}px`;
            floating.style.top = `${y}px`;
            floating.style.fontSize = '1.6rem';
            floating.style.pointerEvents = 'none';
            floating.style.zIndex = '99999';
            floating.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(floating);

            setTimeout(() => {
                floating.style.transform = `translate(${(Math.random() - 0.5) * 120}px, -${Math.random() * 90 + 50}px) scale(1.5)`;
                floating.style.opacity = '0';
            }, 10);

            setTimeout(() => floating.remove(), 800);
        }
    }

    // --- 3. WIDGET: LOVE & KANGEN METER ---
    const kangenSlider = document.getElementById('kangen-slider');
    const kangenVal = document.getElementById('kangen-val');
    const kangenMsg = document.getElementById('kangen-msg');

    if (kangenSlider) {
        kangenSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            kangenVal.innerText = `${val}%`;

            if (val < 25) {
                kangenMsg.innerText = "Ih kok dikit?! Ngambek nih 🥺";
            } else if (val < 60) {
                kangenMsg.innerText = "Bolehlah, tapi kurang heboh kangennya! 😚";
            } else if (val < 90) {
                kangenMsg.innerText = "Kangen berattt! Pengen cepet ketemu! 😍🚀";
            } else {
                kangenMsg.innerText = "TUMPEH-TUMPEH KANGENNYA SAMPE MELEDAK! 💥💖🥰";
                const rect = kangenSlider.getBoundingClientRect();
                createMiniBoom(rect.left + rect.width / 2, rect.top, ['💥', '💖', '🥰', '🚀']);
            }
        });
    }

    // --- 4. WIDGET: PINKY PROMISE ---
    const btnPinky = document.getElementById('btn-pinky');
    const pinkyResult = document.getElementById('pinky-result');

    if (btnPinky && pinkyResult) {
        btnPinky.addEventListener('click', (e) => {
            btnPinky.classList.add('hidden');
            pinkyResult.classList.remove('hidden');
            createMiniBoom(e.clientX, e.clientY, ['🤞', '🔒', '💖', '✨']);
        });
    }

    // --- 5. WIDGET: MAGIC COMPLIMENT GENERATOR ---
    const btnPujian = document.getElementById('btn-pujian');
    const pujianText = document.getElementById('pujian-text');
    const pujianDisplay = document.getElementById('pujian-display');

    const pujianList = [
        "Princess Suci hari ini cantiknya ngegas banget gak ada remnya! 🏎️💨",
        "Senyum kamu manisnya ngalahin Boost Juice rasa apapun! 🥤💛",
        "Bidadari Mall SKA Pekanbaru yang bikin aku semangat sebelum KKN! 🧚‍♀️✨",
        "Kalo kecantikan itu kejahatan, kamu udah buronan internasional! 🫣💖",
        "Liat kamu bentar aja, capek mikirin magang langsung hilang seketika! 🚀",
        "Kamu tuh definisi sempurna yang bikin aku jatuh cinta setiap hari! 😘👑",
        "Dunia ini beruntung banget punya Princess secantik & segemes kamu! 💖✨"
    ];

    let pujianIndex = 0;
    if (btnPujian && pujianText) {
        btnPujian.addEventListener('click', (e) => {
            pujianIndex = (pujianIndex + 1) % pujianList.length;
            pujianText.innerText = `"${pujianList[pujianIndex]}"`;
            
            // Replay animation
            pujianDisplay.classList.remove('pujian-anim');
            void pujianDisplay.offsetWidth; // trigger reflow
            pujianDisplay.classList.add('pujian-anim');

            createMiniBoom(e.clientX, e.clientY, ['💖', '✨', '🌸', '👑']);
        });
    }

    // --- 6. WIDGET: MINI GAME TAP-TAP CINTA ---
    const btnGameStart = document.getElementById('btn-game-start');
    const gamePlayArea = document.getElementById('game-play-area');
    const btnTapHeart = document.getElementById('btn-tap-heart');
    const gameResult = document.getElementById('game-result');
    const gameTimerDisplay = document.getElementById('game-timer');
    const gameScoreDisplay = document.getElementById('game-score');
    const gameVerdictTitle = document.getElementById('game-verdict-title');
    const gameVerdictText = document.getElementById('game-verdict-text');
    const btnGameRetry = document.getElementById('btn-game-retry');

    let gameScore = 0;
    let gameTimer = 10;
    let gameInterval = null;
    let isGameRunning = false;

    if (btnGameStart) {
        btnGameStart.addEventListener('click', () => {
            btnGameStart.classList.add('hidden');
            gamePlayArea.classList.remove('hidden');
            gameResult.classList.add('hidden');
            gameScore = 0;
            gameTimer = 10;
            gameScoreDisplay.innerText = gameScore;
            gameTimerDisplay.innerText = gameTimer;
            isGameRunning = true;

            gameInterval = setInterval(() => {
                gameTimer--;
                gameTimerDisplay.innerText = gameTimer;
                if (gameTimer <= 0) {
                    clearInterval(gameInterval);
                    endGame();
                }
            }, 1000);
        });
    }

    if (btnTapHeart) {
        btnTapHeart.addEventListener('click', (e) => {
            if (!isGameRunning) return;
            gameScore++;
            gameScoreDisplay.innerText = gameScore;

            // Mini floating heart just for game tap
            const floatingHeart = document.createElement('div');
            floatingHeart.innerText = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
            floatingHeart.style.position = 'fixed';
            floatingHeart.style.left = `${e.clientX - 15 + (Math.random() - 0.5) * 30}px`;
            floatingHeart.style.top = `${e.clientY - 20}px`;
            floatingHeart.style.fontSize = '2rem';
            floatingHeart.style.pointerEvents = 'none';
            floatingHeart.style.zIndex = '99999';
            floatingHeart.style.transition = 'all 0.6s ease-out';
            document.body.appendChild(floatingHeart);

            setTimeout(() => {
                floatingHeart.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${Math.random() * 60 + 40}px) scale(1.3)`;
                floatingHeart.style.opacity = '0';
            }, 10);

            setTimeout(() => floatingHeart.remove(), 600);
        });
    }

    function endGame() {
        isGameRunning = false;
        gamePlayArea.classList.add('hidden');
        gameResult.classList.remove('hidden');

        if (gameScore < 20) {
            gameVerdictTitle.innerText = "AYOO KURANG HEBOH! 😜";
            gameVerdictText.innerText = `Kamu ngasih ${gameScore} tap cinta. Masih malu-malu nih kangennya! 🫣`;
        } else if (gameScore < 45) {
            gameVerdictTitle.innerText = "KERENN BANGET! 😍💖";
            gameVerdictText.innerText = `Wow! ${gameScore} tap cinta! Keliatan banget gak sabar pengen cepet ngedate! 🚀✨`;
        } else {
            gameVerdictTitle.innerText = "LUAR BIASAAA REKORRR! 🏆💥";
            gameVerdictText.innerText = `GILLAAA! ${gameScore} tap cinta! Cinta kamu sejati dan gak ada tandingannya! Love you sekebon! 😘👑💖`;
        }
    }

    if (btnGameRetry) {
        btnGameRetry.addEventListener('click', () => {
            gameResult.classList.add('hidden');
            btnGameStart.classList.remove('hidden');
        });
    }

    // --- 7. WIDGET: CLAW MACHINE SIMULATOR ---
    const btnClaw = document.getElementById('btn-claw');
    const clawArm = document.getElementById('claw-arm');
    const clawResult = document.getElementById('claw-result');
    const clawPrizeTitle = document.getElementById('claw-prize-title');
    const clawPrizeText = document.getElementById('claw-prize-text');
    const btnClawReset = document.getElementById('btn-claw-reset');

    const clawPrizes = [
        "Boneka Minion Super Gemes! 🍌🧸",
        "Voucher Peluk Erat 10 Menit di Living World! 🫂💖",
        "Tiket Ditraktir Boost Juice Porsi Jumbo! 🥤💛",
        "Bebas Request Gaya Terheboh di Photobooth! 📸✌️",
        "Voucher Belanja Jajanan Favorit Kamu! 🍫🍿",
        "Hak Veto Nentuin Tempat Makan Malam! 🥩🍽️"
    ];

    if (btnClaw && clawArm) {
        btnClaw.addEventListener('click', (e) => {
            btnClaw.disabled = true;
            clawArm.classList.add('dropped');

            setTimeout(() => {
                btnClaw.classList.add('hidden');
                clawResult.classList.remove('hidden');
                const randomPrize = clawPrizes[Math.floor(Math.random() * clawPrizes.length)];
                clawPrizeText.innerText = `"${randomPrize}"`;
                createMiniBoom(e.clientX, e.clientY, ['🧸', '🎁', '🎉', '✨']);
            }, 800);
        });

        btnClawReset.addEventListener('click', () => {
            clawArm.classList.remove('dropped');
            clawResult.classList.add('hidden');
            btnClaw.classList.remove('hidden');
            btnClaw.disabled = false;
        });
    }

    // --- 8. WIDGET: TANGKAP PISANG MINIONS ---
    const btnBananaStart = document.getElementById('btn-banana-start');
    const bananaPlayArea = document.getElementById('banana-play-area');
    const bananaResult = document.getElementById('banana-result');
    const bananaTimerDisplay = document.getElementById('banana-timer');
    const bananaScoreDisplay = document.getElementById('banana-score');
    const bananaVerdictTitle = document.getElementById('banana-verdict-title');
    const bananaVerdictText = document.getElementById('banana-verdict-text');
    const btnBananaRetry = document.getElementById('btn-banana-retry');
    const bananaHoles = document.querySelectorAll('.banana-hole');

    let bananaScore = 0;
    let bananaTimer = 10;
    let bananaInterval = null;
    let bananaGameInterval = null;
    let isBananaRunning = false;

    if (btnBananaStart) {
        btnBananaStart.addEventListener('click', () => {
            btnBananaStart.classList.add('hidden');
            bananaPlayArea.classList.remove('hidden');
            bananaResult.classList.add('hidden');
            bananaScore = 0;
            bananaTimer = 10;
            bananaScoreDisplay.innerText = bananaScore;
            bananaTimerDisplay.innerText = bananaTimer;
            isBananaRunning = true;

            // Timer countdown
            bananaInterval = setInterval(() => {
                bananaTimer--;
                bananaTimerDisplay.innerText = bananaTimer;
                if (bananaTimer <= 0) {
                    endBananaGame();
                }
            }, 1000);

            // Pop banana logic
            bananaGameInterval = setInterval(() => {
                if (!isBananaRunning) return;
                // clear previous
                bananaHoles.forEach(h => { h.classList.remove('has-banana'); h.innerText = ''; });
                // pick random hole
                const randomHole = bananaHoles[Math.floor(Math.random() * bananaHoles.length)];
                randomHole.classList.add('has-banana');
                randomHole.innerText = '🍌';

                setTimeout(() => {
                    if (randomHole.classList.contains('has-banana')) {
                        randomHole.classList.remove('has-banana');
                        randomHole.innerText = '';
                    }
                }, 550);
            }, 650);
        });
    }

    bananaHoles.forEach(hole => {
        hole.addEventListener('click', (e) => {
            if (!isBananaRunning) return;
            if (hole.classList.contains('has-banana')) {
                bananaScore++;
                bananaScoreDisplay.innerText = bananaScore;
                hole.classList.remove('has-banana');
                hole.innerText = '💥';
                createMiniBoom(e.clientX, e.clientY, ['🍌', '💥', '😋', '🎉']);
                setTimeout(() => { if (hole.innerText === '💥') hole.innerText = ''; }, 200);
            }
        });
    });

    function endBananaGame() {
        isBananaRunning = false;
        clearInterval(bananaInterval);
        clearInterval(bananaGameInterval);
        bananaPlayArea.classList.add('hidden');
        bananaResult.classList.remove('hidden');
        bananaHoles.forEach(h => { h.classList.remove('has-banana'); h.innerText = ''; });

        if (bananaScore < 5) {
            bananaVerdictTitle.innerText = "MINIONS MASIH LAPAR! 🥺🍌";
            bananaVerdictText.innerText = `Kamu cuma dapat ${bananaScore} pisang. Minions butuh energi lebih buat ngawal ngedate kita! 🫣`;
        } else if (bananaScore < 12) {
            bananaVerdictTitle.innerText = "MINIONS HAPPY! 😋🍌";
            bananaVerdictText.innerText = `Mantap! ${bananaScore} pisang berhasil diamankan! Minions udah siap nemenin kita nonton! 🎬🍿`;
        } else {
            bananaVerdictTitle.innerText = "KING OF BANANAS! 👑🍌🔥";
            bananaVerdictText.innerText = `KANGEN BERATTT! ${bananaScore} pisang! Minions sujud syukur punya majikan sekeren Princess Suci! 😍🚀`;
        }
    }

    if (btnBananaRetry) {
        btnBananaRetry.addEventListener('click', () => {
            bananaResult.classList.add('hidden');
            btnBananaStart.classList.remove('hidden');
        });
    }

    // --- 9. WIDGET: RACIK BOOST JUICE CINTA ---
    const ingredButtons = document.querySelectorAll('.btn-ingred');
    const blenderJar = document.getElementById('blender-jar');
    const blenderContents = document.getElementById('blender-contents');
    const btnBlend = document.getElementById('btn-blend');
    const blendResult = document.getElementById('blend-result');
    const blendDesc = document.getElementById('blend-desc');
    const btnBlendReset = document.getElementById('btn-blend-reset');

    let selectedIngreds = [];

    ingredButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const ingred = btn.getAttribute('data-ingred');
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                selectedIngreds = selectedIngreds.filter(i => i !== ingred);
            } else {
                btn.classList.add('active');
                selectedIngreds.push(ingred);
            }

            if (selectedIngreds.length === 0) {
                blenderContents.innerText = "Belum ada bahan 🥺";
            } else {
                blenderContents.innerText = selectedIngreds.join(' + ');
            }
        });
    });

    if (btnBlend && blenderJar) {
        btnBlend.addEventListener('click', (e) => {
            if (selectedIngreds.length === 0) {
                alert("Pilih minimal satu bahan cinta dulu Princess! 😘");
                return;
            }

            btnBlend.disabled = true;
            blenderJar.classList.add('blending');
            blenderContents.innerText = "🌪️ BLENDING CINTA... 🌪️";

            setTimeout(() => {
                blenderJar.classList.remove('blending');
                btnBlend.classList.add('hidden');
                blendResult.classList.remove('hidden');

                const funnyDescs = [
                    "100% Manis, 100% Nyegerin, Bikin Cantik Maksimal Sepanjang Hari! 🥤💖",
                    "Ekstra Rumus Bahagia: Sekali sruput, capek magang langsung hilang tak berbekas! ✨🍌",
                    "Potion Asmara Mall SKA: Rasanya ngalahin minuman termahal di dunia karena diracik pakai kangen! 😍🍓",
                    "Boost Juice Legendaris: Memberikan energi ngedate & main Timezone tanpa henti! 🕹️🔥"
                ];
                blendDesc.innerText = `"${funnyDescs[Math.floor(Math.random() * funnyDescs.length)]}"`;
                blenderContents.innerText = "Siap disruput! 🥤😋";
                createMiniBoom(e.clientX, e.clientY, ['🥤', '🍓', '🍌', '💖', '✨']);
            }, 1500);
        });

        btnBlendReset.addEventListener('click', () => {
            selectedIngreds = [];
            ingredButtons.forEach(b => b.classList.remove('active'));
            blenderContents.innerText = "Belum ada bahan 🥺";
            blendResult.classList.add('hidden');
            btnBlend.classList.remove('hidden');
            btnBlend.disabled = false;
        });
    }

    // --- 10. WIDGET: ROULETTE GAYA PHOTOBOOTH ---
    const btnRoulette = document.getElementById('btn-roulette');
    const rouletteScreen = document.getElementById('roulette-screen');

    const photoboothPoses = [
        "✌️ GAYA PEACE PRINCESS GEMES",
        "🐰 GAYA KELINCI CUTE MINTA PELUK",
        "🫣 HIDUNG KETEMU HIDUNG MEROBOHKAN IMAN",
        "💋 KISS PIPI SAT-SET BIKIN BAPER",
        "🫂 PELUK ERAT DARI SAMPING GAK MAU LEPAS",
        "🦖 GAYA DINOSAURUS BRUTAL TAPI SLAY",
        "👑 GAYA BOS CANTIK MALL SKA & LIVING WORLD"
    ];

    let isSpinning = false;

    if (btnRoulette && rouletteScreen) {
        btnRoulette.addEventListener('click', (e) => {
            if (isSpinning) return;
            isSpinning = true;
            btnRoulette.disabled = true;
            rouletteScreen.classList.add('spinning');

            let spinCount = 0;
            const spinInterval = setInterval(() => {
                spinCount++;
                rouletteScreen.innerText = photoboothPoses[spinCount % photoboothPoses.length];
            }, 100);

            setTimeout(() => {
                clearInterval(spinInterval);
                rouletteScreen.classList.remove('spinning');
                const finalPose = photoboothPoses[Math.floor(Math.random() * photoboothPoses.length)];
                rouletteScreen.innerText = `📸 LOCK: ${finalPose}! 🌟`;
                isSpinning = false;
                btnRoulette.disabled = false;
                createMiniBoom(e.clientX, e.clientY, ['📸', '✌️', '✨', '💖', '🎉']);
            }, 2000);
        });
    }

    // --- 11. DODGING "NO" BUTTON (Gak dulu 😝) ---
    const btnNo = document.getElementById('btn-no');
    let moveCount = 0;

    const moveNopeButton = () => {
        moveCount++;
        const gaulTexts = [
            "Yee mana cache bisa nolak 😝",
            "Boost Juice Minions menanti! 🥤🍌",
            "Timezone Living World udah nunggu 🕹️",
            "Nanti aku nangis nih di pojokan 😭",
            "Tiket SKA udah di tangan bos! 🎬",
            "Gak gass = durhaka sama ayang 🫣",
            "Awas aja kalo gak mau 😤💖",
            "Pencet GASSKUUUY buruan! 🚀"
        ];

        btnNo.innerText = gaulTexts[(moveCount - 1) % gaulTexts.length];

        const x = (Math.random() - 0.5) * 250; // -125px to 125px
        const y = (Math.random() - 0.5) * 180; // -90px to 90px

        btnNo.style.transform = `translate(${x}px, ${y}px)`;
        btnNo.style.position = 'absolute';
        btnNo.style.zIndex = '1000';
    };

    btnNo.addEventListener('mouseover', moveNopeButton);
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNopeButton();
    });

    // --- 12. GASSKUUUY (YES) BUTTON ---
    const btnYes = document.getElementById('btn-yes');
    const invitationScreen = document.getElementById('invitation-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const btnReset = document.getElementById('btn-reset');

    btnYes.addEventListener('click', () => {
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

    // --- 13. CONFETTI CELEBRATION ---
    function createConfetti() {
        const confettiCount = 45;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `-10vh`;
            confetti.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            const symbols = ['🍌', '🥤', '🕹️', '🧸', '🍿', '🎬', '📸', '💖', '🚀', '✨', '🎉', '🌟', '🔥', '💙'];
            confetti.innerText = symbols[Math.floor(Math.random() * symbols.length)];

            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            const endX = (Math.random() - 0.5) * 250;

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
