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
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const status = document.getElementById('form-status');
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitButton = contactForm.querySelector('button[type="submit"]');

        if (status) {
            status.textContent = 'Sending your message...';
        }
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch('https://formsubmit.co/ajax/krchandana2004@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: `Portfolio contact from ${name}`,
                    _captcha: false
                })
            });

            if (!response.ok) {
                throw new Error('Message could not be sent');
            }

            contactForm.reset();
            if (status) {
                status.textContent = 'Message sent successfully. Thank you!';
            }
        } catch (error) {
            if (status) {
                status.textContent = 'Unable to send right now. Please email me directly at krchandana2004@gmail.com.';
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});
