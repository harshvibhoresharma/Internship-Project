const mongoose=require('mongoose');
const connectedDB = async () => {
  try{
    return await mongoose.connect('mongodb://127.0.0.1:27017/first-proj')
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}
module.exports=connectedDB;
