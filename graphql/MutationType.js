const graphql = require('graphql');
const mongoose = require('mongoose');

const Adherent = require('./models/adherent');
const AdherentType = require('./types/AdherentType');

const Price = require('./models/price');
const PriceType = require('./types/PriceType');

const Product = require('./models/product');
const ProductType = require('./types/ProductType');

const Training = require('./models/training');
const TrainingType = require('./types/TrainingType');


const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID
} = graphql;

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        /**
         * 
         * 
         * Mutation adherent
         * 
         * 
         */
        addAdherent: {
            type: AdherentType,
            args: {
                card: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLID) },
                training: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let adherent = new Adherent({
                    _id: mongoose.Types.ObjectId(),
                    card: args.card,
                    name: args.name,
                    firstName: args.firstName,
                    link_photo: args.card + ".png",
                    email: args.email,
                    price: args.price,
                    training: args.training,
                    active: false,
                    member: false,
                    code: null,
                    secret_code: null,
                    administrator: false,
                    superAdministrator: false
                })
                return adherent.save()
            }
        },
        updateCardAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                card: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.card != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "card": args.card } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateNameAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.name != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateFirstNameAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.firstName != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "firstName": args.firstName } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateLink_photoAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                link_photo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.link_photo != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "link_photo": args.link_photo + ".png" } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateEmailAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.email != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "email": args.email } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updatePriceAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                if (args.price != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "price": args.price } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateTrainingAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                training: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                if (args.training != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "training": args.training } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateActiveAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.active != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateMemberAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                member: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.member != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "member": args.member } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateCodeAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: GraphQLInt }
            },
            resolve(parent, args) {
                if (args.code != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "code": args.code } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateSecret_codeAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                secret_code: { type: GraphQLInt }
            },
            resolve(parent, args) {
                if (args.secret_code != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "secret_code": args.secret_code } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateAdministratorAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                administrator: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.administrator != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "administrator": args.administrator } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateSuperAdministratorAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                superAdministrator: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.superAdministrator != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "superAdministrator": args.superAdministrator } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        /**
         * 
         * 
         * Mutation price
         * 
         * 
         */
        addPrice: {
            type: PriceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                let price = new Price({
                    _id: mongoose.Types.ObjectId(),
                    name: args.name,
                    price: args.price,
                    active: args.active
                })
                return price.save()
            }
        },
        updateNamePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updatePricePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "price": args.price } }, { new: true, useFindAndModify: false });
            }
        },
        updateActivePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
            }
        },
        removePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Price.findByIdAndRemove({ _id: args._id });
            }
        },
        /**
         * 
         * 
         * Mutation product
         * 
         * 
         */
        addProduct: {
            type: ProductType,
            args: {
                barcode: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                selling_price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let product = new Product({
                    _id: mongoose.Types.ObjectId(),
                    barcode: args.barcode,
                    name: args.name,
                    selling_price: args.selling_price
                })
                return product.save()
            }
        },
        updateBarcodeProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                barcode: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { "barcode": args.barcode }, { new: true, useFindAndModify: false });
            }
        },
        updateNameProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updateSelling_priceProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                selling_price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { $set: { "selling_price": args.selling_price } }, { new: true, useFindAndModify: false });
            }
        },
        removeProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndRemove({ _id: args._id });
            }
        },
        /**
         * 
         * 
         * Mutation training
         * 
         * 
         */
        addTraining: {
            type: TrainingType,
            args: {
                curriculum: { type: new GraphQLNonNull(GraphQLString) },
                wording: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let training = new Training({
                    _id: mongoose.Types.ObjectId(),
                    curriculum: args.curriculum,
                    wording: args.wording,
                    year: args.year
                })
                return training.save()
            }
        },
        updateCurriculumTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                curriculum: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "curriculum": args.curriculum } }, { new: true, useFindAndModify: false });
            }
        },
        updateWordingTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                wording: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "wording": args.wording } }, { new: true, useFindAndModify: false });
            }
        },
        updateYearTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "year": args.year } }, { new: true, useFindAndModify: false });
            }
        },
        removeTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndRemove({ _id: args._id });
            }
        }
    }
});

module.exports = MutationType;