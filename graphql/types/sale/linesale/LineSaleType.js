const graphql = require('graphql');
const product = require('../../../models/product');
const ProductType = require('../../ProductType');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const LineSaleType = new GraphQLObjectType({
    name: 'LineSale',
    description: "LineSaleType correspond aux objets de type Ligne_vente.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la ligne de vente: c'est un identifiant unique."
        },
        product: {
            type: ProductType,
            description: "Correspond à l'identifiant du produit de la ligne dans la vente.",
            resolve(parentValue) {
                return product.findById(parentValue.product)
            }
        },
        quantity: {
            type: GraphQLInt,
            description: "Correspond à la quantité de produits dans la ligne de vente."
        },
        sum: {
            type: GraphQLFloat,
            description: "Correspond à la somme de à payer pour la ligne de vente."
        }
    })
});

module.exports = LineSaleType;