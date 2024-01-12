const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        max: 20,
        min: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50

    },
    password:{
        type: String,
        required: true,
        max: 10,
        min: 6
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
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
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3] 
    }

},
{timestamps:true}
)

module.exports= mongoose.model("User",userSchema);