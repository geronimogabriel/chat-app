import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    
    const loggedInUserId = req.user._id;

    // Get all users except the logged in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

    res.status(200).json({ users: filteredUsers });

  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}