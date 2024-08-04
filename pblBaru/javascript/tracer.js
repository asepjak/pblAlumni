document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tracer-study-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('Form submitted:', data);

        // Show a success message
        alert('Terima kasih! Data Anda telah berhasil dikirim.');

        // Reset the form
        form.reset();
    });
});