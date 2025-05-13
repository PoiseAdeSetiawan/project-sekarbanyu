document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const headerTitle = document.querySelector('.header_title');

    form.addEventListener('submit', function (e) {
        console.log('Form submitted');
        e.preventDefault(); // mencegah reload
        const name = nameInput.value.trim();

        if (name) {
            headerTitle.textContent = `Halo ${name}, Selamat Datang di Sekarbanyu`;
            form.reset(); // bersihkan form setelah submit
        } else {
            headerTitle.textContent = 'Silakan masukkan nama Anda terlebih dahulu.';
        }
    });
});
