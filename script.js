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
        const email = document.getElementById('email').value.trim();
        const replyTo = document.getElementById('replyto');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        if (replyTo) {
            replyTo.value = email;
        }
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        if (status) {
            status.textContent = 'Sending your message...';
        }

        contactForm.submit();

        setTimeout(() => {
            contactForm.reset();
            if (status) {
                status.textContent = 'Message sent successfully. Thank you!';
            }
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }, 1200);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});
