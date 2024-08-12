const mongoose = require("mongoose");
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

export { addressSchema };