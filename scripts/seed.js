const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ofisio-conexion';

// Define schemas (CommonJS version)
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'professional', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

const ProfessionalProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['plumber', 'electrician', 'carpenter', 'painter', 'cleaner', 'gardener', 'mechanic', 'other'],
    },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    hourlyRate: { type: Number, required: true, min: 0 },
    availability: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProfessionalProfileSchema.index({ location: '2dsphere' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const ProfessionalProfile = mongoose.models.ProfessionalProfile || mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);

// Seed data
const demoUsers = [
  { email: 'john.plumber@demo.com', password: 'demo123', name: 'John the Plumber', role: 'professional' },
  { email: 'sarah.electrician@demo.com', password: 'demo123', name: 'Sarah the Electrician', role: 'professional' },
  { email: 'mike.carpenter@demo.com', password: 'demo123', name: 'Mike the Carpenter', role: 'professional' },
  { email: 'client@demo.com', password: 'demo123', name: 'Demo Client', role: 'user' },
];

const demoProfessionals = [
  {
    businessName: "John's Plumbing Services",
    description: 'Expert plumbing services with 10+ years of experience',
    category: 'plumber',
    coordinates: [-99.1332, 19.4326], // Mexico City
    address: 'Av. Insurgentes Sur 1234, CDMX',
    phone: '+52 55 1234 5678',
    hourlyRate: 500,
    rating: 4.5,
    reviewCount: 23,
  },
  {
    businessName: "Sarah's Electrical Works",
    description: 'Certified electrician for residential and commercial projects',
    category: 'electrician',
    coordinates: [-99.1432, 19.4226], // Mexico City
    address: 'Av. Reforma 567, CDMX',
    phone: '+52 55 2345 6789',
    hourlyRate: 600,
    rating: 4.8,
    reviewCount: 45,
  },
  {
    businessName: "Mike's Carpentry Shop",
    description: 'Custom furniture and home improvements',
    category: 'carpenter',
    coordinates: [-99.1532, 19.4426], // Mexico City
    address: 'Calle Juarez 890, CDMX',
    phone: '+52 55 3456 7890',
    hourlyRate: 450,
    rating: 4.7,
    reviewCount: 31,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await ProfessionalProfile.deleteMany({});

    // Create users
    console.log('Creating users...');
    const createdUsers = [];
    for (const userData of demoUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create professional profiles (for first 3 users)
    console.log('Creating professional profiles...');
    for (let i = 0; i < demoProfessionals.length; i++) {
      const profileData = demoProfessionals[i];
      const user = createdUsers[i];

      const profile = await ProfessionalProfile.create({
        userId: user._id,
        ...profileData,
        location: {
          type: 'Point',
          coordinates: profileData.coordinates,
        },
      });
      console.log(`Created profile for: ${user.name}`);
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('- Professional 1: john.plumber@demo.com / demo123');
    console.log('- Professional 2: sarah.electrician@demo.com / demo123');
    console.log('- Professional 3: mike.carpenter@demo.com / demo123');
    console.log('- Client: client@demo.com / demo123');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seed();
