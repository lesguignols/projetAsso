const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;

const ProviderType = new GraphQLObjectType({
    name: 'Provider',
    description: "ProviderType correspond aux objets de type Fournisseur.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du fournisseur: c'est un identifiant unique."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom du fournisseur."
        },
        address: {
            type: GraphQLString,
            description: "Correspond à l'adresse du fournisseur."
        },
        phone: {
            type: GraphQLString,
            description: "Correspond au numéro de téléphone du fournisseur."
        },
        email: {
            type: GraphQLString,
            description: "Correspond à l'adresse email du fournisseur."
        }
    })
});

module.exports = ProviderType;