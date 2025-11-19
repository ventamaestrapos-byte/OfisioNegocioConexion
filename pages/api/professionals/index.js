import dbConnect from '../../../lib/mongoose';
import ProfessionalProfile from '../../../models/ProfessionalProfile';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { search, lng, lat, maxDistance, services } = req.query;

      let query = {};

      // Text search
      if (search) {
        query.$text = { $search: search };
      }

      // Service filter
      if (services) {
        const serviceArray = services.split(',').map(s => s.trim());
        query.services = { $in: serviceArray };
      }

      let professionals;

      // Geospatial search
      if (lng && lat) {
        const longitude = parseFloat(lng);
        const latitude = parseFloat(lat);
        const distance = maxDistance ? parseInt(maxDistance) : 5000; // default 5km

        professionals = await ProfessionalProfile.find({
          ...query,
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: distance,
            },
          },
        })
          .populate('userId', 'name email')
          .limit(50);
      } else {
        // Regular search without geolocation
        professionals = await ProfessionalProfile.find(query)
          .populate('userId', 'name email')
          .limit(50);
      }

      return res.status(200).json({
        success: true,
        count: professionals.length,
        professionals,
      });
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error searching professionals' 
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        userId,
        businessName,
        description,
        services,
        location,
        phone,
        website,
      } = req.body;

      // Validate required fields
      if (!userId || !businessName || !description || !services || !location) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      // Validate location format
      if (!location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({
          success: false,
          message: 'Invalid location coordinates',
        });
      }

      const profile = await ProfessionalProfile.create({
        userId,
        businessName,
        description,
        services,
        location: {
          type: 'Point',
          coordinates: location.coordinates,
          address: location.address || '',
        },
        phone,
        website,
      });

      return res.status(201).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.error('Create profile error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Professional profile already exists for this user',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Error creating professional profile',
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
