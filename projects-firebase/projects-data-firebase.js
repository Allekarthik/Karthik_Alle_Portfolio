// projects-data-firebase.js - Projects Management System with Firebase
// This version uses Firebase Realtime Database for cloud storage

// Default Projects Data (pre-loaded with user's projects)
const defaultProjects = {
    web: [
        {
            title: "Ecommerce Seller Dashboard",
            duration: "Nov 2025 - Dec 2025",
            description: "Full-stack web application for sellers to manage products and inventory with secure authentication and MySQL database integration.",
            highlights: [
                "Built backend APIs using Java Servlets for CRUD operations",
                "Implemented secure login and session management",
                "Connected MySQL database using JDBC",
                "Designed responsive dashboard UI with HTML, CSS, JavaScript",
                "Deployed on Apache Tomcat using WAR files"
            ],
            technologies: ["Java", "Servlets", "MySQL", "JavaScript", "HTML5", "CSS3", "Tomcat", "JDBC"],
            github: "https://github.com/Allekarthik/Ecommerce-Seller-Dashboard",
            category: "web",
            featured: false
        },
        {
            title: "E-Mart – E-Commerce Web Application",
            duration: "Apr 2023 - May 2023",
            description: "Fully responsive e-commerce platform built with React 19 and Vite, featuring category-based browsing and shopping cart functionality.",
            highlights: [
                "Built with React 19 and Vite for optimal performance",
                "Implemented category-based product browsing",
                "Designed shopping cart using React Context API",
                "Used React Router for client-side navigation",
                "Followed component-based architecture"
            ],
            technologies: ["React.js", "Vite", "React Router", "Context API", "HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/Allekarthik/emart",
            category: "web",
            featured: false
        },
        {
            title: "Performance Monitoring Tool (PMT)",
            duration: "Feb 2025 - Apr 2025",
            description: "Migrated PHP-based monitoring tool to React with Looker integration for data visualization and analytics.",
            highlights: [
                "Migrated from PHP to React full-stack architecture",
                "Designed responsive UI components",
                "Integrated Looker (Google Cloud) for dashboards",
                "Created custom charts and visualizations",
                "Connected to backend data sources"
            ],
            technologies: ["React.js", "Looker", "Data Visualization", "HTML5", "Testing"],
            company: "Yahoo",
            category: "web",
            featured: false
        },
        {
            title: "Portfolio Website",
            duration: "Oct 2022 - Nov 2022",
            description: "Personal portfolio showcasing skills, services, and projects with clear layout and contact section.",
            highlights: [
                "Built with HTML, CSS, and JavaScript",
                "User-friendly layout design",
                "Dedicated contact section",
                "Responsive across all devices"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "React.js"],
            link: "#",
            category: "web",
            featured: false
        }
    ],
    mobile: [
        {
            title: "Task Manager Mobile App",
            duration: "Dec 2025 - Jan 2026",
            description: "Cross-platform Task Manager app for iOS/Android with TypeScript, featuring navigation, state management, and analytics.",
            highlights: [
                "Built with React Native CLI and TypeScript",
                "Implemented Stack and Bottom Tab navigation",
                "Managed state using Context API with custom hooks",
                "Integrated AsyncStorage for persistent storage",
                "Built custom calendar and weekly analytics",
                "Optimized performance with FlatList"
            ],
            technologies: ["React Native", "TypeScript", "React Navigation", "Context API", "AsyncStorage"],
            github: "https://github.com/Allekarthik/TaskManagerApp",
            category: "mobile",
            featured: false
        }
    ],
    ml: [
        {
            title: "Audio Sentiment Analysis",
            duration: "Aug 2024 - Oct 2024",
            description: "Machine learning system to detect emotions from voice recordings using speech-to-text and audio feature extraction.",
            highlights: [
                "Developed emotion detection from voice recordings",
                "Implemented speech-to-text conversion",
                "Performed audio feature extraction using Librosa",
                "Built ML models to classify sentiments (Positive, Negative, Neutral)",
                "Deployed using Flask"
            ],
            technologies: ["Python", "Flask", "NLP", "TensorFlow", "Scikit-learn", "NLTK", "Librosa"],
           // institution: "JNTUH College of Engineering Hyderabad",
            category: "ml",
            featured: false
        },
        {
            title: "Movie Recommendation System",
            duration: "Apr 2022 - May 2022",
            description: "Recommendation system using collaborative filtering, cosine similarity, and K-NN to suggest movies based on user preferences.",
            highlights: [
                "Implemented cosine similarity for movie recommendations",
                "Applied K-NN algorithm for top-K suggestions",
                "Handled sparse data using user-item matrix",
                "Enhanced usability with fuzzy string matching",
                "Built with Python, pandas, NumPy, Scikit-learn"
            ],
            technologies: ["Python", "pandas", "NumPy", "Scikit-learn", "Machine Learning"],
           // institution: "Government Institute of Electronics",
            category: "ml",
            featured: false
        }
    ],
    automation: [
        {
            title: "E-Commerce Price Tracker & Analyzer",
            duration: "May 2025 - May 2025",
            description: "Java-based automated tool to track and analyze product prices on Amazon India using Selenium WebDriver.",
            highlights: [
                "Tracked 5+ products with price extraction",
                "Generated Excel & JSON reports",
                "Implemented price analysis (lowest, highest, average)",
                "Applied OOP principles and Page Object Model",
                "Robust error handling with retry mechanisms"
            ],
            technologies: ["Java", "Selenium WebDriver", "Maven", "Apache POI", "Gson", "Automation Testing"],
            category: "automation",
            featured: false
        }
    ]
};

// Firebase Database Reference
let database;
let projectsRef;

// Initialize Firebase connection
function initializeProjectsFirebase() {
    try {
        database = firebase.database();
        projectsRef = database.ref('projects');
        console.log('🔥 Projects Firebase database connected');
        return true;
    } catch (error) {
        console.error('❌ Projects Firebase not initialized:', error);
        console.warn('⚠️ Falling back to localStorage for projects');
        return false;
    }
}

// Check if Firebase is available
function isProjectsFirebaseAvailable() {
    return typeof firebase !== 'undefined' && database && projectsRef;
}

// Initialize projects in Firebase if not exists
async function initializeProjects() {
    if (isProjectsFirebaseAvailable()) {
        try {
            const snapshot = await projectsRef.once('value');
            if (!snapshot.exists()) {
                await projectsRef.set(defaultProjects);
                console.log('✅ Default projects uploaded to Firebase');
            }
        } catch (error) {
            console.error('Error initializing Firebase projects:', error);
            initializeProjectsLocalStorage();
        }
    } else {
        initializeProjectsLocalStorage();
    }
}

// Fallback: Initialize localStorage
function initializeProjectsLocalStorage() {
    if (!localStorage.getItem('portfolioProjects')) {
        localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
        console.log('✅ Default projects saved to localStorage (fallback)');
    }
}

// Get all projects (from Firebase or localStorage)
async function getProjects() {
    if (isProjectsFirebaseAvailable()) {
        try {
            const snapshot = await projectsRef.once('value');
            const projects = snapshot.val();
            return projects || defaultProjects;
        } catch (error) {
            console.error('Error fetching projects from Firebase:', error);
            return getProjectsFromLocalStorage();
        }
    } else {
        return getProjectsFromLocalStorage();
    }
}

// Fallback: Get projects from localStorage
function getProjectsFromLocalStorage() {
    initializeProjectsLocalStorage();
    return JSON.parse(localStorage.getItem('portfolioProjects')) || defaultProjects;
}

// Add a new project to a category
async function addProject(category, projectData) {
    const projects = await getProjects();
    
    if (!projects[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Add new project
    projects[category].push(projectData);
    
    // Save to Firebase and localStorage
    return await saveProjects(projects);
}

// Delete a project from a category
async function deleteProject(category, projectTitle) {
    const projects = await getProjects();
    
    if (!projects[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Filter out the project
    projects[category] = projects[category].filter(project => 
        project.title !== projectTitle
    );
    
    // Save to Firebase and localStorage
    return await saveProjects(projects);
}

// Update a project
async function updateProject(category, projectTitle, updatedData) {
    const projects = await getProjects();
    
    if (!projects[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Find and update project
    const projectIndex = projects[category].findIndex(p => p.title === projectTitle);
    if (projectIndex !== -1) {
        projects[category][projectIndex] = { ...projects[category][projectIndex], ...updatedData };
        return await saveProjects(projects);
    }
    
    return false;
}

// Save projects to Firebase and localStorage
async function saveProjects(projects) {
    let firebaseSuccess = false;
    let localStorageSuccess = false;
    
    // Try Firebase first
    if (isProjectsFirebaseAvailable()) {
        try {
            await projectsRef.set(projects);
            firebaseSuccess = true;
            console.log('✅ Projects saved to Firebase');
        } catch (error) {
            console.error('❌ Firebase save failed:', error);
        }
    }
    
    // Also save to localStorage as backup/cache
    try {
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        localStorageSuccess = true;
        console.log('✅ Projects cached in localStorage');
    } catch (error) {
        console.error('❌ localStorage save failed:', error);
    }
    
    return firebaseSuccess || localStorageSuccess;
}

// Get projects count for a category
async function getProjectCount(category) {
    const projects = await getProjects();
    return projects[category] ? projects[category].length : 0;
}

// Get all projects count
async function getTotalProjectCount() {
    const projects = await getProjects();
    let total = 0;
    for (const category in projects) {
        total += projects[category].length;
    }
    return total;
}

// Listen for real-time updates from Firebase
function listenForProjectUpdates(callback) {
    if (isProjectsFirebaseAvailable()) {
        projectsRef.on('value', (snapshot) => {
            const projects = snapshot.val();
            if (projects) {
                localStorage.setItem('portfolioProjects', JSON.stringify(projects));
                if (callback) callback(projects);
                console.log('🔄 Projects updated from Firebase');
            }
        });
    }
}

// Stop listening for updates
function stopListeningForProjectUpdates() {
    if (isProjectsFirebaseAvailable()) {
        projectsRef.off();
    }
}

// Initialize on load
(async function initProjects() {
    const firebaseReady = initializeProjectsFirebase();
    
    if (firebaseReady) {
        console.log('🔥 Using Firebase for projects storage');
        await initializeProjects();
    } else {
        console.log('💾 Using localStorage for projects storage (offline mode)');
        initializeProjectsLocalStorage();
    }
})();