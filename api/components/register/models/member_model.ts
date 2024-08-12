import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    email: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    password: { 
        type: String, 
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['users', 'admins'],
        default: 'users'
    },
    accountId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'accountType'  // Referencia dinámica
    },
    token: String
});

// Crear índices únicos para username y email
memberSchema.index({ username: 1 }, { unique: true, sparse: true });
memberSchema.index({ email: 1 }, { unique: true, sparse: true });

const Member = mongoose.model('member', memberSchema);
export = Member;
