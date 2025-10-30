const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide test name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide test description']
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Blood Test',
            'Urine Test',
            'Imaging',
            'Cardiac',
            'Diabetes',
            'Thyroid',
            'Liver Function',
            'Kidney Function',
            'Complete Checkup',
            'Other'
        ]
    },
    price: {
        type: Number,
        required: [true, 'Please provide test price'],
        min: 0
    },
    mrp: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    preparationInstructions: [String],
    reportDeliveryTime: {
        type: String,
        required: true // e.g., "24 hours", "48 hours"
    },
    homeCollectionAvailable: {
        type: Boolean,
        default: true
    },
    homeCollectionCharges: {
        type: Number,
        default: 0
    },
    parameters: [{
        name: String,
        description: String
    }],
    sampleType: {
        type: String,
        enum: ['Blood', 'Urine', 'Saliva', 'Stool', 'Other']
    },
    fastingRequired: {
        type: Boolean,
        default: false
    },
    isPackage: {
        type: Boolean,
        default: false
    },
    testsIncluded: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest'
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
    bookingsCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LabTest', labTestSchema);
