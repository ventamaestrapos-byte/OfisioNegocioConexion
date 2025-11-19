const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const ProfessionalProfile = require('../models/ProfessionalProfile');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ofisio-conexion';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await ProfessionalProfile.deleteMany({});

    // Create sample users
    console.log('Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.create([
      {
        email: 'client@example.com',
        password: hashedPassword,
        name: 'John Client',
        role: 'client',
      },
      {
        email: 'plumber@example.com',
        password: hashedPassword,
        name: 'Mike Plumber',
        role: 'professional',
      },
      {
        email: 'electrician@example.com',
        password: hashedPassword,
        name: 'Sarah Electrician',
        role: 'professional',
      },
      {
        email: 'carpenter@example.com',
        password: hashedPassword,
        name: 'Tom Carpenter',
        role: 'professional',
      },
    ]);

    console.log(`Created ${users.length} users`);

    // Create professional profiles
    console.log('Creating professional profiles...');
    const professionals = await ProfessionalProfile.create([
      {
        userId: users[1]._id,
        profession: 'Plumber',
        bio: 'Experienced plumber with 10+ years in residential and commercial plumbing.',
        hourlyRate: 75,
        location: {
          type: 'Point',
          coordinates: [-74.006, 40.7128], // New York
          address: 'New York, NY',
        },
        rating: 4.8,
        reviewCount: 45,
        verified: true,
      },
      {
        userId: users[2]._id,
        profession: 'Electrician',
        bio: 'Licensed electrician specializing in home rewiring and electrical repairs.',
        hourlyRate: 85,
        location: {
          type: 'Point',
          coordinates: [-74.0060, 40.7128], // New York
          address: 'New York, NY',
        },
        rating: 4.9,
        reviewCount: 67,
        verified: true,
      },
      {
        userId: users[3]._id,
        profession: 'Carpenter',
        bio: 'Custom carpentry and furniture making. Quality craftsmanship guaranteed.',
        hourlyRate: 65,
        location: {
          type: 'Point',
          coordinates: [-74.0070, 40.7130], // New York
          address: 'New York, NY',
        },
        rating: 4.7,
        reviewCount: 32,
        verified: true,
      },
    ]);

    console.log(`Created ${professionals.length} professional profiles`);

    console.log('Seed data created successfully!');
    console.log('\nSample credentials:');
    console.log('Client: client@example.com / password123');
    console.log('Plumber: plumber@example.com / password123');
    console.log('Electrician: electrician@example.com / password123');
    console.log('Carpenter: carpenter@example.com / password123');

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
