import mongoose from'mongoose';


const addAgentSchema = new mongoose.Schema({
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
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0lpFqhun73Bm_lZLxBD9UumI8kBphIY2mA&s"
  }
 
},{timestamps: true});

const  addAgent = mongoose.model('addAgent', addAgentSchema);

 export default addAgent;