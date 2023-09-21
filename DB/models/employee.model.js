import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
    Name:{
        type:String, require:true, trim:true,
    },Title:{
        type:String, require:true, trim:true,
    },HireDate:{
        type:Date, require:true
    },Country:{
        type:String, trim:true,
    },ReportsTo:{
        type:String, trim:true,
    },EmployeeImage:{
        public_id: String, secure_url: String 
    },slug:{
        type:String, trim:true, unique: true,
    }
})

// EmployeeSchema.post(/^find/, function (){
//     console.log(this.HireDate);
// })

export const EmployeeModel = model("Employee", EmployeeSchema)

