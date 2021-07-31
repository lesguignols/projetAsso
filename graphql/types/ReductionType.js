const graphql = require('graphql');
const product = require('../models/product');
const ProductType = require('./ProductType');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean
} = graphql;

const ReductionType = new GraphQLObjectType({
    name: 'Reduction',
    description: "ReductionType correspond aux objets de type Reduction.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la réduction: c'est un identifiant unique."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom de la réduction."
        },
        active: {
            type: GraphQLBoolean,
            description: "Si vrai, la réduction est active."
        },
        rate: {
            type: GraphQLFloat,
            description: "Correspond au % de réduction sur les produits concernant la réduction."
        },
        products: {
            type: new GraphQLList(ProductType),
            description: "Liste contenant les identifiants des produits qui concerne la réduction.",
            resolve(parentValue) {
                return product.find({ _id: parentValue.products });
            }
        }
    })
});

module.exports = ReductionType;