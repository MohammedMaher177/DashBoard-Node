import joi from "joi";

export const addCustomerValidatin = {
  body: joi.array().items(
    joi.object({
      CustomerName: joi.string().required(),
      CustomerEmail: joi.string().email().required(),
      ProjectName: joi.string().required(),
      Status: joi.string().valid("Active", "Pending", "Completed", "Cancel"),
      StatusBg: joi.string().valid("#8BE78B", "#FEC90F", "#8BE78B", "red"),
      Weeks: joi.number().positive().required(),
      Budget: joi.string().required(),
      Location: joi.string().required(),
    })
  ),
};
