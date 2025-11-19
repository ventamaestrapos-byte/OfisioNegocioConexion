import dbConnect from '../../../lib/mongoose';
import ProfessionalProfile from '../../../models/ProfessionalProfile';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { longitude, latitude, radius, category } = req.query;

      let query = {};

      // Add geospatial query if coordinates are provided
      if (longitude && latitude && radius) {
        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: parseInt(radius) || 5000,
          },
        };
      }

      // Add category filter if provided
      if (category) {
        query.category = category;
      }

      const professionals = await ProfessionalProfile.find(query)
        .populate('userId', 'name email')
        .limit(50);

      return res.status(200).json({
        success: true,
        count: professionals.length,
        data: professionals,
      });
    } catch (error) {
      console.error('Error fetching professionals:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching professionals',
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        userId,
        businessName,
        description,
        category,
        coordinates,
        address,
        phone,
        hourlyRate,
      } = req.body;

      // Validate required fields
      if (
        !userId ||
        !businessName ||
        !description ||
        !category ||
        !coordinates ||
        !address ||
        !phone ||
        hourlyRate === undefined
      ) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields',
        });
      }

      // Check if profile already exists for this user
      const existingProfile = await ProfessionalProfile.findOne({ userId });
      if (existingProfile) {
        return res.status(400).json({
          success: false,
          message: 'Professional profile already exists for this user',
        });
      }

      // Create professional profile
      const profile = await ProfessionalProfile.create({
        userId,
        businessName,
        description,
        category,
        location: {
          type: 'Point',
          coordinates: coordinates, // [longitude, latitude]
        },
        address,
        phone,
        hourlyRate,
      });

      return res.status(201).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      console.error('Error creating professional profile:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating professional profile',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }
}
