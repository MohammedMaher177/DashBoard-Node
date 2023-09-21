import joi from "joi";

export const addEmployeeValidation = {
    body: joi.array().items({
        Name: joi.string().required(),
        Title: joi.string().required(),
        HireDate: joi.date().required(),
        Country: joi.string().required(),
        ReportsTo: joi.string().required(),
    })
}