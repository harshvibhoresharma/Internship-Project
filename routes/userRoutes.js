const express=require('express');
const router = express.Router();
const handlers=require('./handlers');

router.route('/:id')
.get(handlers.handleGetUserById)
.delete(handlers.handleDeleteUserById)
.patch(handlers.handleUpdateUserById);

router.route('/')
.get(handlers.handleGetAllUsers)
.post(handlers.handleCreateNewUser);

module.exports = router;
