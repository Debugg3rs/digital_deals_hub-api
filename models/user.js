import{Schema,model} from 'mongoose';

const userShema = new Schema(
    {
        name: {
            type: String,required: [true,'Name is required'],
        },
        email:{
            type: String,required: [true,'Email is required'],
            unique: true,
        },
        password: {
            type: String,required: [true,'Password is required'],
        },
        role:{
            type: String,enum: ['user','vendor'],
            default: 'user',
            required: true,
        },
    },
    {timestamps: true}
);

export const User = model('User,',userSchema);