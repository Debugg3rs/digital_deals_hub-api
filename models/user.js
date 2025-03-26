import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'vendor', 'superadmin'],
            default: 'user',
            required: true,
        },
        verified: {type: Boolean, default: false},
        mailCode: { type: Number },
        mailCodeExpires: { type: Date }
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
});



export const UserModel = model('User', userSchema);
