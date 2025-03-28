import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    Designation: {
        type: String,
        require: true, 
    },
    Testimonial_text : {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Ensures rating is between 1 and 5
      },
      review: {
        type: String,
        required: false, // Optional review text
      },
      profile_photo: {
        type: String,
        require: true,
        default: null
      },
     
}, { timestamps: true })

const review = mongoose.model("review", reviewSchema)

export default review