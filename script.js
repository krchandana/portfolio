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
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=krchandana2004@gmail.com&su=${subject}&body=${body}`;

        window.open(gmailUrl, '_blank');

        if (status) {
            status.textContent = 'Gmail is opening. Please press Send there.';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});
