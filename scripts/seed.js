const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ofisio-conexion';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Import models
const User = require('../models/User').default || require('../models/User');
const ProfessionalProfile = require('../models/ProfessionalProfile').default || require('../models/ProfessionalProfile');

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await ProfessionalProfile.deleteMany({});

    // Create sample users
    console.log('Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    const clientUser = await User.create({
      name: 'John Client',
      email: 'client@example.com',
      password: hashedPassword,
      role: 'client'
    });

    const professionalUsers = await User.create([
      {
        name: 'Maria Garcia',
        email: 'maria@example.com',
        password: hashedPassword,
        role: 'professional'
      },
      {
        name: 'Carlos Rodriguez',
        email: 'carlos@example.com',
        password: hashedPassword,
        role: 'professional'
      },
      {
        name: 'Ana Martinez',
        email: 'ana@example.com',
        password: hashedPassword,
        role: 'professional'
      }
    ]);

    // Create professional profiles
    console.log('Creating professional profiles...');
    await ProfessionalProfile.create([
      {
        userId: professionalUsers[0]._id,
        profession: 'Plumber',
        bio: 'Experienced plumber with 10 years in residential and commercial plumbing.',
        location: {
          type: 'Point',
          coordinates: [-99.1332, 19.4326], // Mexico City
          address: 'Av. Reforma 123, Mexico City'
        },
        hourlyRate: 50,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        rating: 4.5,
        reviewCount: 23,
        verified: true
      },
      {
        userId: professionalUsers[1]._id,
        profession: 'Electrician',
        bio: 'Certified electrician specializing in residential electrical work.',
        location: {
          type: 'Point',
          coordinates: [-99.1500, 19.4200],
          address: 'Calle Morelos 456, Mexico City'
        },
        hourlyRate: 60,
        availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        rating: 4.8,
        reviewCount: 45,
        verified: true
      },
      {
        userId: professionalUsers[2]._id,
        profession: 'Carpenter',
        bio: 'Custom furniture and home renovation specialist.',
        location: {
          type: 'Point',
          coordinates: [-99.1200, 19.4500],
          address: 'Av. Insurgentes 789, Mexico City'
        },
        hourlyRate: 45,
        availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
        rating: 4.7,
        reviewCount: 31,
        verified: true
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\nSample credentials:');
    console.log('Client: client@example.com / password123');
    console.log('Professional: maria@example.com / password123');
    console.log('Professional: carlos@example.com / password123');
    console.log('Professional: ana@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
