import mongoose, { Mongoose } from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Data")
const user = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  login:{
    type: String,
  },
  customerID:{
    type:String,
  },
  funding:{
    type:String,
  },
  message:[{
     type:String,
  }]
});

export default mongoose.models.User1 || mongoose.model("User1",user)