import addUser from "../models/adduser-model.js";
import { validationResult } from "express-validator";

// CREATE USER
export const createUser = async (req, res) => {
  console.log("📩 [DEBUG] Incoming POST /user/create Request Body:", req.body);

  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ [DEBUG] Validation Errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyNumber, license, action } = req.body;

    console.log("📝 [DEBUG] Creating User with Data:", {
      name, email, phone, propertyNumber, license, action
    });

    const newUser = new addUser({
      name,
      email,
      phone,
      propertyNumber,
      license,
      action,
    });
    await newUser.save();

    console.log("✅ [DEBUG] User Created Successfully:", newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("🔥 [ERROR] Server Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  console.log("📩 [DEBUG] Incoming PUT /user/update Request Body:", req.body);
  console.log("🆔 [DEBUG] User ID from Params:", req.params.id);

  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ [DEBUG] Validation Errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, phone, propertyNumber, email, license, action } = req.body;

    console.log("📝 [DEBUG] Updating User Data:", { id, name, phone, propertyNumber, email, license, action });

    const updatedUser = await addUser.findByIdAndUpdate(
      id,
      { name, phone, propertyNumber, email, license, action },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log("❌ [DEBUG] User Not Found for ID:", id);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ [DEBUG] User Updated Successfully:", updatedUser);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("🔥 [ERROR] Server Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH USER BY NAME
export const searchUserByName = async (req, res) => {
  console.log("📩 [DEBUG] Incoming GET /user/search Request Query:", req.query);

  try {
    const { name } = req.query;

    if (!name) {
      console.log("❌ [DEBUG] Missing 'name' Query Parameter");
      return res.status(400).json({ success: false, message: "Name is required for searching" });
    }

    console.log("🔍 [DEBUG] Searching for Users with Name:", name);

    const users = await addUser.find({ name: { $regex: name, $options: "i" } });

    if (users.length === 0) {
      console.log("❌ [DEBUG] No Users Found for Name:", name);
      return res.status(404).json({ success: false, message: "No users found" });
    }

    console.log("✅ [DEBUG] Users Found:", users);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("🔥 [ERROR] Server Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE USER BY ID
export const deleteUserById = async (req, res) => {
  console.log("📩 [DEBUG] Incoming DELETE /user/delete Request for ID:", req.params.id);

  try {
    const { id } = req.params;

    console.log("🗑️ [DEBUG] Deleting User with ID:", id);

    const deletedUser = await addUser.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("❌ [DEBUG] User Not Found for ID:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ [DEBUG] User Deleted Successfully:", deletedUser);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("🔥 [ERROR] Server Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
