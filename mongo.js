const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/socialmedia').then(()=>{
    console.log('connection success')
}).catch((err)=>{
    console.log('not conected');
})
