import mongoose from "mongoose";
import { phonesSchema } from "../../../../shared_models/phones_model";
import { statusSchema } from "../../../../shared_models/status_member_model";

const Schema = mongoose.Schema;

const documentNumberSchema = new Schema({
    document: { type: String, maxlenght: 20, unique: true },
    documentType: { type: String, enum: ['CC', 'CE', 'NIT'], default: 'CC' }
});

const userSchema = new Schema({

    settings: statusSchema,
    name: { type: String, maxlenght: 30 },
    avatar: { type: String, default: "avatar" },
    lastNames: { type: String, maxlenght: 30 },
    documentNumber: documentNumberSchema,
    phones: [phonesSchema],
    userScore: { type: Number, defaut: 0 },
    email: String
    
});

const model = mongoose.model('user', userSchema);
export = model;