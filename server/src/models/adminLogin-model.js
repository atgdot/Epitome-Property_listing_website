import mongoose from'mongoose';
const adminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    // required: true,
  },

},{ timestamps: true });
const AdminLogin = mongoose.model('AdminLogin', adminLoginSchema);
export default AdminLogin;