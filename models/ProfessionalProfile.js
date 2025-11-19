import mongoose from 'mongoose';

const ProfessionalProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    profession: {
      type: String,
      required: [true, 'Please provide a profession'],
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Please provide an hourly rate'],
      min: 0,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
      address: String,
    },
    availability: {
      type: Map,
      of: Boolean,
      default: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
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
  },
  {
    timestamps: true,
  }
);

// Create geospatial index for location-based queries
ProfessionalProfileSchema.index({ location: '2dsphere' });

export default mongoose.models.ProfessionalProfile ||
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);
