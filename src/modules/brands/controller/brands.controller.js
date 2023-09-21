import slugify from "slugify"
import { deleteData, deleteImg, getData, getDocById } from "../../../util/model.util.js"
import BrandModel from "../../../../DB/models/brand.model.js"
import { catchError } from "../../../util/Error/catchError.js"
import { AppError } from "../../../util/Error/AppError.js"
import cloudinary from "../../../multer/cloudinary.js"

export const getAllBrands = catchError(getData(BrandModel))

export const getBrand = catchError(getDocById(BrandModel))

export const addBrand = catchError(async (req, res, next) => {
    const { name, description } = req.body
    req.body.slug = slugify(name, "-")
    const existName = await BrandModel.findOne({ name })
    if (existName) {
        return next(new AppError("Name Already exist", 409))
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/product/productsImage" })
    req.body.logo = { public_id, secure_url }
    const result = await BrandModel.create(req.body)
    res.status(201).json({ message: "success", result })
})

export const UpdateBrand = catchError(async (req, res, next) => {
    const { name, description } = req.body
    const { id } = req.params;
    const slug = slugify(name, "-")
    const updates = { name, description, slug }
    const existName = await BrandModel.findOne({ name })
    if (existName && !existName._id === id) {
        return next(new AppError("Name Already exist", 409))
    }
    const result = await BrandModel.findByIdAndUpdate(id, updates, { new: true })
    if (!result) {
        return next(new AppError("Not Found", 404))
    }
    res.status(201).json({ message: "success", result })
})

export const deleteBrand = catchError(deleteData(BrandModel))
export const deleteBrandImg = catchError(deleteImg(BrandModel))