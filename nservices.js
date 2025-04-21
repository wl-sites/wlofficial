const burgerMenu = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

burgerMenu.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
});

function closeMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.addEventListener('click', closeMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

const sections = document.querySelectorAll('#section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSection(entry.target);
            // Suppression de la ligne suivante :
            // observer.unobserve(entry.target); 
        } else {
            // Réinitialiser l'animation quand la section n'est plus visible
            resetAnimation(entry.target);
        }
    });
});

function animateSection(section) {
    let opacity = 0;
    let translateY = 50;
    const duration = 800;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            opacity = progress;
            translateY = 50 * (1 - progress);
            section.style.opacity = opacity;
            section.style.transform = `translateY(${translateY}px)`;
            requestAnimationFrame(step);
        } else {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    }

    requestAnimationFrame(step);
}

function resetAnimation(section) {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
}

sections.forEach(section => {
    resetAnimation(section); // Réinitialiser l'animation au chargement de la page
    observer.observe(section);
});
