document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const instagramLink = this.getAttribute('data-instagram');
            const buttonText = this.querySelector('.button-text');
            
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                buttonText.textContent = 'Close Details';
                if (instagramLink) {
                    window.open(instagramLink, '_blank');
                }
            } else {
                buttonText.textContent = 'View Details';
            }
        });
    });
});