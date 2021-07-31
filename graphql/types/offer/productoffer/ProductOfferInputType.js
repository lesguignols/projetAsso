const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt
} = graphql;

const ProductOfferInputType = new GraphQLInputObjectType({
    name: 'ProductOfferInput',
    description: "ProductOfferInputType permet de saisir un objet de type Produit_dans_l'offre en paramètre",
    fields: () => ({
        product: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du produit de Produit_dans_l'offre.",
        },
        quantity: {
            type: GraphQLInt,
            description: "Correspond à la quantité de produits de Produit_dans_l'offre."
        }
    })
});

module.exports = ProductOfferInputType;