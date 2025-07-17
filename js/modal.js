// =========== MODAL FUNCTIONS ===========

// Function to open project detail page
function openProjectDetail(projectId) {
    window.open(`project-detail.html?id=${projectId}`, '_blank');
}

// Modal functions (keep for organization section)
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    document.getElementById('projectModalTitle').textContent = project.title;
    
    const content = `
        <div class="space-y-6">
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-xl image-zoom">
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-xl font-bold text-white mb-3">Project Overview</h3>
                    <p class="text-slate-300 mb-4">${project.longDescription}</p>
                    
                    <h4 class="text-lg font-semibold text-sky-400 mb-2">Duration & Role</h4>
                    <p class="text-slate-300 mb-1"><strong>Duration:</strong> ${project.duration}</p>
                    <p class="text-slate-300 mb-4"><strong>Role:</strong> ${project.role}</p>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-green-400 mb-2">Technologies Used</h4>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.map(tech => 
                            `<span class="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">${tech}</span>`
                        ).join('')}
                    </div>
                    
                    <h4 class="text-lg font-semibold text-purple-400 mb-2">Key Features</h4>
                    <ul class="text-slate-300 text-sm space-y-1 mb-4">
                        ${project.features.slice(0, 5).map(feature => 
                            `<li class="flex items-start"><span class="text-purple-400 mr-2">•</span>${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-orange-400 mb-2">Challenges & Solutions</h4>
                <p class="text-slate-300 mb-4">${project.challenges}</p>
                
                <h4 class="text-lg font-semibold text-cyan-400 mb-2">Results & Impact</h4>
                <p class="text-slate-300 mb-4">${project.results}</p>
            </div>
            
            <div class="flex gap-4">
                ${project.github ? `<a href="${project.github}" target="_blank" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>` : ''}
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                </a>` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('projectModalContent').innerHTML = content;
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openOrgModal(orgId) {
    const org = orgData[orgId];
    if (!org) return;

    document.getElementById('orgModalTitle').textContent = org.title;
    
    const content = `
        <div class="space-y-6">
            <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h3 class="text-2xl font-bold text-white mb-2">${org.title}</h3>
                        <p class="text-lg text-sky-400 font-semibold">${org.organization}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-slate-400 font-medium">${org.period}</p>
                    </div>
                </div>
                <p class="text-slate-300 leading-relaxed">${org.longDescription}</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-green-400 mb-3 flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <path d="M20 8v6M23 11l-3 3-3-3"></path>
                        </svg>
                        Key Responsibilities
                    </h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        ${org.responsibilities.map(resp => 
                            `<li class="flex items-start"><span class="text-green-400 mr-2 mt-1">•</span><span>${resp}</span></li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                        Major Achievements
                    </h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        ${org.achievements.map(achievement => 
                            `<li class="flex items-start"><span class="text-purple-400 mr-2 mt-1">★</span><span>${achievement}</span></li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        Skills Developed
                    </h4>
                    <div class="flex flex-wrap gap-2">
                        ${org.skills.map(skill => 
                            `<span class="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-orange-400 mb-3 flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                        Impact & Results
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">${org.impact}</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('orgModalContent').innerHTML = content;
    document.getElementById('orgModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});
