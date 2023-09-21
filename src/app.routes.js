import connectionDb from "../DB/dbConnection.js"
import authRouter from "./modules/auth/auth.routes.js"
import brandRouter from "./modules/brands/brands.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import customerRouter from "./modules/customer/customer.routes.js"
import employeeRouter from "./modules/employee/employee.routes.js"
import productRouter from "./modules/product/product.routes.js"
import { AppError } from "./util/Error/AppError.js"


export const bootstrap = (app) => {
    connectionDb()
    app.get("/", (req, res)=>{
        res.json("hello")
    })
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/employees", employeeRouter)
    app.use("/api/v1/customers", customerRouter)
    app.use("/api/v1/products", productRouter)
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/brands", brandRouter)



    app.all("*", (req, res, next) => {
        next(new AppError("Page Not Found", 404));
      });
    
      app.use((err, req, res, next) => {
        const error = err.message;
        const code = err.statusCode || 500;
        process.env.MODE == "PRODUCTION"
          ? res.status(code).json({ message: "Error", error })
          : res.status(code).json({ message: "Error", error, stack: err.stack });
      });
}