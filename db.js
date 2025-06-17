const mongoose=require('mongoose');
mongoose
.connect('mongodb://127.0.0.1:27017/first-proj')
.then(() =>console.log('MongoDB connected'))
.catch(err=>console.log(err));
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : false,
    },
    email : {
        type : String,
        required : true,
    },
    jobTitle : {
        type : String,
    },
    gender : {
        type : String,

    },


})
const user = mongoose.model('user',userSchema);