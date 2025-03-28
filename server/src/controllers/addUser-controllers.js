import addUser from "../models/adduser-model.js";
import { validationResult } from "express-validator";

// CREATE USER
export const createUser = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyNumber, license, action } = req.body;

    const newUser = new addUser({
      name,
      email,
      phone,
      propertyNumber,
      license,
      action,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      // data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, phone, propertyNumber, license, action } = req.body;

    const updatedUser = await addUser.findByIdAndUpdate(
      id,
      { name, phone, propertyNumber, email ,license, action },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        // data: updatedUser,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// search user by name
export const searchUserByName = async (req, res) => {
    try {
      const { name } = req.query; // Get the name from query params
  
      if (!name) {
        return res.status(400).json({ success: false, message: "Name is required for searching" });
      }
  
      // Case-insensitive search using regex
      const users = await addUser.find({ name: { $regex: name, $options: "i" } });
  
      if (users.length === 0) {
        return res.status(404).json({ success: false, message: "No users found" });
      }
  
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Delete User by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await addUser.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully",
      //  user: deletedUser
       });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};