// skills-data.js - Skills Management System with Firebase
// This version uses Firebase Realtime Database for cloud storage

// Default Skills Data (used for initialization)
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
    { name: 'Machine Learning', icon: 'fas fa-brain' },
    { name: 'Deep Learning', icon: 'fas fa-network-wired' },
    { name: 'Computer Vision', icon: 'fas fa-eye' }
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

// Firebase Database Reference
let database;
let skillsRef;

// Initialize Firebase connection
function initializeFirebase() {
    try {
        database = firebase.database();
        skillsRef = database.ref('skillss');
        console.log('🔥 Firebase database connected');
        return true;
    } catch (error) {
        console.error('❌ Firebase not initialized:', error);
        console.warn('⚠️ Falling back to localStorage');
        return false;
    }
}

// Check if Firebase is available
function isFirebaseAvailable() {
    return typeof firebase !== 'undefined' && database && skillsRef;
}

// Initialize skills in Firebase if not exists
async function initializeSkills() {
    if (isFirebaseAvailable()) {
        try {
            const snapshot = await skillsRef.once('value');
            if (!snapshot.exists()) {
                // No skills in Firebase, upload default skills
                await skillsRef.set(defaultSkills);
                console.log('✅ Default skills uploaded to Firebase');
            }
        } catch (error) {
            console.error('Error initializing Firebase skills:', error);
            // Fallback to localStorage
            initializeLocalStorage();
        }
    } else {
        // Fallback to localStorage
        initializeLocalStorage();
    }
}

// Fallback: Initialize localStorage
function initializeLocalStorage() {
    if (!localStorage.getItem('portfolioSkills')) {
        localStorage.setItem('portfolioSkills', JSON.stringify(defaultSkills));
        console.log('✅ Default skills saved to localStorage (fallback)');
    }
}

// Get all skills (from Firebase or localStorage)
async function getSkills() {
    if (isFirebaseAvailable()) {
        try {
            const snapshot = await skillsRef.once('value');
            const skills = snapshot.val();
            return skills || defaultSkills;
        } catch (error) {
            console.error('Error fetching from Firebase:', error);
            return getSkillsFromLocalStorage();
        }
    } else {
        return getSkillsFromLocalStorage();
    }
}

// Fallback: Get skills from localStorage
function getSkillsFromLocalStorage() {
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
}

// Get skills synchronously (for initial load - returns cached or default)
function getSkillsSync() {
    // Try localStorage first for instant display
    const cached = localStorage.getItem('portfolioSkills');
    return cached ? JSON.parse(cached) : defaultSkills;
}

// Add a new skill to a category
async function addSkill(category, skillName, iconClass = 'fas fa-circle') {
    const skills = await getSkills();
    
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
    
    // Save to Firebase and localStorage
    return await saveSkills(skills);
}

// Delete a skill from a category
async function deleteSkill(category, skillName) {
    const skills = await getSkills();
    
    if (!skills[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Filter out the skill
    skills[category] = skills[category].filter(skill => 
        skill.name.toLowerCase() !== skillName.toLowerCase()
    );
    
    // Save to Firebase and localStorage
    return await saveSkills(skills);
}

// Save skills to Firebase and localStorage
async function saveSkills(skills) {
    let firebaseSuccess = false;
    let localStorageSuccess = false;
    
    // Try Firebase first
    if (isFirebaseAvailable()) {
        try {
            await skillsRef.set(skills);
            firebaseSuccess = true;
            console.log('✅ Skills saved to Firebase');
        } catch (error) {
            console.error('❌ Firebase save failed:', error);
        }
    }
    
    // Also save to localStorage as backup/cache
    try {
        localStorage.setItem('portfolioSkills', JSON.stringify(skills));
        localStorageSuccess = true;
        console.log('✅ Skills cached in localStorage');
    } catch (error) {
        console.error('❌ localStorage save failed:', error);
    }
    
    return firebaseSuccess || localStorageSuccess;
}

// Get skills count for a category
async function getSkillCount(category) {
    const skills = await getSkills();
    return skills[category] ? skills[category].length : 0;
}

// Reset to default skills
async function resetSkills() {
    return await saveSkills(defaultSkills);
}

// Export all skills as JSON
async function exportSkills() {
    const skills = await getSkills();
    const dataStr = JSON.stringify(skills, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-skills-backup.json';
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('📥 Skills exported successfully');
}

// Import skills from JSON
async function importSkills(jsonData) {
    try {
        const skills = JSON.parse(jsonData);
        
        // Validate structure
        if (!skills.frontend || !skills.backend || !skills.mobile || 
            !skills.mlai || !skills.tools) {
            throw new Error('Invalid skills data structure');
        }
        
        await saveSkills(skills);
        console.log('📤 Skills imported successfully');
        return true;
    } catch (error) {
        console.error('Import failed:', error);
        return false;
    }
}

// Listen for real-time updates from Firebase
function listenForSkillUpdates(callback) {
    if (isFirebaseAvailable()) {
        skillsRef.on('value', (snapshot) => {
            const skills = snapshot.val();
            if (skills) {
                // Update localStorage cache
                localStorage.setItem('portfolioSkills', JSON.stringify(skills));
                // Call callback with updated skills
                if (callback) callback(skills);
                console.log('🔄 Skills updated from Firebase');
            }
        });
    }
}

// Stop listening for updates
function stopListeningForUpdates() {
    if (isFirebaseAvailable()) {
        skillsRef.off();
    }
}

// Sync localStorage to Firebase (useful for migration)
async function syncLocalStorageToFirebase() {
    if (!isFirebaseAvailable()) {
        console.warn('Firebase not available');
        return false;
    }
    
    const localSkills = getSkillsFromLocalStorage();
    try {
        await skillsRef.set(localSkills);
        console.log('✅ localStorage synced to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Sync failed:', error);
        return false;
    }
}

// Initialize on load
(async function init() {
    // Initialize Firebase connection
    const firebaseReady = initializeFirebase();
    
    if (firebaseReady) {
        console.log('🔥 Using Firebase for skills storage');
        await initializeSkills();
    } else {
        console.log('💾 Using localStorage for skills storage (offline mode)');
        initializeLocalStorage();
    }
})();

