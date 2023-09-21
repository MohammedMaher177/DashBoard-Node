// import { ApiFeatures } from "./ApiFeatures.js";
// import { catchError } from "./Error/catchError.js";


// export const getData = (model)=>{
//     return async(req, res, next) => {
//         const apiFeatures = new ApiFeatures(model.find(), req.query)
//       .pagination()
//       .sort()
//       .filter()
//       .fields()
//       .search();

//     let result = await apiFeatures.mongooseQuery;

//     res.json({
//       message: "success",
//       page: apiFeatures.queryString.page || 1,
//       result,
//     });
//     }
// }