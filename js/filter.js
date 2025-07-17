// =========== FILTER FUNCTIONS ===========

// Function to filter projects by skill
function filterProjectsBySkill(category) {
    // Scroll to projects section
    document.getElementById('projects').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Wait for scroll to complete, then filter
    setTimeout(() => {
        filterProjects(category);
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
    }, 800);
}

// Main filter function
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategories = card.dataset.category.split(' ');
        
        // Show all projects if 'all' is selected
        if (category === 'all') {
            card.style.display = 'block';
            card.classList.remove('filtered-out');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }
        // Show projects that match the selected category
        else if (cardCategories.includes(category)) {
            card.style.display = 'block';
            card.classList.remove('filtered-out');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }
        // Hide projects that don't match
        else {
            card.classList.add('filtered-out');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Advanced filtering with animations
function initializeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Add loading effect
            button.classList.add('loading');
            setTimeout(() => {
                button.classList.remove('loading');
            }, 500);
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const cardCategories = card.dataset.category.split(' ');
                const shouldShow = filterValue === 'all' || cardCategories.includes(filterValue);
                
                // Stagger animations
                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.classList.remove('filtered-out');
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    } else {
                        card.classList.add('filtered-out');
                        card.style.animation = `fadeOut 0.3s ease forwards`;
                        setTimeout(() => {
                            if (card.classList.contains('filtered-out')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }, index * 100);
            });
        });
    });
}

// Search functionality (bonus feature)
function initializeSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matchesSearch = 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                technologies.some(tech => tech.includes(searchTerm));
            
            if (matchesSearch) {
                card.style.display = 'block';
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
                setTimeout(() => {
                    if (card.classList.contains('filtered-out')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Show "no results" message if needed
        const visibleCards = document.querySelectorAll('.project-card:not(.filtered-out)');
        const noResultsMsg = document.getElementById('noResults');
        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCards.length === 0 ? 'block' : 'none';
        }
    });
}

// Tag filtering for skills
function filterByTag(tag) {
    const normalizedTag = tag.toLowerCase();
    const mapping = {
        'laravel': 'web',
        'php': 'web',
        'mysql': 'web',
        'javascript': 'web',
        'react': 'web',
        'nextjs': 'web',
        'tailwind': 'web',
        'nodejs': 'web',
        'express': 'web',
        'python': 'ml',
        'tensorflow': 'ml',
        'opencv': 'ml',
        'scikit-learn': 'ml',
        'flask': 'ml',
        'flutter': 'mobile',
        'dart': 'mobile',
        'react-native': 'mobile',
        'firebase': 'firebase',
        'iot': 'iot'
    };
    
    const category = mapping[normalizedTag] || 'all';
    filterProjectsBySkill(category);
}

// Keyboard shortcuts for filtering
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    filterProjectsBySkill('all');
                    break;
                case '2':
                    e.preventDefault();
                    filterProjectsBySkill('web');
                    break;
                case '3':
                    e.preventDefault();
                    filterProjectsBySkill('ml');
                    break;
                case '4':
                    e.preventDefault();
                    filterProjectsBySkill('mobile');
                    break;
                case '5':
                    e.preventDefault();
                    filterProjectsBySkill('iot');
                    break;
            }
        }
    });
}

// Filter state management
const FilterState = {
    current: 'all',
    history: ['all'],
    
    set(filter) {
        if (this.current !== filter) {
            this.history.push(this.current);
            this.current = filter;
        }
    },
    
    getPrevious() {
        return this.history[this.history.length - 1] || 'all';
    },
    
    goBack() {
        if (this.history.length > 0) {
            this.current = this.history.pop();
            return this.current;
        }
        return 'all';
    }
};

// Export functions for use in other files
if (typeof window !== 'undefined') {
    window.filterProjectsBySkill = filterProjectsBySkill;
    window.filterProjects = filterProjects;
    window.filterByTag = filterByTag;
    window.FilterState = FilterState;
}
