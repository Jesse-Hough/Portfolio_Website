$(document).ready(function(){
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev slick-arrow"><span>&lt;</span></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow"><span>&gt;</span></button>',
    });

    updateCloseButtonTheme(); // Update close button color on page load
});

// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    saveThemePreference();
    updateCloseButtonTheme(); // Update close button color on theme toggle
});

function saveThemePreference() {
    const isLightTheme = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    updateCloseButtonTheme(); // Update close button color on theme load
}


// Function to update close button theme
function updateCloseButtonTheme() {
    const closeButton = document.getElementById('close-menu');
    if (document.body.classList.contains('light-theme')) {
        closeButton.style.color = '#2D3748'; // Dark color for light theme
    } else {
        closeButton.style.color = '#E2E8F0'; // Light color for dark theme
    }
}

// Load the theme preference on page load
window.addEventListener('DOMContentLoaded', loadThemePreference);

// Slide menu functionality
document.getElementById('menu-toggle').addEventListener('click', () => {
    const slideMenu = document.getElementById('slide-menu');
    const overlay = document.getElementById('overlay');
    
    if (slideMenu.style.left === '0px') {
        slideMenu.style.left = '-250px';
        overlay.style.display = 'none';
    } else {
        slideMenu.style.left = '0px';
        overlay.style.display = 'block';
    }
});

document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('slide-menu').style.left = '-250px';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('slide-menu').style.left = '-250px';
    document.getElementById('overlay').style.display = 'none';
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_zj6gwfo', 'template_sxcphyv', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Clear the form after submission
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send the message. Please try again later.');
        });
});