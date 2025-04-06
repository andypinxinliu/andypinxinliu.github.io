// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to apply theme
    function applyTheme(theme) {
        // Set the data-theme attribute on the html element
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Also add/remove the dark-mode class on the body element for backwards compatibility
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Save the theme preference
        localStorage.setItem('theme', theme);
        console.log('Theme applied:', theme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Set default theme if none is saved
        applyTheme('light');
    }
    
    // Find all theme toggles on the page
    const themeToggles = document.querySelectorAll('#themeToggle');
    
    // Add event listeners to all theme toggles
    themeToggles.forEach(function(themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });
    
    if (themeToggles.length === 0) {
        console.error('Theme toggle elements not found');
    }
});

// Apply theme immediately when the script loads (before DOMContentLoaded)
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
})(); 