import slugify from "slugify";
import { CustomersModel } from "../../../../DB/models/customers.model.js";
import { catchError } from "../../../util/Error/catchError.js";
import cloudinary from "../../../multer/cloudinary.js";
import { AppError } from "../../../util/Error/AppError.js";
import { getData } from "../../../util/model.util.js";

export const getAllCustomers = catchError(getData(CustomersModel));

export const addCustomer = catchError(async (req, res, next) => {
  req.body.map((el) => {
    el.slug =
      slugify(req.body[0].CustomerName) + "-" + Math.floor(Math.random() * 1e5);
  });
  const result = await CustomersModel.insertMany(req.body);

  res.status(201).json({ message: "success", result });
});

export const addPhoto = catchError(async (req, res, next) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "DashBoard/Customers/CustomersImages" }
  );
  req.body.CustomerImage = { public_id, secure_url };
  const customer = await CustomersModel.findById(req.body.customer);
  if (!customer) throw new AppError("In-Valid customer ID", 404);
  if (customer.CustomerImage) {
    await cloudinary.uploader.destroy(
      `${customer.CustomerImage.public_id}`,
      (result) => {
        return result;
      }
    );
  }
  const result = await CustomersModel.findByIdAndUpdate(
    req.body.customer,
    req.body,
    { new: true }
  );
  res.json({ message: "success", result });
});

export const upd = catchError(async (req, res, next) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "DashBoard/Customers/CustomersImages" }
  );
  const result = await CustomersModel.updateMany(
    { CustomerName: "Andrew McDownland" },
    { CustomerImage: { public_id, secure_url } }
  );
  res.json({ message: "success", result });
});

