const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phonesSchema = new Schema({
    number: { type: String, maxlenght: 10 },
    prefix: { type: String, default: '+57' },
    isMobile: { type: Boolean, default: true }
}, { _id: false });

export { phonesSchema };