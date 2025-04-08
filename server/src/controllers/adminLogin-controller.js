import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import adminLogin from '../models/adminLogin-model.js'
dotenv.config();


//login controller

const allowedAdmin = {
  email:  process.env.ADMIN_EMAIL   || "epitomerealtors35@gmail.com",
  password:   process.env.ADMIN_PASSWORD   || "Epitome@25", 
};

export const adminAuthController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    //  Validate against allowed credentials
    if (email !== allowedAdmin.email || password !== allowedAdmin.password) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    //  Check DB for admin existence
    let admin = await adminLogin.findOne({ email });

    if (!admin) {
      // If admin not in DB, hash and save
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await adminLogin.create({ email, password: hashedPassword });
      // console.log(" Admin registered successfully");
    }

    //  Create token and set cookie
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // await adminLogin.findByIdAndUpdate(token, {
    //   refresh_token: refreshToken, // Store refresh token in DB
    //   last_login_date: new Date(),
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: admin ? "Admin login successful" : "Admin registered and logged in",
      token,
      email: admin.email,
    });
  } catch (error) {
    console.error("🔥 Auth Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


//logout controller
export const adminLogoutController = (req, res) => {
  try {
    const adminId = req.adminId; // ensures it's a verified request
    console.log("Logging out admin:", adminId);

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




