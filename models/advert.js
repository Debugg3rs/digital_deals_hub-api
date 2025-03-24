import { Schema, model, Types } from "mongoose"

const advertSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, },
    category: {type: String, required: true, enum: ['laptops', 'smartphones', 'headphones', 'smartwatch', 'accessories']},
    price: {type: Number, required: true,},
    image: {type: String, required: true,},
    userId: {type: Types.ObjectId, required: true, ref:"User"}
}, {
    timestamps: true
});


export const AdvertModel = model('Advert', advertSchema)


