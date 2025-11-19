import dbConnect from '../../../lib/mongoose';
import ProfessionalProfile from '../../../models/ProfessionalProfile';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { lat, lng, radius, profession } = req.query;

      let query = {};

      // Filter by profession if provided
      if (profession) {
        query.profession = { $regex: profession, $options: 'i' };
      }

      // Filter by location if coordinates provided
      if (lat && lng) {
        const maxDistance = radius ? parseInt(radius) : 10000; // Default 10km
        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: maxDistance,
          },
        };
      }

      const professionals = await ProfessionalProfile.find(query)
        .populate('userId', 'name email image')
        .limit(50)
        .lean();

      return res.status(200).json({ 
        success: true,
        professionals,
        count: professionals.length,
      });
    } catch (error) {
      console.error('Error fetching professionals:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      // This would typically require authentication
      const profileData = req.body;

      // Validate required fields
      if (!profileData.userId || !profileData.profession || !profileData.location) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if user exists
      const user = await User.findById(profileData.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if profile already exists
      const existingProfile = await ProfessionalProfile.findOne({ 
        userId: profileData.userId 
      });
      if (existingProfile) {
        return res.status(409).json({ error: 'Profile already exists' });
      }

      // Create professional profile
      const profile = await ProfessionalProfile.create(profileData);

      // Update user role to professional
      await User.findByIdAndUpdate(profileData.userId, { role: 'professional' });

      return res.status(201).json({ 
        success: true,
        profile,
      });
    } catch (error) {
      console.error('Error creating professional profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
