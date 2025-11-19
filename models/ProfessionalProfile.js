import mongoose from 'mongoose';

const ProfessionalProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, 'Please provide a business name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'plumber',
        'electrician',
        'carpenter',
        'painter',
        'cleaner',
        'gardener',
        'mechanic',
        'other',
      ],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Please provide an hourly rate'],
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
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
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for geospatial queries
ProfessionalProfileSchema.index({ location: '2dsphere' });

export default mongoose.models.ProfessionalProfile ||
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);
