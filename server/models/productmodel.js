const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Please specify product category'],
        enum: [
            'medicine',
            'supplement',
            'medical-device',
            'personal-care',
            'ayurvedic',
            'fitness',
            'mother-baby',
            'surgical',
            'healthcare-devices'
        ]
    },
    subCategory: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: [true, 'Please provide brand name']
    },
    manufacturer: String,
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price cannot be negative']
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
    stock: {
        type: Number,
        required: [true, 'Please specify stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    images: [{
        url: String,
        alt: String
    }],
    packSize: {
        type: String,
        required: true
    },
    dosageForm: {
        type: String,
        enum: ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment', 'drops', 'powder', 'spray', 'other']
    },
    prescriptionRequired: {
        type: Boolean,
        default: false
    },
    composition: String,
    uses: [String],
    sideEffects: [String],
    precautions: [String],
    dosage: String,
    storage: String,
    expiryDate: Date,
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
    tags: [String],
    healthConditions: [String], // For recommendations
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    salesCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ healthConditions: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
