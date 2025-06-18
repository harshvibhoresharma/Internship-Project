const User= require('../models/user');
async function handleGetAllUsers(req,res) {
    try{
    const allUsers=await User.find({})
    return res.status(200).json(allUsers);
    }catch(err){
        return res.status(500).json({error : `${err}`});
    }
    
}
async function handleGetUserById(req,res) {
    try{
        const userById=await User.findById(req.params.id.trim());
        return res.status(200).json(userById);
    }catch(err){
        return res.status(500).json({error : `${err}`});
    }
}

async function handleUpdateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id.trim(),
      req.body,                  // New data to update
      { new: true, runValidators: true } // Return the updated doc & validate
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser); // Send back updated user
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
  }
}
async function handleDeleteUserById(req,res) {
    try{
        await User.findByIdAndDelete(req.params.id.trim());
        return res.status(200).json({status : `${req.params.id} deleted successfully`});

    }catch(err){
        return res.status(500).json({error : `${err}`});
    }
    
}
async function handleCreateNewUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save(); 

    return res.status(201).json(savedUser); 
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};
