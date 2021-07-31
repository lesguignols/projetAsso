const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const LineBillInputType = new GraphQLInputObjectType({
    name: 'LineBillInput',
    description: "LineBillInputType permet de saisir un objet de type Ligne_facture en paramètre",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la ligne de facture: c'est un identifiant unique."
        },
        product: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du produit de la ligne de facture.",
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
        }
    })
});

module.exports = LineBillInputType;