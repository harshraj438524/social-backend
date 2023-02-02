const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    }, 
    description:{
        type:String,
        max:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const professional=mongoose.model('post',postSchema);
module.exports=professional;