import mongoose from'mongoose';

const RecommendationSchema = new mongoose.Schema({
  property_Title: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Image_url:{
    type: String,
    default: null

  },
  upload_image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFyOawV-vkbcs93PoP0SVuygYoFDmLVLNeA&s"
  },

},{timestamps: true})

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

export default Recommendation;