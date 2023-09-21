import { Router } from "express";
import { validate } from "../../middleware/validation.js";



const orderRouter = Router()
orderRouter.get("/", getAllCustomers)
orderRouter.post("/", validate(addCustomerValidatin), addCustomer)
orderRouter.post("/addPhoto", uploadImage(uploadValidation.image).single("CustomerImage"), upd)

export default orderRouter;