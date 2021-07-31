const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat
} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: "ProductType correspond aux objets de type Produit.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du produit: c'est un identifiant unique."
        },
        barcode: {
            type: GraphQLString,
            description: "Correspond au code barre du produit."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom du produit."
        },
        selling_price: {
            type: GraphQLFloat,
            description: "Correspond au prix de vente initiale du produit."
        }
    })
});

module.exports = ProductType;