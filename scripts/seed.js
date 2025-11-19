const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Define schemas (CommonJS style for script)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'professional', 'admin'], default: 'client' },
  emailVerified: { type: Date, default: null },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProfessionalProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profession: { type: String, required: true },
  bio: { type: String },
  skills: [{ type: String }],
  hourlyRate: { type: Number },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
  },
  availability: { type: String, enum: ['available', 'busy', 'unavailable'], default: 'available' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  stripeAccountId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProfessionalProfileSchema.index({ location: '2dsphere' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const ProfessionalProfile = mongoose.models.ProfessionalProfile || 
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);

// Sample data
const sampleUsers = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: 'password123',
    role: 'professional',
  },
  {
    name: 'María García',
    email: 'maria.garcia@example.com',
    password: 'password123',
    role: 'professional',
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    password: 'password123',
    role: 'client',
  },
];

const sampleProfessionals = [
  {
    profession: 'Plumber',
    bio: 'Experienced plumber with 10+ years in residential and commercial projects',
    skills: ['Pipe Installation', 'Leak Repair', 'Water Heater Installation'],
    hourlyRate: 50,
    location: {
      coordinates: [-99.1332, 19.4326], // Mexico City
      address: 'Polanco, Mexico City, CDMX',
    },
    availability: 'available',
  },
  {
    profession: 'Electrician',
    bio: 'Licensed electrician specializing in home and office electrical systems',
    skills: ['Wiring', 'Panel Installation', 'LED Lighting', 'Solar Systems'],
    hourlyRate: 60,
    location: {
      coordinates: [-99.1677, 19.4270], // Mexico City
      address: 'Roma Norte, Mexico City, CDMX',
    },
    availability: 'available',
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await ProfessionalProfile.deleteMany({});
    console.log('Existing data cleared');

    // Create users
    console.log('Creating users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create professional profiles for professional users
    console.log('Creating professional profiles...');
    const professionalUsers = createdUsers.filter(u => u.role === 'professional');
    for (let i = 0; i < professionalUsers.length && i < sampleProfessionals.length; i++) {
      const profile = await ProfessionalProfile.create({
        userId: professionalUsers[i]._id,
        ...sampleProfessionals[i],
      });
      console.log(`Created profile for: ${professionalUsers[i].email} - ${profile.profession}`);
    }

    console.log('Seed completed successfully!');
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${Math.min(professionalUsers.length, sampleProfessionals.length)} professional profiles`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seed();
