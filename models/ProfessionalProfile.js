import mongoose from 'mongoose';

const professionalProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profession: {
    type: String,
    required: [true, 'Please provide a profession'],
    maxlength: [100, 'Profession cannot be more than 100 characters']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Please provide an hourly rate']
  },
  availability: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  stripeAccountId: {
    type: String,
    select: false
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for geospatial queries
professionalProfileSchema.index({ location: '2dsphere' });

export default mongoose.models.ProfessionalProfile || mongoose.model('ProfessionalProfile', professionalProfileSchema);
