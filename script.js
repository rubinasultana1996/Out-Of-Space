// ========================================
// ANTI-GRAVITY PORTFOLIO
// ========================================

const logo = document.querySelector(".floating-object");
const gravityText = document.querySelector(".gravity-text");

const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");
const card3 = document.querySelector(".card-3");


// ========================================
// MOUSE
// ========================================

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


// ========================================
// LOGO PHYSICS
// ========================================

let logoX = 0;
let logoY = 0;
let logoVelocityX = 0;
let logoVelocityY = 0;


// ========================================
// SCROLL
// ========================================

let smoothScroll = window.scrollY;


// ========================================
// CURSOR REPULSION FUNCTION
// ========================================

function getRepulsion(element, strength = 80) {

    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - mouseX;
    const dy = centerY - mouseY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 300;

    let pushX = 0;
    let pushY = 0;

    if (distance < radius && distance > 0) {

        const force = 1 - distance / radius;

        pushX = (dx / distance) * force * strength;
        pushY = (dy / distance) * force * strength;
    }

    return {
        x: pushX,
        y: pushY
    };
}


// ========================================
// ANIMATION
// ========================================

function animate() {

    // ------------------------------------
    // LOGO
    // ------------------------------------

    const logoTargetX =
        (mouseX - window.innerWidth / 2) * 0.08;

    const logoTargetY =
        (mouseY - window.innerHeight / 2) * 0.08;

    logoVelocityX +=
        (logoTargetX - logoX) * 0.015;

    logoVelocityY +=
        (logoTargetY - logoY) * 0.015;

    logoVelocityX *= 0.90;
    logoVelocityY *= 0.90;

    logoX += logoVelocityX;
    logoY += logoVelocityY;

    logo.style.transform =
        `translate(${logoX}px, ${logoY}px)
         rotate(${logoVelocityX * 0.8}deg)`;


    // ------------------------------------
    // SMOOTH SCROLL
    // ------------------------------------

    smoothScroll +=
        (window.scrollY - smoothScroll) * 0.08;


    // ------------------------------------
    // ABOUT
    // ------------------------------------

    let aboutMovement =
        -(smoothScroll * 0.12);

    aboutMovement =
        Math.max(-160, aboutMovement);

    gravityText.style.transform =
        `translateY(${aboutMovement}px)`;


    // ------------------------------------
    // PROJECT PROGRESS
    // ------------------------------------

    const projectSection =
        document.querySelector(".projects-section");

    const projectTop =
        projectSection.getBoundingClientRect().top;

    const projectProgress =
        Math.max(
            0,
            Math.min(
                1,
                (window.innerHeight * 0.8 - projectTop)
                / (window.innerHeight * 0.8)
            )
        );


    // ====================================
    // CARD 1
    // UPWARD + REPULSION
    // ====================================

    const push1 = getRepulsion(card1, 100);

    const card1Y =
        -projectProgress * 140;

    card1.style.transform =
        `translate(
            ${push1.x}px,
            ${card1Y + push1.y}px
        )`;


    // ====================================
    // CARD 2
    // DIAGONAL + ROTATION + REPULSION
    // ====================================

    const push2 = getRepulsion(card2, 80);

    const card2X =
        projectProgress * 100;

    const card2Y =
        -projectProgress * 160;

    const card2Rotation =
        projectProgress * 10;

    card2.style.transform =
        `translate(
            ${card2X + push2.x}px,
            ${card2Y + push2.y}px
        )
        rotate(${card2Rotation}deg)`;


    // ====================================
    // CARD 3
    // OPPOSITE DIAGONAL + ROTATION + REPULSION
    // ====================================

    const push3 = getRepulsion(card3, 80);

    const card3X =
        -projectProgress * 120;

    const card3Y =
        -projectProgress * 100;

    const card3Rotation =
        -projectProgress * 12;

    card3.style.transform =
        `translate(
            ${card3X + push3.x}px,
            ${card3Y + push3.y}px
        )
        rotate(${card3Rotation}deg)`;


    requestAnimationFrame(animate);
}

animate();