const graphql = require('graphql');

const Price = require('./models/price');
const PriceType = require('./types/PriceType');

const Training = require('./models/training');
const TrainingType = require('./types/TrainingType');

const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        /**
         * 
         * 
         * Query price
         * 
         * 
         */
        priceById: {
            type: PriceType,
            args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Price.findById(args._id);
            }
        },
        pricesByActive: {
            type: new GraphQLList(PriceType),
            args: { active: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve(parent, args) {
                return Price.find({ active: args.active });
            }
        },
        allPrices: {
            type: new GraphQLList(PriceType),
            resolve(parent, args) {
                return Price.find({});
            }
        },
        /**
         * 
         * 
         * Query training
         * 
         * 
         */
        trainingById: {
            type: TrainingType,
            args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Training.findById(args._id);
            }
        },
        trainingsByCurriculum: {
            type: new GraphQLList(TrainingType),
            args: { curriculum: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Training.find({ curriculum: args.curriculum });
            }
        },
        trainingsByWording: {
            type: new GraphQLList(TrainingType),
            args: { wording: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Training.find({ wording: args.wording });
            }
        },
        allTrainings: {
            type: new GraphQLList(TrainingType),
            resolve(parent, args) {
                return Training.find({});
            }
        }
    }
});

module.exports = RootQueryType;