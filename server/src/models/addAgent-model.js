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
    reuire: true
  },
  Action: {
    type:  String,
   default: "pending"
  },
},{timestamps: true});

const  addAgent = mongoose.model('addAgent', addAgentSchema);

 export default addAgent;