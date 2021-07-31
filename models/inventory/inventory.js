const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    date: String,
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number
        }]
    }
}, { collection: 'inventory', versionKey: false });

const InventoryModel = mongoose.model('inventory', inventorySchema);
module.exports = InventoryModel;