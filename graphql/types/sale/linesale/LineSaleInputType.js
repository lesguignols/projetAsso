const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const LineSaleInputType = new GraphQLInputObjectType({
    name: 'LineSaleInput',
    description: "LineSaleInputType permet de saisir un objet de type Ligne_vente en paramètre",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la ligne de vente: c'est un identifiant unique."
        },
        product: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du produit de la ligne dans la vente.",
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

module.exports = LineSaleInputType;