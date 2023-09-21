import { Router } from "express";
import { addCustomer, addPhoto, getAllCustomers, upd } from "./controller/customer.controller.js";
import { validate } from "../../middleware/validation.js";
import { addCustomerValidatin } from "./controller/customer.validation.js";
import { uploadImage, uploadValidation } from "../../multer/multer.cloud.js";



const customerRouter = Router()
customerRouter.get("/", getAllCustomers)
customerRouter.post("/", validate(addCustomerValidatin), addCustomer)
customerRouter.post("/addPhoto", uploadImage(uploadValidation.image).single("CustomerImage"), upd)

export default customerRouter;