import addAgent from "../models/adduser-model.js";
import { validationResult } from "express-validator";

// CREATE USER
export const createAgent = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyNumber, license, action } = req.body;

    const newUser = new addAgent({
      name,
      email,
      phone,
      propertyNumber,
      license,
      Profile_Image
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
export const updateAgent = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, phone, propertyNumber, license, action } = req.body;

    const updatedUser = await addAgent.findByIdAndUpdate(
      id,
      { name, phone, propertyNumber, license, action },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      // data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// search user by name
export const searchAgentByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the name from query params

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required for searching" });
    }

    // Case-insensitive search using regex
    const users = await addAgent.find({
      name: { $regex: name, $options: "i" },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true,
      //  data: users
       });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE USER BY ID
export const deleteAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await addAgent.findByIdAndDelete(id);

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