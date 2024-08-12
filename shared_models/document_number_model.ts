const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentNumberSchema = new Schema({
    document: { type: String, maxlenght: 20, unique: true },
    documentType: { type: String, enum: ['CC', 'CE', 'NIT'], default: 'CC' }
}, { _id: false });

export { documentNumberSchema };