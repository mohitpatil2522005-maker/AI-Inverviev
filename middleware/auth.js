const jwt = require('jsonwebtoken');

const verifySupabaseToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const tokenParts = authHeader.split(' ');
  const token = tokenParts.length === 2 ? tokenParts[1] : null;

  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }

  if (!process.env.SUPABASE_JWT_SECRET) {
    return res.status(500).json({ error: 'Supabase JWT secret is not configured' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    
    // Attach user info to request
    req.user = {
      uid: decoded.sub, // Supabase user id
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    console.error('Supabase token verification error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifySupabaseToken;