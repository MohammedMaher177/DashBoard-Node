import { Schema, model } from "mongoose";

const CustomersSchema = new Schema({
    CustomerName:{
        type:String, require:true, trim:true,
    },TotalAmount:{
        type:Number, require:true,
    },CustomerImage:{
        public_id: String, secure_url: String 
    },ProjectName:{
        type:String, require:true, trim:true,
    },Status:{
        type:String, trim:true, enum:["Active", "Pending", "Completed", "Cancel"], default : "Active"
    },StatusBg:{
        type:String, trim:true, enum:["#8BE78B", "#FEC90F", "#8BE78B", "red"], default : "'#8BE78B"
    },Weeks:Number,
    Budget:String,
    Location:String,
    slug:{
        type:String, trim:true, unique: true,require:true
    }, 
    
})

// CustomersSchema.post(/^find/, function (){
//     console.log(this.HireDate);
// })

export const CustomersModel = model("Customers", CustomersSchema)

