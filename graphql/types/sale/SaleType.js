const graphql = require('graphql');
const adherent = require('../../models/adherent');
const linesale = require('../../models/sale/linesale');
const AdherentType = require('../AdherentType');
const LineSaleType = require('./linesale/LineSaleType');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLFloat
} = graphql;

const SaleType = new GraphQLObjectType({
    name: 'Sale',
    description: "SaleType correspond aux objets de type Vente.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la vente: c'est un identifiant unique."
        },
        seller: {
            type: AdherentType,
            description: "Correspond à l'identifiant du vendeur.",
            resolve(parentValue) {
                return adherent.findById(parentValue.seller);
            }
        },
        buyer: {
            type: AdherentType,
            description: "Correspond à l'identifiant de l'acheteur si celui-ci à une carte adhérent.",
            resolve(parentValue) {
                return adherent.findById(parentValue.buyer);
            }
        },
        date: {
            type: GraphQLString,
            description: "Correspond à la date à laquelle la vente a été réalisé."
        },
        products: {
            type: new GraphQLList(LineSaleType),
            description: "Liste d'identifiant correspondant aux différentes lignes de vente.",
            resolve(parentValue) {
                return linesale.find({ _id: parentValue.products });
            }
        },
        price_tot: {
            type: GraphQLFloat,
            description: "Correspond au prix total de la vente."
        }
    })
});

module.exports = SaleType;