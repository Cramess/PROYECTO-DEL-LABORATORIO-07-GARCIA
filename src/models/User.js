import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true,
        match: [/^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&\*@]).{8,}$/, 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 dígito y 1 carácter especial (# $ % & * @)']
    },
    roles: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    }],
    name: { 
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    url_profile: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual para la edad
UserSchema.virtual('age').get(function() {
    if (!this.birthdate) return null;
    const today = new Date();
    let age = today.getFullYear() - this.birthdate.getFullYear();
    const m = today.getMonth() - this.birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthdate.getDate())) {
        age--;
    }
    return age;
});

export default mongoose.model('User', UserSchema);
