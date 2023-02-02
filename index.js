const dotenv=require('dotenv')
const express = require('express')
const userroute=require('./routes/users');
const authroute=require('./routes/auth');
const postroute=require('./routes/posts');
const app = express()
var cors = require('cors')


app.use(cors());
const port = 8000;
require('./mongo');
dotenv.config();

app.use(express.json()); 

app.use('/api/users', userroute);
app.use('/api/auth',authroute);
app.use('/api/posts',postroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
 