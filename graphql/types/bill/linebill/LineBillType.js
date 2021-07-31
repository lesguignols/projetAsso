const graphql = require('graphql');
const product = require('../../../models/product');
const ProductType = require('../../ProductType');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const LineBillType = new GraphQLObjectType({
    name: 'LineBill',
    description: "LineBillType correspond aux objets de type Ligne_facture.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la ligne de facture: c'est un identifiant unique."
        },
        product: {
            type: ProductType,
            description: "Correspond à l'identifiant du produit de la ligne de facture.",
            resolve(parentValue) {
                return product.findById(parentValue.product)
            }
        },
        quantity: {
            type: GraphQLInt,
            description: "Correspond à la quantité de produits de la ligne de facture."
        },
        price_unit: {
            type: GraphQLFloat,
            description: "Correspond au prix d'achat à l'unité d'un produit de la ligne de facture."
        },
        tva: {
            type: GraphQLFloat,
            description: "Correspond au % de la TVA du produit de la ligne de facture."
        },
        price_line: {
            type: GraphQLFloat,
            description: "Correspond au prix total de la ligne de facture."
        }
    })
});

module.exports = LineBillType;