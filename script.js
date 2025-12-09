/* --- CONFIGURATION --- */
const music = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

// Register GSAP Plugin
gsap.registerPlugin(TextPlugin);

/* --- MUSIC CONTROL --- */
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.innerHTML = "🔇";
        isPlaying = false;
    } else {
        music.play();
        musicIcon.innerHTML = "🎵";
        isPlaying = true;
    }
}

/* --- NAVIGATION --- */
function startJourney() {
    // Attempt to play music on first interaction
    toggleMusic();
    
    // Animate out Screen 0
    gsap.to("#screen-start", {duration: 0.5, opacity: 0, onComplete: () => {
        document.getElementById("screen-start").classList.add("hidden");
        document.getElementById("screen-start").classList.remove("active");
        
        // Show Screen 1
        showScreen("screen-2014");
        
        // Start Typing Animation for 2014
        typeWriter("#typewriter-2014", "I was a rowdy boy back then. Sleeves up, buttons undone, acting tough. But honestly? I was scared. \n\nThen I had that fever... everyone ignored me, but you gave me your book. You didn't even look at me, but I fell for you right then. ❤️");
    }});
}

function nextSlide(targetId) {
    // Fade out current active screen
    const current = document.querySelector(".screen.active");
    gsap.to(current, {duration: 0.5, opacity: 0, onComplete: () => {
        current.classList.add("hidden");
        current.classList.remove("active");
        
        // Show next screen
        showScreen(targetId);
        
        // Specific Logic per Screen
        if(targetId === "screen-2025") {
            typeWriter("#typewriter-2025", "July 23, 2025. Mira Road.\n\nI saw you walking. Those cat goggles! 🕶️\n\nYou handed me your phone to tie your hair, and time stopped. You asked: 'We didn't meet in school, right?'\n\nLittle did you know, I was falling all over again.");
        }
    }});
}

function showScreen(id) {
    const screen = document.getElementById(id);
    screen.classList.remove("hidden");
    
    // Animate Entry (Slide Up and Fade In)
    gsap.fromTo(screen, 
        {opacity: 0, y: 50}, 
        {duration: 0.8, opacity: 1, y: 0, onStart: () => {
            screen.classList.add("active");
        }}
    );
}

/* --- TYPEWRITER EFFECT --- */
function typeWriter(elementId, text) {
    gsap.to(elementId, {
        duration: text.length * 0.05, // Speed depends on length
        text: text,
        ease: "none"
    });
}

/* --- TRICKY NO BUTTON --- */
const noBtn = document.getElementById("no-btn");
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", moveButton);

function moveButton() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    
    // Use GSAP for smooth movement
    gsap.to(noBtn, {
        duration: 0.2,
        x: x - noBtn.offsetLeft, // Calculate relative offset
        y: y - noBtn.offsetTop,
        ease: "power2.out"
    });
}

/* --- YES FUNCTION --- */
function sheSaidYes() {
    createConfetti();
    nextSlide('screen-plan');
}

/* --- FINALE (MOON) --- */
function showFinale() {
    nextSlide('screen-moon');
    // Change background smoothly to dark
    gsap.to("body", {duration: 2, background: "#090a0f"});
}

/* --- SIMPLE CONFETTI --- */
function createConfetti() {
    for(let i=0; i<50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = ["#ff4d6d", "#fff", "#ffd700"][Math.floor(Math.random()*3)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.zIndex = "100";
        document.body.appendChild(confetti);

        gsap.to(confetti, {
            duration: Math.random() * 2 + 1,
            y: window.innerHeight + 20,
            rotation: 360,
            onComplete: () => confetti.remove()
        });
    }
}

/* --- SIDEBAR LOGIC --- */

// The Full Stories
const stories = {
    '2014': `
        <h3>The 7th Grade Story</h3>
        <p>I was in 7th standard when I first met you. I was a "rowdy boy"—shirt sleeves rolled up, two buttons undone, tie hanging low. I tried to look scary and cool, but in reality, I was afraid of people, especially girls!</p>
        <p>That day, I had a fever (I didn't know I was about to have jaundice for 3 months). My teacher caught me and started making a fool of me. My friends Fardin was suspended, Nikhil was absent, and Shubham stayed quiet.</p>
        <p>Everyone was laughing at my clothes, and I didn't have my book. I was standing there, tears filling my eyes, feeling completely alone. <b>But then you appeared.</b></p>
        <p>You came from the last row and gave me your book. You didn't even look at me. You were so cute, and I remember thinking: <i>"She didn't even look at my eyes."</i> I fell in love with you right then.</p>
        <p>I even tried to switch to Green House just to be near you! I went to your table with the transfer card, acting all tough, but Fardin pulled me away saying, "She is afraid of you, see?" So I backed off... just watching you from behind was enough for me.</p>
    `,
    '2025': `
        <h3>The Reunion (2025)</h3>
        <p>Fast forward to July 23, 2025. We had been texting, and I told you I was in Mira Road. Luck was on our side.</p>
        <p>Then I saw you walking towards me. <b>Damn.</b> I fell in love with you once more. My heart started beating so fast after seeing you again. You looked even more beautiful as you came closer.</p>
        <p><b>Those cat goggles! 🕶️</b> I can't even tell you how cute you looked. You handed me your phone to hold while you tied your hair... and suddenly, time stopped for me.</p>
        <p>You looked at me and said, <i>"We didn't meet in school, right?"</i></p>
        <p>How could I say that I had loved you since that day in 7th grade? But life works in mysterious ways. Here I am, dating you, and asking you for our first date. ❤️</p>
    `
};

function openStory(year) {
    const sidebar = document.getElementById('story-sidebar');
    const content = document.getElementById('sidebar-content');
    
    // Inject the specific story
    content.innerHTML = stories[year];
    
    // Slide it in
    sidebar.classList.add('open');
}

function closeSidebar() {
    const sidebar = document.getElementById('story-sidebar');
    sidebar.classList.remove('open');
}