const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ofisio-conexion';

// Define schemas inline for seeding
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'professional', 'admin'], default: 'user' },
}, { timestamps: true });

const ProfessionalProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  businessName: { type: String, required: true },
  description: { type: String, required: true },
  services: { type: [String], required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
  },
  phone: String,
  website: String,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'trial'], default: 'trial' },
}, { timestamps: true });

ProfessionalProfileSchema.index({ location: '2dsphere' });
ProfessionalProfileSchema.index({ businessName: 'text', description: 'text', services: 'text' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const ProfessionalProfile = mongoose.models.ProfessionalProfile || 
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);

const seedData = {
  users: [
    {
      email: 'plumber@example.com',
      password: 'password123',
      name: 'Juan Plomero',
      role: 'professional',
    },
    {
      email: 'electrician@example.com',
      password: 'password123',
      name: 'María Electricista',
      role: 'professional',
    },
    {
      email: 'carpenter@example.com',
      password: 'password123',
      name: 'Carlos Carpintero',
      role: 'professional',
    },
    {
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'user',
    },
  ],
  profiles: [
    {
      businessName: 'Plomería Express',
      description: 'Servicios de plomería 24/7. Reparación de fugas, instalación de tuberías, y más.',
      services: ['Plomería', 'Reparación de fugas', 'Instalación'],
      location: {
        type: 'Point',
        coordinates: [-99.1332, 19.4326], // Mexico City
        address: 'Av. Insurgentes Sur 1234, CDMX',
      },
      phone: '+52 55 1234 5678',
      rating: 4.5,
      reviewCount: 23,
    },
    {
      businessName: 'Electricidad Total',
      description: 'Instalaciones eléctricas residenciales y comerciales. Certificados y con garantía.',
      services: ['Electricidad', 'Instalación eléctrica', 'Mantenimiento'],
      location: {
        type: 'Point',
        coordinates: [-99.1500, 19.4200],
        address: 'Calle Reforma 567, CDMX',
      },
      phone: '+52 55 2345 6789',
      website: 'https://example.com',
      rating: 4.8,
      reviewCount: 45,
    },
    {
      businessName: 'Carpintería Fina',
      description: 'Muebles a medida, reparación y restauración de madera.',
      services: ['Carpintería', 'Muebles', 'Restauración'],
      location: {
        type: 'Point',
        coordinates: [-99.1200, 19.4400],
        address: 'Calle Juárez 890, CDMX',
      },
      phone: '+52 55 3456 7890',
      rating: 4.2,
      reviewCount: 15,
    },
  ],
};

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
    for (const userData of seedData.users) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create professional profiles (skip the regular user)
    console.log('Creating professional profiles...');
    for (let i = 0; i < seedData.profiles.length; i++) {
      const profileData = seedData.profiles[i];
      const user = createdUsers[i]; // Match with professional users

      const profile = await ProfessionalProfile.create({
        userId: user._id,
        ...profileData,
      });
      console.log(`Created profile for: ${profileData.businessName}`);
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nDemo credentials:');
    console.log('Professional 1: plumber@example.com / password123');
    console.log('Professional 2: electrician@example.com / password123');
    console.log('Professional 3: carpenter@example.com / password123');
    console.log('Regular User: user@example.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seed();
