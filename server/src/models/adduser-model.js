import mongoose from'mongoose';


const addUSerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  propertyNumber : {
    type: String,
    require: true
  },
  license: {
    type: String,
  },
  Profile_Image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTHGqtTtGcjOE3uy1fZxAcyXsAdr1XWLbXw&s"
  }
},{timestamps: true});

const  AddUser = mongoose.model('addUser', addUSerSchema);

 export default AddUser;