import dbConnect from '../../../lib/mongoose';
import ProfessionalProfile from '../../../models/ProfessionalProfile';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { profession, lat, lng, radius } = req.query;

      let query = {};

      // Filter by profession if provided
      if (profession) {
        query.profession = new RegExp(profession, 'i');
      }

      // Filter by location if coordinates provided
      if (lat && lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const radiusInKm = radius ? parseFloat(radius) : 10;

        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKm * 1000, // Convert to meters
          },
        };
      }

      const professionals = await ProfessionalProfile.find(query)
        .populate('userId', 'name email')
        .limit(50);

      return res.status(200).json({ professionals });
    } catch (error) {
      console.error('Error fetching professionals:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const professionalProfile = await ProfessionalProfile.create(req.body);
      return res.status(201).json({ professional: professionalProfile });
    } catch (error) {
      console.error('Error creating professional:', error);
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
