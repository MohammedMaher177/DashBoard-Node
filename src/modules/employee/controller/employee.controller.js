import slugify from "slugify";
import { catchError } from "../../../util/Error/catchError.js";
import { EmployeeModel } from "../../../../DB/models/employee.model.js";
import cloudinary from "../../../multer/cloudinary.js";
import { AppError } from "../../../util/Error/AppError.js";
import { getData } from "../../../util/model.util.js";

export const getAllEmployees = catchError(getData(EmployeeModel));

export const addEmployee = catchError(async (req, res, next) => {
  req.body.map((el) => {
    el.slug = slugify(req.body[0].Name) + "-" + Math.floor(Math.random() * 1e5);
  });
  const result = await EmployeeModel.insertMany(req.body);

  res.status(201).json({ message: "success", result });
});

export const addPhoto = catchError(async (req, res, next) => {
    console.log(req.file);
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "DashBoard/Employees/EmployeesImages" }
  );
  req.body.EmployeeImage = { public_id, secure_url };
  const employee = await EmployeeModel.findById(req.body.employee);
  if (!employee) throw new AppError("In-Valid Employee ID", 404);
  if (employee.EmployeeImage) {
    await cloudinary.uploader.destroy(
      `${employee.EmployeeImage.public_id}`,
      (result) => {
        return result;
      }
    );
  }
  const result = await EmployeeModel.findByIdAndUpdate(
    req.body.employee,
    req.body,
    { new: true }
  );
  res.json({ message: "success", result });
});

export const upd = catchError(async (req, res, next) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "DashBoard/Employees/EmployeesImages" }
  );
  const result = await EmployeeModel.updateMany({Name:"Miron Vitold"}, {EmployeeImage:{public_id, secure_url}})
  res.json({ message: "success", result });
})