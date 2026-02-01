// skills-data.js - Skills Management System

// Default Skills Data
const defaultSkills = {
    frontend: [
        { name: 'React.js', icon: 'fab fa-react' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript (ES6+)', icon: 'fab fa-js' },
        { name: 'TypeScript', icon: 'fas fa-code' },
        { name: 'REST APIs', icon: 'fas fa-plug' },
        { name: 'Fetch API', icon: 'fas fa-download' }
    ],
    backend: [
        { name: 'Java Servlets', icon: 'fab fa-java' },
        { name: 'JDBC', icon: 'fas fa-database' },
        { name: 'Session Management', icon: 'fas fa-key' },
        { name: 'MVC Architecture', icon: 'fas fa-project-diagram' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'SQL', icon: 'fas fa-table' }
    ],
    mobile: [
        { name: 'React Native (CLI)', icon: 'fab fa-react' },
        { name: 'React Hooks', icon: 'fas fa-anchor' },
        { name: 'React Navigation', icon: 'fas fa-route' },
        { name: 'Context API', icon: 'fas fa-layer-group' },
        { name: 'AsyncStorage', icon: 'fas fa-save' },
        { name: 'FlatList', icon: 'fas fa-list' },
        { name: 'Gesture Handling', icon: 'fas fa-hand-pointer' },
        { name: 'Responsive UI Design', icon: 'fas fa-mobile-alt' }
    ],
    mlai: [
        // ML/AI skills will be added via admin panel
    ],
    tools: [
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Postman', icon: 'fas fa-paper-plane' },
        { name: 'VS Code', icon: 'fas fa-code' },
        { name: 'Apache Tomcat', icon: 'fas fa-server' },
        { name: 'Apache Ant', icon: 'fas fa-tools' },
        { name: 'Linux', icon: 'fab fa-linux' },
        { name: 'OOP', icon: 'fas fa-cube' },
        { name: 'DSA', icon: 'fas fa-project-diagram' },
        { name: 'SDLC', icon: 'fas fa-sync' },
        { name: 'Agile (Scrum)', icon: 'fas fa-users' },
        { name: 'Debugging', icon: 'fas fa-bug' },
        { name: 'Google Cloud Looker', icon: 'fab fa-google' },
        { name: 'Data Visualization', icon: 'fas fa-chart-bar' }
    ]
};

// Initialize skills in localStorage if not exists
function initializeSkills() {
    if (!localStorage.getItem('portfolioSkills')) {
        localStorage.setItem('portfolioSkills', JSON.stringify(defaultSkills));
    }
}

// Get all skills
function getSkills() {
    initializeSkills();
    return JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
}

// Add a new skill to a category
function addSkill(category, skillName, iconClass = 'fas fa-circle') {
    const skills = getSkills();
    
    if (!skills[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Check if skill already exists
    const exists = skills[category].some(skill => 
        skill.name.toLowerCase() === skillName.toLowerCase()
    );
    
    if (exists) {
        console.warn('Skill already exists:', skillName);
        return false;
    }
    
    // Add new skill
    skills[category].push({
        name: skillName,
        icon: iconClass
    });
    
    // Save to localStorage
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    return true;
}

// Delete a skill from a category
function deleteSkill(category, skillName) {
    const skills = getSkills();
    
    if (!skills[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Filter out the skill
    skills[category] = skills[category].filter(skill => 
        skill.name.toLowerCase() !== skillName.toLowerCase()
    );
    
    // Save to localStorage
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    return true;
}

// Get skills count for a category
function getSkillCount(category) {
    const skills = getSkills();
    return skills[category] ? skills[category].length : 0;
}

// Reset to default skills
function resetSkills() {
    localStorage.setItem('portfolioSkills', JSON.stringify(defaultSkills));
    return true;
}

// Export all skills as JSON
function exportSkills() {
    const skills = getSkills();
    const dataStr = JSON.stringify(skills, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-skills.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Import skills from JSON
function importSkills(jsonData) {
    try {
        const skills = JSON.parse(jsonData);
        
        // Validate structure
        if (!skills.frontend || !skills.backend || !skills.mobile || 
            !skills.mlai || !skills.tools) {
            throw new Error('Invalid skills data structure');
        }
        
        localStorage.setItem('portfolioSkills', JSON.stringify(skills));
        return true;
    } catch (error) {
        console.error('Import failed:', error);
        return false;
    }
}

// Initialize on load
initializeSkills();