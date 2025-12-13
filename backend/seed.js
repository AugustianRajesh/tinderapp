const db = require('./db');

const users = [
    { name: "Adam Livene", image: 'assets/images/person1.jpg', age: 21, profession: 'Software Developer' },
    { name: "Derek Staham", image: 'assets/images/person2.jpg', age: 25, profession: 'Engineer in Mechatronics' },
    { name: "Alexa Georigna", image: 'assets/images/person3.jpg', age: 23, profession: 'Photographer 📷' },
    { name: "Maxii", image: 'assets/images/person4.jpg', age: 23, profession: 'Camerographer 📷' },
    { name: "Risica Nibah", image: 'assets/images/person5.jpg', age: 26, profession: 'Studying in W.A Eng.' },
    { name: "Christina", image: 'assets/images/person6.jpg', age: 34, profession: 'Developer Advocate 👔' },
    { name: "Rissu Stelin", image: 'assets/images/person7.jpg', age: 23, profession: 'Studying Aerospace 🛫' },
    { name: "Rebicca", image: 'assets/images/person8.jpg', age: 24, profession: 'MIT Open Courseware 📚' },
    { name: "Rebicca", image: 'assets/images/person8.jpg', age: 24, profession: 'MIT Open Courseware 📚' },
    // New users 
    { name: "Sarah Jenkins", image: 'assets/images/person1.jpg', age: 22, profession: 'UX Designer 🎨' },
    { name: "Michael Chen", image: 'assets/images/person2.jpg', age: 27, profession: 'Product Manager 📱' },
    { name: "Emma Wilson", image: 'assets/images/person3.jpg', age: 24, profession: 'Data Scientist 📊' },
    { name: "David Miller", image: 'assets/images/person4.jpg', age: 29, profession: 'Cloud Architect ☁️' },
    { name: "Olivia Taylor", image: 'assets/images/person5.jpg', age: 25, profession: 'Digital Nomad 🌍' },
    { name: "James Anderson", image: 'assets/images/person6.jpg', age: 30, profession: 'Blockchain Dev ⛓️' },
    { name: "Sophia Martinez", image: 'assets/images/person7.jpg', age: 23, profession: 'Art Student 🎭' },
    { name: "Daniel Lee", image: 'assets/images/person8.jpg', age: 28, profession: 'Fitness Coach 💪' },
    { name: "Isabella Garcia", image: 'assets/images/person1.jpg', age: 26, profession: 'Travel Blogger ✈️' },
    { name: "Lucas Brown", image: 'assets/images/person2.jpg', age: 25, profession: 'Chef 👨‍🍳' }
];

// Helper to generate random coordinates around NYC (40.7128, -74.0060)
// Radius approx 0.1 degree (~7 miles)
function getRandomLocation() {
    const latBase = 40.7128;
    const lonBase = -74.0060;
    const latOffset = (Math.random() * 0.2) - 0.1;
    const lonOffset = (Math.random() * 0.2) - 0.1;
    return {
        latitude: latBase + latOffset,
        longitude: lonBase + lonOffset
    };
}

// Add location to users
users.forEach(user => {
    const loc = getRandomLocation();
    user.latitude = loc.latitude;
    user.longitude = loc.longitude;
});

async function seed() {
    try {
        console.log('Seeding users...');
        for (const user of users) {
            await db.query(
                'INSERT INTO users (name, image_url, age, profession, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6)',
                [user.name, user.image, user.age, user.profession, user.latitude, user.longitude]
            );
        }
        console.log('Seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed();
