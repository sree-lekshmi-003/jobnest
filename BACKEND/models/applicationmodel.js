const mongoose=require('mongoose');
const ApplicationSchema=new mongoose.Schema({
     user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Job",
        
        },
        status:{
            type:String,
            enum:["Pending","Accepted","Rejected"],
            default:"Pending"
        },
        
        

    },
        { timestamps: true })
    const Application = mongoose.model('application', ApplicationSchema)
    module.exports=Application
