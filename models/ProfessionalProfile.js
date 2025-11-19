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
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    services: {
      type: [String],
      required: [true, 'Please provide at least one service'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Please provide at least one service',
      },
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
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
    subscriptionStatus: {
      type: String,
      enum: ['active', 'inactive', 'trial'],
      default: 'trial',
    },
    subscriptionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for geospatial queries
ProfessionalProfileSchema.index({ location: '2dsphere' });

// Create text indexes for search
ProfessionalProfileSchema.index({ 
  businessName: 'text', 
  description: 'text', 
  services: 'text' 
});

export default mongoose.models.ProfessionalProfile || 
  mongoose.model('ProfessionalProfile', ProfessionalProfileSchema);
