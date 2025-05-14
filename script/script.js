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
            const speed = 40;
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
        } else {
            headerTitle.textContent = 'Silakan masukkan nama Anda terlebih dahulu.';
        }
    });
});
