import slugify from "slugify";
import CategoryModel from "../../../../DB/models/category.model.js";
import {
  deleteData,
  deleteImg,
  getData,
  getDocById,
} from "../../../util/model.util.js";
import { catchError } from "../../../util/Error/catchError.js";
import { AppError } from "../../../util/Error/AppError.js";
import cloudinary from "../../../multer/cloudinary.js";

export const getAllCategories = catchError(
  getData(CategoryModel, "http://localhost:3000/category")
);

export const getCategory = catchError(getDocById(CategoryModel));

export const addCategory = catchError(async (req, res, next) => {
  const { name, description } = req.body;
  const slug = slugify(name, "-");
  const existName = await CategoryModel.findOne({ name });
  if (existName) {
    return next(new AppError("Name Already exist", 409));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/product/productsImage" })
  req.body.logo = { public_id, secure_url }
  req.body.slug = slug;
  const result = await CategoryModel.create(req.body);
  res.json({ message: "success",result });
});

export const UpdateCategory = catchError(async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(name, "-");
    const existName = await CategoryModel.findOne({ name });
    if (existName && existName._id != id) {
      return next(new AppError("Name Already exist", 409));
    }
  }
  const result = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    return next(new AppError("Not Found", 404));
  }
  res.json({ message: "success", result });
});

export const deleteCategory = catchError(deleteData(CategoryModel));

export const deleteCategoryImg = catchError(deleteImg(CategoryModel));

export const addPhoto = catchError(async (req, res, next) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "E-Commerce/categories/categoryImages" }
  );
  console.log(public_id, secure_url);
  res.json({ message: "success", public_id, secure_url });
});

export const getNames = catchError(async (req, res, next) => {
  const result = await CategoryModel.find().select("name");
  res.json({ message: "success", result });
});
