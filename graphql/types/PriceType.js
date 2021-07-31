const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean
} = graphql;

const PriceType = new GraphQLObjectType({
    name: 'Price',
    description: "PriceType correspond aux objets de type Tarif.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant du tarif: c'est un identifiant unique."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom du tarif."
        },
        price: {
            type: GraphQLFloat,
            description: "Correspond au prix du tarif."
        },
        active: {
            type: GraphQLBoolean,
            description: "Si vrai, le tarif est actif."
        }
    })
});

module.exports = PriceType;