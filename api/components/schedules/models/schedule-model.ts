import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Esquema para definir un intervalo de tiempo con su precio por hora
const hourSchema = new Schema({
  from: { type: String, required: [true, 'La hora de inicio es un campo requerido.'] },
  to: { type: String, required: [true, 'La hora de fin es un campo requerido.'] },
  pricePerHour: { type: Number, required: [true, 'El precio por hora es un campo requerido.'] }
}, { _id: false });

// Esquema para definir los días de la semana y sus horarios de atención
const daySchema = new Schema({
  status: { type: String, enum: ['active', 'paused'], default: 'active' },
  day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], required: [true, 'El día es un campo requerido.'] },
  hours: { type: [hourSchema], default: [] }
}, { _id: false });

// Esquema para definir la configuración general del horario de una cancha
const scheduleSchema = new Schema({
  status: { type: String, enum: ['enabled', 'disabled'], default: 'disabled' },
  days: { type: [daySchema], default: [] }
}, { _id: false });

// Esquema principal que representa el horario completo asociado a una cancha
const mainScheduleSchema = new Schema({
  status: { type: String, enum: ['active', 'paused', 'deleted'], default: 'active' },
  fieldName: { type: String, maxlength: 50, required: [true, 'El nombre de la cancha es un campo requerido.'] },
  schedules: { type: [scheduleSchema], default: [] }
}, { timestamps: true });

// Modelo de Mongoose para los horarios de las canchas
const model = mongoose.model('Schedule', mainScheduleSchema);
export = model;