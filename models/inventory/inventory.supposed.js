const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySupposedSchema = new Schema({
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
}, { collection: 'inventorySupposed', versionKey: false });

inventorySupposedSchema.statics.sale = async function(product, quantity) {

    var lastInventory = await this.findOne().sort('-date');
    var listProducts = lastInventory.products;
    var newProduct = {};
    var newArray = [];
    listProducts.forEach(element => {
        if (element.product == product) {
            newProduct = {
                element: element._id,
                product: element.product,
                quantity: element.quantity - quantity
            };
            newArray.push(newProduct);
        } else {
            newArray.push(element);
        }
    });
    if (newArray != []) {
        return this.findByIdAndUpdate(lastInventory._id, {
            $set: { products: newArray }
        }, { new: true });
    }
};

inventorySupposedSchema.statics.bill = async function(product, quantity) {
    var newProduct = {};

    var lastInventory = await this.findOne().sort('-date');
    if (lastInventory != null) {
        var listProducts = lastInventory.products;
        var newArray = [];
        var productFind = false;
        listProducts.forEach(element => {
            if (element.product == product) {
                newProduct = {
                    _id: element._id,
                    product: element.product,
                    quantity: element.quantity + quantity
                };
                newArray.push(newProduct);
                productFind = true;
            } else {
                newArray.push(element);
            }
        });
        if (!productFind) {
            newProduct = {
                product: product,
                quantity: quantity
            };
            newArray.push(newProduct);
        }
        if (newArray != []) {
            return this.findByIdAndUpdate(lastInventory._id, {
                $set: { products: newArray }
            }, { new: true });
        }
    } else {
        let today = new Date();
        let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

        newProduct = {
            product: product,
            quantity: quantity
        };

        const newInventorySupposed = new InventorySupposedModel({
            date: date,
            products: newProduct
        });

        const inventorySupposed = await newInventorySupposed.save();
    }

};

const InventorySupposedModel = mongoose.model('inventorySupposed', inventorySupposedSchema);
module.exports = InventorySupposedModel;