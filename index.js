const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const users=require('./dummy_dataset_1000.json');
app.use(express.json())

app.route('/user')
.get((req,res) => {

    html=`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
    <h1> NAMES </h1>
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join('')}
    </ul>
    
</body>
</html>
    `
    res.send(html);    
})
.post((req,res) => {
    const newUser=req.body;
    if(!newUser.first_name || !newUser.email || !newUser.gender){
        return res.status(400).send("missing required fields");
    }
    newUser.id=users[users.length-1].id+1;
    users.push(newUser);
    res.status(201).send(`${newUser.first_name} added successfully` );

})



app.listen(PORT,() => {
    console.log(`server running at http://localhost:${PORT}`);
})
