import dbConnect from '../../../lib/mongoose';
import ProfessionalProfile from '../../../models/ProfessionalProfile';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { profession, lat, lng, radius = 10 } = req.query;

    // Build query
    const query = {};

    // Filter by profession if provided
    if (profession) {
      query.profession = new RegExp(profession, 'i');
    }

    // Geospatial search if coordinates provided
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const radiusInMeters = parseFloat(radius) * 1000; // Convert km to meters

      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusInMeters
        }
      };
    }

    const professionals = await ProfessionalProfile.find(query)
      .populate('userId', 'name email')
      .limit(50);

    res.status(200).json({
      success: true,
      count: professionals.length,
      professionals
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
