// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        const region = document.querySelector('.region-select')?.value || '';
        
        if (query) {
            console.log('Axtarış:', query, 'Bölgə:', region);
            // Here you would typically filter the ads or make an API call
            alert(`"${query}" üçün axtarış edilir...`);
        } else {
            alert('Axtarış üçün açar söz daxil edin.');
        }
    }

    // Category selection
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get category name
            const categoryName = this.querySelector('span').textContent;
            console.log('Seçilən kateqoriya:', categoryName);
            
            // Filter ads by category (in a real app, this would make an API call)
            filterAdsByCategory(categoryName);
        });
    });

    function filterAdsByCategory(category) {
        // This is a placeholder for category filtering
        // In a real application, you would filter the ads or make an API request
        console.log(`${category} kateqoriyası üzrə filtrlənir...`);
        
        // Show loading state
        const adsGrid = document.querySelector('.ads-grid');
        if (adsGrid) {
            // Add a subtle loading effect
            adsGrid.style.opacity = '0.6';
            setTimeout(() => {
                adsGrid.style.opacity = '1';
            }, 500);
        }
    }

    // Favorite functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering ad click
            
            const icon = this.querySelector('i');
            const isLiked = icon.classList.contains('fas');
            
            if (isLiked) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = 'rgba(255,255,255,0.9)';
                this.style.color = '#333';
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#ff6b35';
                this.style.color = 'white';
            }
            
            // Save to localStorage
            saveFavoriteStatus(this);
        });
    });

    function saveFavoriteStatus(button) {
        // Get ad ID (in a real app, this would be from data attributes)
        const adCard = button.closest('.ad-card');
        const adTitle = adCard.querySelector('.ad-title').textContent;
        
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = button.querySelector('i').classList.contains('fas');
        
        if (isFavorite && !favorites.includes(adTitle)) {
            favorites.push(adTitle);
        } else if (!isFavorite) {
            favorites = favorites.filter(fav => fav !== adTitle);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Load favorite status from localStorage
    function loadFavoriteStatus() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        document.querySelectorAll('.ad-card').forEach(card => {
            const title = card.querySelector('.ad-title').textContent;
            const favoriteBtn = card.querySelector('.favorite-btn');
            const icon = favoriteBtn.querySelector('i');
            
            if (favorites.includes(title)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                favoriteBtn.style.background = '#ff6b35';
                favoriteBtn.style.color = 'white';
            }
        });
    }

    // Load favorites on page load
    loadFavoriteStatus();

    // Ad card click functionality
    const adCards = document.querySelectorAll('.ad-card');
    adCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on favorite button
            if (e.target.closest('.favorite-btn')) {
                return;
            }
            
            const title = this.querySelector('.ad-title').textContent;
            console.log('Elan açılır:', title);
            
            // In a real app, this would navigate to ad details page
            alert(`${title} elanının təfərrüatlarına keçid...`);
        });
    });

    // Load more ads functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yüklənir...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                loadMoreAds();
                this.innerHTML = 'Daha çox göstər';
                this.disabled = false;
            }, 1500);
        });
    }

    function loadMoreAds() {
        // This would typically make an API call to get more ads
        console.log('Daha çox elan yüklənir...');
        
        // For demo purposes, we'll just show a message
        alert('Bütün elanlar göstərildi.');
    }

    // Language toggle functionality
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        const spans = languageToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.addEventListener('click', function() {
                spans.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                const selectedLang = this.textContent;
                console.log('Seçilən dil:', selectedLang);
                
                // In a real app, this would change the interface language
                if (selectedLang === 'Azerbaijani') {
                    // Change to Azerbaijani
                    alert('Dil Azərbaycan dilinə dəyişdirildi');
                } else {
                    // Change to English
                    alert('Language changed to English');
                }
            });
        });
    }

    // Region selection functionality
    const regionSelect = document.querySelector('.region-select');
    if (regionSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            console.log('Seçilən bölgə:', selectedRegion);
            
            // Filter ads by region
            filterAdsByRegion(selectedRegion);
        });
    }

    function filterAdsByRegion(region) {
        console.log(`${region} bölgəsi üzrə filtrlənir...`);
        
        // Add visual feedback
        const adsGrid = document.querySelector('.ads-grid');
        if (adsGrid) {
            adsGrid.style.opacity = '0.6';
            setTimeout(() => {
                adsGrid.style.opacity = '1';
            }, 500);
        }
    }

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255,107,53,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects for better UX
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(255,107,53,0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(255,107,53,0.3)';
    });

    // Add search suggestions (placeholder)
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 2) {
                // In a real app, this would show search suggestions
                console.log('Axtarış təklifləri:', query);
            }
        });
    }

    console.log('tap.az səhifəsi yükləndi');
});