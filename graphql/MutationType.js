const graphql = require('graphql');
const mongoose = require('mongoose');

const Price = require('./models/price');
const PriceType = require('./types/PriceType');

const Training = require('./models/training');
const TrainingType = require('./types/TrainingType');


const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
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