import mongoose, { Mongoose } from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Data")
const user = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owner:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User1'
  }]
});

export default mongoose.models.User || mongoose.model("User",user)