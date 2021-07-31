const graphql = require('graphql');
const product = require('../../../models/product');
const ProductType = require('../../ProductType');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt
} = graphql;

const ProductOfferType = new GraphQLObjectType({
    name: 'ProductOffer',
    description: "ProductOfferType correspond aux objets de type Produit_dans_l'offre.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la ligne de facture: c'est un identifiant unique."
        },
        product: {
            type: ProductType,
            description: "Correspond à l'identifiant du produit dans l'offre.",
            resolve(parentValue) {
                return product.findById(parentValue.product)
            }
        },
        quantity: {
            type: GraphQLInt,
            description: "Correspond à la quantité de produits dans l'offre."
        }
    })
});

module.exports = ProductOfferType;