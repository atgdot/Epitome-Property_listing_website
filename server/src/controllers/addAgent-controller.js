import addAgent from "../models/adduser-model.js";
import { validationResult } from "express-validator";

// CREATE AGENT
export const createAgent = async (req, res) => {
  console.log("[DEBUG] Inside createAgent Controller");
  
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("[DEBUG] Validation Errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyNumber, license } = req.body;

    const newAgent = new addAgent({
      name,
      email,
      phone,
      propertyNumber,
      license,
      Profile_Image
    });

    const savedAgent = await newAgent.save();

    console.log("[DEBUG] Agent Created:", savedAgent);
    
    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agentId: savedAgent._id  // ✅ Return the ID of the newly created agent
    });
  } catch (error) {
    console.error("[ERROR] Create Agent Failed:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET AGENT BY ID
export const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("[DEBUG] Fetching Agent with ID:", id);

    const agent = await addAgent.findById(id);

    if (!agent) {
      console.log("[DEBUG] Agent Not Found:", id);
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    res.status(200).json({
      success: true,
      agent
    });
  } catch (error) {
    console.error("[ERROR] Fetching Agent Failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER
export const updateAgent = async (req, res) => {
  console.log("[DEBUG] Inside updateAgent Controller");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("[DEBUG] Validation Errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    console.log("[DEBUG] Updating user:", req.params.id, req.body);

    const { id } = req.params;
    const { name, phone, propertyNumber, license } = req.body;

    const updatedUser = await addAgent.findByIdAndUpdate(
      id,
      { name, phone, propertyNumber, license },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log("[DEBUG] User not found for update:", id);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("[DEBUG] User updated successfully:", updatedUser);

    res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("[ERROR] Failed to update user:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH USER BY NAME
export const searchAgentByName = async (req, res) => {
  console.log("[DEBUG] Inside searchAgentByName Controller");

  try {
    const { name } = req.query;
    if (!name) {
      console.log("[DEBUG] Name query param missing");
      return res.status(400).json({ success: false, message: "Name is required for searching" });
    }

    console.log("[DEBUG] Searching for users with name:", name);

    const users = await addAgent.find({
      name: { $regex: name, $options: "i" },
    });

    if (users.length === 0) {
      console.log("[DEBUG] No users found for name:", name);
      return res.status(404).json({ success: false, message: "No users found" });
    }

    console.log("[DEBUG] Found users:", users);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[ERROR] Failed to search users:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE USER BY ID
export const deleteAgentById = async (req, res) => {
  console.log("[DEBUG] Inside deleteAgentById Controller");

  try {
    const { id } = req.params;
    console.log("[DEBUG] Deleting user with ID:", id);

    const deletedUser = await addAgent.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("[DEBUG] User not found for deletion:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("[DEBUG] User deleted successfully:", deletedUser);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("[ERROR] Failed to delete user:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET ALL AGENTS
export const getAllAgents = async (req, res) => {
  try {
    console.log("[DEBUG] Fetching All Agents...");
    
    const agents = await addAgent.find();

    if (agents.length === 0) {
      return res.status(404).json({ success: false, message: "No agents found" });
    }

    res.status(200).json({
      success: true,
      agents
    });
  } catch (error) {
    console.error("[ERROR] Fetching All Agents Failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
