// CONFIGURATION
const phoneNumber = "91868162303"; // REPLACEME with your number
const finalMessage = "Okay fine, I forgive you. Yes, I'll be your girlfriend again! 💖";

// ELEMENTS
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const heartContainer = document.getElementById('heartContainer');

// --- GENERATE SVG HEARTS ---
// This ensures they look perfect and not blocky
function createHearts() {
    const heartSVG = `<svg class="heart-svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red"/></svg>`;

    for (let i = 0; i < 15; i++) { // Heart frequency
        const div = document.createElement('div');
        div.innerHTML = heartSVG;
        const svg = div.firstElementChild;
        
        // Randomize
        svg.style.left = Math.random() * 100 + "%";
        svg.style.bottom = "-100px";
        svg.style.width = (Math.random() * 30 + 20) + "px"; // 20-50px size
        svg.style.opacity = Math.random() * 0.5 + 0.5;
        svg.style.animationDuration = (Math.random() * 3 + 5) + "s";
        
        heartContainer.appendChild(svg);
    }
}
createHearts(); // Run immediately

// --- NO BUTTON LOGIC ---
let noCount = 0;
let yesScale = 1;
const noTexts = ["Are you sure? 😢", "Think again 😌", "Itna bhi kya gussa? 🥺", "Ek aur chance? 🙏", "Don't do this 💔","Please baby"];

function dodgeButton() {
    noCount++;
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;

    if (noCount < 9) {
        // Change text
        noBtn.innerText = noTexts[noCount % noTexts.length];
        
        // 1. Switch to Fixed Position (if not already)
        noBtn.style.position = 'fixed'; 
        
        // 2. Generate Random Coords with padding to keep button visible
        const padding = 100; // Keep button 100px away from edges
        const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);
        const x = Math.random() * (maxX - padding) + padding;
        const y = Math.random() * (maxY - padding) + padding;

        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    } else {
        // GIVE UP
        noBtn.innerText = "Ab to button band, non-yconsenual haan karo";
        noBtn.style.pointerEvents = 'none';
        noBtn.style.transform = 'scale(0.8)';
        noBtn.style.background = '#ccc';
        noBtn.style.color = '#fff';
    }
}

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
});

// --- YES BUTTON LOGIC ---
function acceptValentine() {
    confetti(); // Pop confetti
    
    // Switch pages
    page1.style.display = 'none';
    page2.classList.remove('hidden');

    // Show scroll arrow after 1.5s
    setTimeout(() => {
        gsap.to("#scrollArrow", { opacity: 1, duration: 1 });
    }, 1500);

    // Init Scroll Animations
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1.5 });
    
    gsap.utils.toArray('.polaroid').forEach((card, i) => {
        gsap.fromTo(card, 
            { opacity: 0, x: i % 2 === 0 ? -100 : 100, rotation: 0 }, 
            { 
                opacity: 1, x: 0, rotation: i % 2 === 0 ? -5 : 5, 
                duration: 1, scrollTrigger: { trigger: card, start: "top 80%" } 
            }
        );
    });

    gsap.from(".glass-card", {
        scale: 0.8, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".final-proposal", start: "top 70%" }
    });
}

function sendWhatsApp() {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}