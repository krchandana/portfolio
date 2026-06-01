const typingElement = document.getElementById('typing');
const contactForm = document.getElementById('contact-form');

const typingPhrases = [
    'Python Developer',
    'AI & ML Enthusiast',
    'Web App Builder',
    'Problem Solver'
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;
    const phrase = typingPhrases[currentPhrase];
    if (isDeleting) {
        currentChar -= 1;
        typingElement.textContent = phrase.substring(0, currentChar);
        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % typingPhrases.length;
        }
    } else {
        currentChar += 1;
        typingElement.textContent = phrase.substring(0, currentChar);
        if (currentChar === phrase.length) {
            isDeleting = true;
        }
    }
    const speed = isDeleting ? 80 : 120;
    const delay = !isDeleting && currentChar === phrase.length ? 1600 : speed;
    setTimeout(typeEffect, delay);
}

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const status = document.getElementById('form-status');
        contactForm.reset();

        if (status) {
            status.textContent = 'Thank you for your message.';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});
