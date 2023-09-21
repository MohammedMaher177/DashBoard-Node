import cloudinary from "../multer/cloudinary.js";
import { ApiFeatures } from "./ApiFeatures.js";
import { AppError } from "./Error/AppError.js";


export const getData = (model, n) => {
  // console.log(n);
  return async (req, res) => {
    // console.log(req.query);
    const apiFeatures = new ApiFeatures(model.find(), req.query)
      .pagination()
      .sort()
      .filter()
      .fields()
      .search();

    let result = await apiFeatures.mongooseQuery;

    res.json({
      message: "success",
      page: apiFeatures.queryString.page || 1,
      result,
    });
  };
};

export const deleteData = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findByIdAndDelete(id);
    if (!result) {
      return next(new AppError("Not Found", 404));
    }
    if (result.user) {
      if (result.user !== userId) {
        return next(new AppError("Not Authorized", 401));
      }
    }
    res.status(201).json({ message: "success", result });
  };
};

export const getDocById = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findById(id);

    if (result) {
      return res.status(200).json({ message: "success", result });
    } else {
      return next(new AppError("Not Found", 404));
    }
  };
};

export const deleteImg = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const { public_id } = req.body;
    const { result } = await cloudinary.uploader.destroy(
      `${public_id}`,
      (result) => {
        return result;
      }
    );
    if (result === "ok") {
      await model.findByIdAndUpdate(id, { logo: null });
      return res.json({ message: "success", param: "Image Deleted" });
    } else if (result === "not found") {
      return next(new AppError("In-Valid public_id", 404));
    }
  };
};



// export const addToCart = catchError(async (req, res, next) => {
//     const { _id } = req.user
//     const { product, qty } = req.body
//     const existProduct = await productModel.findById(product).select("price")
//     if (!existProduct) {
//         throw new AppError("In-Valid Product ID", 404)
//     }
//     req.body.qty = qty > -1 ? qty : 1
//     req.body.price = qty * existProduct.price
//     let cart = await cartModel.findOne({ user: _id })
//     if (!cart) {
//         console.log(req.body);
//         cart = await cartModel.create({ user: _id, products: req.body, totalAmount: req.body.price })
//         return res.status(201).json({ message: "success", cart })
//     }


//     let index
//     cart.products.forEach((el, i) => {
//         if (el.product._id.toString() === existProduct) {
//             index = i
//             return
//         }
//     });

//     if (index || index == 0) {

//         if (qty > 0) {
//             cart.products[index].qty = qty
//             cart.products[index].price = req.body.price
//         } else if (qty == 0) {
//             cart.products.splice(index, 1)  // to delete the card 
//         } else {
//             cart.products[index].qty++
//             cart.products[index].price = req.body.price
//         }
//     } else {
//         if (qty == 0) {
//             throw new AppError("Bad request", 400)
//         }
//         cart.products.push(req.body)


//     }
//     let totatlCartPrice = 0;
//     for (const item of cart.products) {
//         const totalItemPrice = item.qty * item.product.price;

//         totatlCartPrice += totalItemPrice;
//     }
//     cart.totalAmount = totatlCartPrice;
//     await cart.save()
//     return res.status(201).json({ message: "success", cart })
// })