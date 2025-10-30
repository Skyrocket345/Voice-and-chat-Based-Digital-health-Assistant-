const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: [true, 'Please specify doctor specialization'],
        enum: [
            'General Physician',
            'Cardiologist',
            'Dermatologist',
            'Pediatrician',
            'Orthopedic',
            'Gynecologist',
            'Neurologist',
            'Psychiatrist',
            'Dentist',
            'ENT Specialist',
            'Ophthalmologist',
            'Urologist'
        ]
    },
    qualifications: [{
        degree: String,
        institution: String,
        year: Number
    }],
    experience: {
        type: Number,
        required: [true, 'Please specify years of experience'],
        min: 0
    },
    registrationNumber: {
        type: String,
        required: [true, 'Please provide medical registration number'],
        unique: true
    },
    about: {
        type: String,
        maxlength: [1000, 'About section cannot exceed 1000 characters']
    },
    languages: [String],
    consultationFee: {
        type: Number,
        required: [true, 'Please specify consultation fee'],
        min: 0
    },
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        slots: [{
            startTime: String,
            endTime: String,
            isBooked: {
                type: Boolean,
                default: false
            }
        }]
    }],
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    totalConsultations: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
