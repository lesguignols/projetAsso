const graphql = require('graphql');
const productoffer = require('../../models/offer/productoffer');
const ProductOfferType = require('./productoffer/ProductOfferType');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean
} = graphql;

const OfferType = new GraphQLObjectType({
    name: 'Offer',
    description: "OfferType correspond aux objets de type Offre.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de l'offre: c'est un identifiant unique."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom de l'offre."
        },
        active: {
            type: GraphQLBoolean,
            description: "Si vrai, l'offre est active."
        },
        price: {
            type: GraphQLFloat,
            description: "Correspond au prix de l'offre."
        },
        products: {
            type: new GraphQLList(ProductOfferType),
            description: "Liste contenant les identifiants des map_produit qui concerne l'offre.",
            resolve(parentValue) {
                return productoffer.find({ _id: parentValue.products });
            }
        },
        daily: {
            type: GraphQLBoolean,
            description: "daily = quotidien donc si vrai, c'est une offre qui se fait par rapport à l'heure."
        },
        members_exclusivity: {
            type: GraphQLBoolean,
            description: "Si vrai, c'est une offre exclusive aux adhérents."
        },
        startOffer: {
            type: GraphQLString,
            description: "Correspond à la date/à l'heure de début de l'offre."
        },
        endOffer: {
            type: GraphQLString,
            description: "Correspond à la date/à l'heure de fin de l'offre."
        }
    })
});

module.exports = OfferType;