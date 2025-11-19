import mongoose from 'mongoose';

const ProfessionalProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: [true, 'Please provide a profession'],
    maxlength: [100, 'Profession cannot be more than 100 characters'],
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters'],
  },
  skills: [{
    type: String,
    maxlength: [50, 'Skill cannot be more than 50 characters'],
  }],
  hourlyRate: {
    type: Number,
    min: [0, 'Hourly rate must be positive'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  stripeAccountId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index for location-based queries
ProfessionalProfileSchema.index({ location: '2dsphere' });

// Update timestamp on save
ProfessionalProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.ProfessionalProfile || 
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);
