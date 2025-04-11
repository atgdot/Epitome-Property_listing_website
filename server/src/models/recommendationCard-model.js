// models/recommendationCard-model.js
import mongoose from 'mongoose';
import {
  BasicProperty,
  PropertyLocation,
  PropertyMedia,
} from "../models/addproperty-model.js";

const RecommendationSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BasicProperty',
    required: true
  }
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

export default Recommendation;
