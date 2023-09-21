import { Router } from "express";
import { addEmployee, addPhoto, getAllEmployees, upd } from "./controller/employee.controller.js";
import { validate } from "../../middleware/validation.js";
import { addEmployeeValidation } from "./controller/employee.validation.js";
import { uploadImage, uploadValidation } from "../../multer/multer.cloud.js";

const employeeRouter = Router()

employeeRouter.post("/", validate(addEmployeeValidation), addEmployee)
employeeRouter.post("/addPhoto", uploadImage(uploadValidation.image).single("EmployeeImage"), addPhoto)
employeeRouter.get("/", getAllEmployees)


export default employeeRouter;