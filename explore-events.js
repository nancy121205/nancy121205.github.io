// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true
    });

    // Get all filter chips and event cards
    const filterChips = document.querySelectorAll('.filter-chip');
    const eventCards = document.querySelectorAll('.event-card');

    // Add click handlers for filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state of chips
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Get selected category
            const selectedCategory = chip.textContent.trim();

            // Filter events
            eventCards.forEach(card => {
                const cardCategory = card.querySelector('.badge').textContent.trim();
                
                if (selectedCategory === 'All Events') {
                    // Show all cards with a fade effect
                    card.style.opacity = '0';
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else if (cardCategory === selectedCategory) {
                    // Show matching cards with a fade effect
                    card.style.opacity = '0';
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.style.display = 'none';
                }
            });

            // Adjust the parent container layout
            const eventGrid = document.querySelector('.row.g-4');
            eventGrid.style.opacity = '0';
            setTimeout(() => {
                eventGrid.style.opacity = '1';
            }, 100);
        });
    });

    // Add search functionality
    const searchInput = document.querySelector('input[placeholder="Search events..."]');
    const searchButton = searchInput.nextElementSibling;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        eventCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add date filter functionality
    const dateInput = document.querySelector('input[type="date"]');
    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);
        
        eventCards.forEach(card => {
            const eventDate = card.querySelector('.bi-calendar3').parentElement.textContent.trim();
            const eventDateTime = new Date(eventDate.split('calendar3')[1]);
            
            if (dateInput.value === '' || 
                eventDateTime.toDateString() === selectedDate.toDateString()) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add club filter functionality
    const clubSelect = document.querySelector('.form-select');
    clubSelect.addEventListener('change', () => {
        const selectedClub = clubSelect.value;
        
        if (selectedClub === 'All Clubs') {
            eventCards.forEach(card => card.style.display = 'block');
        } else {
            eventCards.forEach(card => {
                // You can add data-club attribute to cards or check other ways to match clubs
                const cardClub = card.dataset.club; // Add this attribute to your HTML
                if (cardClub === selectedClub) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
});