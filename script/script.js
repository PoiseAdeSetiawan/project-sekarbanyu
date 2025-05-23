document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const headerTitle = document.querySelector('.header_title');
    const headerSubtitle = document.querySelector('.header_subtitle');
    const registrationSection = document.querySelector('.registration');

    // Disable background scrolling when popup is shown
    document.body.style.overflow = 'hidden';

    // Typewriter effect
    function typeWriter(element, speed) {
        const html = element.innerHTML; // Save the original HTML
        element.innerHTML = ''; // Clear the element
        let i = 0;
        let isTag = false;
        let tagBuffer = '';

        function type() {
            if (i < html.length) {
                if (html[i] === '<') {
                    isTag = true;
                    tagBuffer += html[i];
                } else if (html[i] === '>') {
                    tagBuffer += html[i];
                    element.innerHTML += tagBuffer;
                    tagBuffer = '';
                    isTag = false;
                } else if (isTag) {
                    tagBuffer += html[i];
                } else {
                    element.innerHTML += html[i];
                }
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // On form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();

        if (name) {
            const html = `Hai ${name},<br>Selamat Datang di`;
            headerTitle.innerHTML = html;
            headerSubtitle.innerHTML = ""; // Hide Sekarbanyu before animation

            // Calculate delay: total time = chars * speed
            const speed = 30;
            const titleLength = headerTitle.innerHTML.replace(/<[^>]*>/g, '').length;
            const delay = titleLength * speed;

            typeWriter(headerTitle, speed);
            setTimeout(() => {
                headerSubtitle.innerHTML = "Sekarbanyu";
                typeWriter(headerSubtitle, speed);
            }, delay);

            form.reset();
            // Hide popup and enable scrolling
            registrationSection.style.display = 'none';
            document.body.style.overflow = '';

            // Always scroll to header section after popup closes
            const headerSection = document.querySelector('.header');
            headerSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            headerTitle.textContent = 'Silakan masukkan nama Anda terlebih dahulu.';
        }
    });

    // header button scroll to about section
    const headerButton = document.querySelector('.header_button');
    const aboutSection = document.querySelector('.about');

    // header button scroll to about section
    function smoothScrollTo(element, duration) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Ease function for smoothness
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    headerButton.addEventListener('click', function () {
        smoothScrollTo(aboutSection, 400);
    });

    // navigation show/hide based on header visibility
    const navigation = document.querySelector('.navigation');
    const headerSection = document.querySelector('.header');

    // Hide navigation initially
    navigation.classList.remove('show-navigation');

    let isNavigationVisible = false;
    window.addEventListener('scroll', () => {
        const rect = headerSection.getBoundingClientRect();
        const isHeaderVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isHeaderVisible) {
            if (!isNavigationVisible) {
                navigation.classList.add('show-navigation');
                isNavigationVisible = true;
            }
        } else {
            if (isNavigationVisible) {
                navigation.classList.remove('show-navigation');
                isNavigationVisible = false;
            }
        }
    });

    function toggleNavigationMenu() {
        const navigationItems = document.getElementById('navigationItems');
        navigationItems.classList.toggle('show-navigation');
    }

    document.querySelector('.navigation_menu-toggle').addEventListener('click', function () {
        toggleNavigationMenu();
    });
});