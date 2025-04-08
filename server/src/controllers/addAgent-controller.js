import addAgent from "../models/addAgent-model.js";
import { validationResult } from "express-validator";


// Create a new agent
export const createAgent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyNumber } = req.body;
    const Profile_Image = req.files?.profileImage ? req.files.profileImage[0].path : null;
    const licenseFile = req.files?.license ? req.files.license[0].path : null;

    const newAgent = new addAgent({
      name,
      email,
      phone,
      propertyNumber,
      license: licenseFile,
      Profile_Image: Profile_Image,
    });

    const savedAgent = await newAgent.save();
    
    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agentId: savedAgent._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get agent by id
export const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await addAgent.findById(id);

    if (!agent) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    res.status(200).json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
  

/// Update agent details
export const updateAgent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, phone, propertyNumber } = req.body;
    const Profile_Image = req.files?.profileImage ? req.files.profileImage[0].path : null;
    const licenseFile = req.files?.license ? req.files.license[0].path : null;

    const updatedUser = await addAgent.findByIdAndUpdate(
      id,
      { name, phone, propertyNumber, license: licenseFile, Profile_Image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchAgentByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required for searching" });
    }

    const users = await addAgent.find({
      name: { $regex: name, $options: "i" },
    });

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete agent by id
export const deleteAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await addAgent.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await addAgent.find();

    if (agents.length === 0) {
      return res.status(404).json({ success: false, message: "No agents found" });
    }

    res.status(200).json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
