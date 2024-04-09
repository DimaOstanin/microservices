import mongoose from 'mongoose';

const containerThresholdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    minimumThreshold: {
      type: Number,
      required: true,
    },
    
    
    
  },
  { timestamps: true }
);

const ContainerThreshold = mongoose.model('container', containerThresholdSchema);

export default ContainerThreshold;
