import { Router } from "express";
import { UpdateCategory, addCategory, addPhoto, deleteCategory, deleteCategoryImg, getAllCategories, getCategory, getNames } from "./controller/category.controller.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./controller/category.validation.js";
import { uploadImage, uploadValidation } from "../../multer/multer.cloud.js";
import { validate } from "../../middleware/validation.js";
import { allowedTo, authMiddleware } from "../../middleware/authentication.js";


const categoryRouter = Router();

/**Get All Categories && Add Category */
categoryRouter.route("/")
    .get(getAllCategories)
    .post(uploadImage(uploadValidation.image).single("CategoryImage"), validate(addCategoryValidation), addCategory)


categoryRouter.post("/addPhoto", uploadImage(uploadValidation.image).single("logo"), addPhoto)
categoryRouter.get("/names", getNames)
/**Update Category && Delete Category*/
categoryRouter.route("/:id")
    .get(getCategory)
    .put(validate(updateCategoryValidation), UpdateCategory)
    .delete(validate(deleteCategoryValidation), authMiddleware, allowedTo("admin", "user"), deleteCategory)
    // .delete(validate(deleteCategoryValidation), deleteCategory)
categoryRouter.delete("/:id/image", deleteCategoryImg)
export default categoryRouter;

