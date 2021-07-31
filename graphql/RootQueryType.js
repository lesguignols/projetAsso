const graphql = require('graphql');

const Adherent = require('./models/adherent');
const AdherentType = require('./types/AdherentType');

const Price = require('./models/price');
const PriceType = require('./types/PriceType');

const Product = require('./models/product');
const ProductType = require('./types/ProductType');

const Settings = require('./models/settings');
const SettingsType = require('./types/SettingsType');

const Training = require('./models/training');
const TrainingType = require('./types/TrainingType');

const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        /**
         * 
         * 
         * Query adherent
         * 
         * 
         */
        adherentById: {
            type: AdherentType,
            args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.findById(args._id);
            }
        },
        adherentByCard: {
            type: new GraphQLList(AdherentType),
            args: { card: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.find({ card: args.card });
            }
        },
        adherentByCardAndCode: {
            type: new GraphQLList(AdherentType),
            args: {
                card: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return Adherent.find({ card: args.card, code: args.code, active: true });
            }
        },
        adherentByName: {
            type: new GraphQLList(AdherentType),
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.find({ name: args.name });
            }
        },
        adherentByFirstName: {
            type: new GraphQLList(AdherentType),
            args: { firstName: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.find({ firstName: args.firstName });
            }
        },
        adherentByPrice: {
            type: new GraphQLList(AdherentType),
            args: { price: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.find({ price: args.price });
            }
        },
        adherentByTraining: {
            type: new GraphQLList(AdherentType),
            args: { training: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Adherent.find({ training: args.training });
            }
        },
        adherentByActive: {
            type: new GraphQLList(AdherentType),
            args: { active: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve(parent, args) {
                return Adherent.find({ active: args.active });
            }
        },
        adherentByMember: {
            type: new GraphQLList(AdherentType),
            args: { member: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve(parent, args) {
                return Adherent.find({ member: args.member });
            }
        },
        adherentByAdmin: {
            type: new GraphQLList(AdherentType),
            args: { administrator: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve(parent, args) {
                return Adherent.find({ administrator: args.administrator });
            }
        },
        adherentBySA: {
            type: new GraphQLList(AdherentType),
            args: { superAdministrator: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve(parent, args) {
                return Adherent.find({ superAdministrator: args.superAdministrator });
            }
        },
        allAdherents: {
            type: new GraphQLList(AdherentType),
            resolve(parent, args) {
                return Adherent.find({});
            }
        },
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
         * Query product
         * 
         * 
         */
        productById: {
            type: ProductType,
            args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Product.findById(args._id);
            }
        },
        productsByBarcode: {
            type: new GraphQLList(ProductType),
            args: { barcode: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Product.find({ barcode: args.barcode });
            }
        },
        productsBySellingPrice: {
            type: new GraphQLList(ProductType),
            args: { selling_price: { type: new GraphQLNonNull(GraphQLFloat) } },
            resolve(parent, args) {
                return Product.find({ selling_price: args.selling_price });
            }
        },
        allProducts: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            }
        },
        /**
         * 
         * 
         * Query settings
         * 
         * 
         */
        settings: {
            type: SettingsType,
            resolve(parent, args) {
                return Settings.findOne({ useFindAndModify: false });
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