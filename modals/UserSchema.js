const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true 
    }, 
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilepicture:{
     type:String,
     default:"",
    },
    coverpicture:{
     type:String,
     default:"",
    },  
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        dafault:false
    },   
    description:{
        type:String,
        max:100,
    },
    city:{
        type:String,
        max:20
    },
    from:{
        type:String,
        max:20,
    },
    relationship:{
        type:Number,
        enum:[1,2,3],

    }
},{timestamps:true})

const professional=mongoose.model('userprofile',userSchema);
module.exports=professional;