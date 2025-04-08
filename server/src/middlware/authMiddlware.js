import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers?.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({
        message: "Token is missing. Please login.",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true,
      });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: true,
    });
  }
};

export default auth;
