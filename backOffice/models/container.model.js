import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    unit: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    
    
  },
  { timestamps: true }
);

const Container = mongoose.model('container', containerSchema);

export default Container;
