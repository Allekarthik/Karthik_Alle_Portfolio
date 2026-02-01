// blogs-data-firebase.js - Blog Management System with Firebase
// This version uses Firebase Realtime Database for cloud storage

// Default Blogs Data (pre-loaded with user's 10 blogs)
const defaultBlogs = {
    backend: [
        {
            title: "How I Built a Full-Stack Ecommerce Seller Dashboard Using Java Servlets",
            slug: "ecommerce-seller-dashboard-java-servlets",
            date: "November 2025",
            readTime: "5 min read",
            category: "backend",
            tags: ["Java", "Servlets", "MySQL", "JDBC", "Full-Stack", "Authentication"],
            excerpt: "While building my Ecommerce Seller Dashboard, my main goal was to understand how real backend systems work beyond frontend UI. I wanted sellers to securely log in, manage products, and interact with a database in a structured way.",
            content: `While building my Ecommerce Seller Dashboard, my main goal was to understand how real backend systems work beyond frontend UI. I wanted sellers to securely log in, manage products, and interact with a database in a structured way. For this reason, I chose Java Servlets with MySQL instead of using a ready-made framework.

The backend was designed around servlets handling different responsibilities such as authentication, product management, and inventory updates. I connected the application to MySQL using JDBC and carefully managed database connections to avoid performance issues. Each request followed a clear flow: validate input, process business logic, and return the appropriate response.

One major challenge was session handling. Initially, users could access protected pages even after logout. I fixed this by properly invalidating sessions and adding checks before loading sensitive pages. This helped me understand how session lifecycle management works in real applications.

This project gave me strong confidence in backend development and taught me how full-stack systems operate in production-like environments.`,
            featured: true,
            published: true
        },
        {
            title: "Implementing Secure Authentication Using Java Sessions",
            slug: "secure-authentication-java-sessions",
            date: "November 2025",
            readTime: "4 min read",
            category: "backend",
            tags: ["Java", "Security", "Authentication", "HttpSession", "Web Security"],
            excerpt: "Authentication was one of the most critical features in my seller dashboard project. I didn't want to rely on client-side storage because it's insecure, so I implemented server-side authentication using Java HttpSession.",
            content: `Authentication was one of the most critical features in my seller dashboard project. I didn't want to rely on client-side storage because it's insecure, so I implemented server-side authentication using Java HttpSession.

When a user logs in, their credentials are validated against the database. If successful, a session is created and the user's ID is stored securely on the server. Every protected page checks for this session before granting access. If the session doesn't exist, the user is redirected to the login page.

At first, I underestimated how important logout handling is. Forgetting to invalidate sessions caused users to remain logged in unintentionally. Fixing this taught me that security is not just about login, but about managing the entire session lifecycle properly.

This experience helped me understand how authentication works behind the scenes in enterprise-level applications.`,
            featured: true,
            published: true
        },
        {
            title: "Deploying Java Web Applications on Apache Tomcat",
            slug: "deploying-java-apps-apache-tomcat",
            date: "December 2025",
            readTime: "4 min read",
            category: "backend",
            tags: ["Java", "Tomcat", "Deployment", "WAR", "DevOps", "Server"],
            excerpt: "After completing my Java web application, deploying it was a completely new challenge. Running the app locally was easy, but deploying it on Apache Tomcat taught me how production environments work.",
            content: `After completing my Java web application, deploying it was a completely new challenge. Running the app locally was easy, but deploying it on Apache Tomcat taught me how production environments work.

I learned how WAR files are structured and how Tomcat loads and manages applications. Placing the WAR file in the correct directory and configuring database connections properly were key steps. I also faced common issues like missing dependencies and incorrect file paths, which required careful debugging.

Through this process, I understood that deployment is not just about uploading files—it's about configuration, environment setup, and error handling. This experience gave me confidence in handling real server environments.`,
            featured: false,
            published: true
        }
    ],
    frontend: [
        {
            title: "Why I Chose React and Vite for My E-Commerce Web App",
            slug: "react-vite-ecommerce-app",
            date: "November 2025",
            readTime: "4 min read",
            category: "frontend",
            tags: ["React", "Vite", "JavaScript", "Performance", "Build Tools"],
            excerpt: "When building my E-Mart project, I wanted a fast and modern development experience. I chose React with Vite because of its quick startup time and efficient build process.",
            content: `When building my E-Mart project, I wanted a fast and modern development experience. I chose React with Vite because of its quick startup time and efficient build process.

Compared to traditional setups, Vite made development smoother with instant hot reloads. This allowed me to focus more on building features like category browsing and shopping cart functionality instead of waiting for builds.

Using React's component-based architecture helped me keep the code clean and reusable. This project strengthened my understanding of modern frontend tooling and performance-focused development.`,
            featured: true,
            published: true
        },
        {
            title: "Managing a Shopping Cart in React Using Context API",
            slug: "shopping-cart-react-context-api",
            date: "November 2025",
            readTime: "5 min read",
            category: "frontend",
            tags: ["React", "Context API", "State Management", "JavaScript"],
            excerpt: "One of the most interesting parts of my E-Mart project was implementing the shopping cart. Instead of using Redux, I used React's Context API to manage global cart state.",
            content: `One of the most interesting parts of my E-Mart project was implementing the shopping cart. Instead of using Redux, I used React's Context API to manage global cart state.

The cart logic handled adding, removing, and updating products across different components without prop drilling. Designing the cart structure properly was important to avoid unnecessary re-renders.

This experience taught me how global state works and when lightweight solutions like Context API are more than enough for medium-sized applications.`,
            featured: false,
            published: true
        },
        {
            title: "Migrating a Legacy PHP Application to React",
            slug: "migrating-php-to-react",
            date: "December 2025",
            readTime: "6 min read",
            category: "frontend",
            tags: ["React", "PHP", "Migration", "Legacy Code", "Refactoring"],
            excerpt: "During my work on the Performance Monitoring Tool, I was involved in migrating a PHP-based UI to React. This was my first exposure to working with legacy systems.",
            content: `During my work on the Performance Monitoring Tool, I was involved in migrating a PHP-based UI to React. This was my first exposure to working with legacy systems.

The biggest challenge was understanding existing workflows before rewriting them in React components. I had to carefully break down pages into reusable components while preserving existing functionality.

This project taught me that migration is not about rewriting everything—it's about improving maintainability while respecting existing systems.`,
            featured: false,
            published: true
        }
    ],
    mobile: [
        {
            title: "Building a Cross-Platform Task Manager App Using React Native",
            slug: "cross-platform-task-manager-react-native",
            date: "January 2026",
            readTime: "5 min read",
            category: "mobile",
            tags: ["React Native", "TypeScript", "Mobile Development", "Cross-Platform"],
            excerpt: "My Task Manager app was built using React Native with TypeScript to support both Android and iOS. I focused on creating a clean navigation flow and reusable components.",
            content: `My Task Manager app was built using React Native with TypeScript to support both Android and iOS. I focused on creating a clean navigation flow and reusable components.

Using React Navigation helped me manage screen transitions smoothly. I also used Context API for global task management, keeping the app logic simple and organized.

This project helped me understand how mobile apps differ from web apps, especially in performance and UI considerations.`,
            featured: true,
            published: true
        },
        {
            title: "Persisting Data in React Native Using AsyncStorage",
            slug: "react-native-asyncstorage-data-persistence",
            date: "January 2026",
            readTime: "4 min read",
            category: "mobile",
            tags: ["React Native", "AsyncStorage", "Data Persistence", "Mobile"],
            excerpt: "To make my Task Manager app useful offline, I used AsyncStorage to persist tasks locally. This ensured that user data was not lost when the app was closed.",
            content: `To make my Task Manager app useful offline, I used AsyncStorage to persist tasks locally. This ensured that user data was not lost when the app was closed.

Handling async operations carefully was important to prevent data corruption. I also learned how to load stored data when the app launches and sync it with the app state.

This taught me how real mobile apps handle offline data and persistence.`,
            featured: false,
            published: true
        }
    ],
    ml: [
        {
            title: "Audio Sentiment Analysis – From Voice to Emotion Detection",
            slug: "audio-sentiment-analysis-emotion-detection",
            date: "October 2024",
            readTime: "6 min read",
            category: "ml",
            tags: ["Machine Learning", "Python", "TensorFlow", "NLP", "Audio Processing", "Librosa"],
            excerpt: "My Audio Sentiment Analysis project focused on detecting emotions from voice recordings. The process involved audio preprocessing, feature extraction, and machine learning classification.",
            content: `My Audio Sentiment Analysis project focused on detecting emotions from voice recordings. The process involved audio preprocessing, feature extraction, and machine learning classification.

Using Librosa, I extracted meaningful audio features and trained models to classify emotions such as positive, negative, and neutral. Deploying the model using Flask helped me understand how ML systems are served in real applications.

This project strengthened my understanding of applied machine learning beyond theory.`,
            featured: true,
            published: true
        }
    ],
    automation: [
        {
            title: "Automating E-Commerce Price Tracking Using Java & Selenium",
            slug: "ecommerce-price-tracking-selenium-automation",
            date: "May 2025",
            readTime: "5 min read",
            category: "automation",
            tags: ["Java", "Selenium", "Automation", "Web Scraping", "Testing"],
            excerpt: "I built an automation tool to track product prices on e-commerce websites using Java and Selenium WebDriver. The tool collected pricing data and generated reports for analysis.",
            content: `I built an automation tool to track product prices on e-commerce websites using Java and Selenium WebDriver. The tool collected pricing data and generated reports for analysis.

Implementing proper error handling and retries was crucial because websites often change dynamically. Applying OOP principles and the Page Object Model helped keep the automation code maintainable.

This project showed me how automation can solve real-world monitoring problems efficiently.`,
            featured: true,
            published: true
        }
    ]
};

// Firebase Database Reference
let database;
let blogsRef;

// Initialize Firebase connection for blogs
function initializeBlogsFirebase() {
    try {
        database = firebase.database();
        blogsRef = database.ref('blogs');
        console.log('🔥 Blogs Firebase database connected');
        return true;
    } catch (error) {
        console.error('❌ Blogs Firebase not initialized:', error);
        console.warn('⚠️ Falling back to localStorage for blogs');
        return false;
    }
}

// Check if Firebase is available
function isBlogsFirebaseAvailable() {
    return typeof firebase !== 'undefined' && database && blogsRef;
}

// Initialize blogs in Firebase if not exists
async function initializeBlogs() {
    if (isBlogsFirebaseAvailable()) {
        try {
            const snapshot = await blogsRef.once('value');
            if (!snapshot.exists()) {
                await blogsRef.set(defaultBlogs);
                console.log('✅ Default blogs uploaded to Firebase');
            }
        } catch (error) {
            console.error('Error initializing Firebase blogs:', error);
            initializeBlogsLocalStorage();
        }
    } else {
        initializeBlogsLocalStorage();
    }
}

// Fallback: Initialize localStorage
function initializeBlogsLocalStorage() {
    if (!localStorage.getItem('portfolioBlogs')) {
        localStorage.setItem('portfolioBlogs', JSON.stringify(defaultBlogs));
        console.log('✅ Default blogs saved to localStorage (fallback)');
    }
}

// Get all blogs (from Firebase or localStorage)
async function getBlogs() {
    if (isBlogsFirebaseAvailable()) {
        try {
            const snapshot = await blogsRef.once('value');
            const blogs = snapshot.val();
            return blogs || defaultBlogs;
        } catch (error) {
            console.error('Error fetching blogs from Firebase:', error);
            return getBlogsFromLocalStorage();
        }
    } else {
        return getBlogsFromLocalStorage();
    }
}

// Fallback: Get blogs from localStorage
function getBlogsFromLocalStorage() {
    initializeBlogsLocalStorage();
    return JSON.parse(localStorage.getItem('portfolioBlogs')) || defaultBlogs;
}

// Add a new blog to a category
async function addBlog(category, blogData) {
    const blogs = await getBlogs();
    
    if (!blogs[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Add new blog
    blogs[category].push(blogData);
    
    // Save to Firebase and localStorage
    return await saveBlogs(blogs);
}

// Delete a blog from a category
async function deleteBlog(category, blogSlug) {
    const blogs = await getBlogs();
    
    if (!blogs[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Filter out the blog
    blogs[category] = blogs[category].filter(blog => 
        blog.slug !== blogSlug
    );
    
    // Save to Firebase and localStorage
    return await saveBlogs(blogs);
}

// Update a blog
async function updateBlog(category, blogSlug, updatedData) {
    const blogs = await getBlogs();
    
    if (!blogs[category]) {
        console.error('Invalid category:', category);
        return false;
    }
    
    // Find and update blog
    const blogIndex = blogs[category].findIndex(b => b.slug === blogSlug);
    if (blogIndex !== -1) {
        blogs[category][blogIndex] = { ...blogs[category][blogIndex], ...updatedData };
        return await saveBlogs(blogs);
    }
    
    return false;
}

// Save blogs to Firebase and localStorage
async function saveBlogs(blogs) {
    let firebaseSuccess = false;
    let localStorageSuccess = false;
    
    // Try Firebase first
    if (isBlogsFirebaseAvailable()) {
        try {
            await blogsRef.set(blogs);
            firebaseSuccess = true;
            console.log('✅ Blogs saved to Firebase');
        } catch (error) {
            console.error('❌ Firebase save failed:', error);
        }
    }
    
    // Also save to localStorage as backup/cache
    try {
        localStorage.setItem('portfolioBlogs', JSON.stringify(blogs));
        localStorageSuccess = true;
        console.log('✅ Blogs cached in localStorage');
    } catch (error) {
        console.error('❌ localStorage save failed:', error);
    }
    
    return firebaseSuccess || localStorageSuccess;
}

// Get blogs count for a category
async function getBlogCount(category) {
    const blogs = await getBlogs();
    return blogs[category] ? blogs[category].length : 0;
}

// Get total blogs count
async function getTotalBlogCount() {
    const blogs = await getBlogs();
    let total = 0;
    for (const category in blogs) {
        total += blogs[category].length;
    }
    return total;
}

// Get featured blogs
async function getFeaturedBlogs() {
    const blogs = await getBlogs();
    const featured = [];
    for (const category in blogs) {
        const categoryFeatured = blogs[category].filter(blog => blog.featured);
        featured.push(...categoryFeatured);
    }
    return featured;
}

// Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

// Calculate reading time
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Listen for real-time updates from Firebase
function listenForBlogUpdates(callback) {
    if (isBlogsFirebaseAvailable()) {
        blogsRef.on('value', (snapshot) => {
            const blogs = snapshot.val();
            if (blogs) {
                localStorage.setItem('portfolioBlogs', JSON.stringify(blogs));
                if (callback) callback(blogs);
                console.log('🔄 Blogs updated from Firebase');
            }
        });
    }
}

// Stop listening for updates
function stopListeningForBlogUpdates() {
    if (isBlogsFirebaseAvailable()) {
        blogsRef.off();
    }
}

// Initialize on load
(async function initBlogs() {
    const firebaseReady = initializeBlogsFirebase();
    
    if (firebaseReady) {
        console.log('🔥 Using Firebase for blogs storage');
        await initializeBlogs();
    } else {
        console.log('💾 Using localStorage for blogs storage (offline mode)');
        initializeBlogsLocalStorage();
    }
})();