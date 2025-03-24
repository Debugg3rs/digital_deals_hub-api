import Joi from "joi";

const addAdvertValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('laptops', 'smartphones', 'headphones', 'smartwatch', 'accessories').required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
});
  
const updateAdvertValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('laptops', 'smartphones', 'headphones', 'smartwatch', 'accessories').required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
});