import mongoose from "mongoose";
import { phonesSchema } from "../../../../shared_models/phones_model";
import { documentNumberSchema } from "../../../../shared_models/document_number_model";
import { statusSchema } from "../../../../shared_models/status_member_model";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: { type: String, required: [true, 'La dirección es un campo obligatorio.']},
    neighbor: { type: String, required: [true, 'El barrio es un campo obligatorio.']},
    addressDirections: String,
    country: String,
    country_code: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: '2dsphere' },
      is_location_exact: Boolean
    } 
}, { _id: false });

addressSchema.index({ location: "2dsphere" }, { partialFilterExpression: { "location.coordinates": { $exists: true } } });

const courtsImages = new Schema({
    path: { type: String }
}, { timestamps: true, _id: false });

const adminSchema = new Schema({

    settings: statusSchema,
    name: { type: String, maxlenght: 300 },
    avatar: { type: String, default: "avatar" },
    addressSettings: addressSchema,
    phones: [phonesSchema],
    documentNumber: documentNumberSchema,
    operatingHours: [
        { 
            from: { type: Number, min: 0, max: 24 },
            to: { type: Number, min: 0, max: 24 }
        }
    ],
    images: [courtsImages],
    email: { type: String, maxlenght: 50 }
});

const model = mongoose.model('admin', adminSchema);
export = model;
