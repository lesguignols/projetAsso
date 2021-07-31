const graphql = require('graphql');
const adherent = require('../../models/adherent');
const AdherentType = require('../AdherentType');
const linebill = require('../../models/bill/linebill');
const LineBillType = require('./linebill/LineBillType');
const provider = require('../../models/provider');
const ProviderType = require('../ProviderType');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLFloat
} = graphql;

const BillType = new GraphQLObjectType({
    name: 'Bill',
    description: "BillType correspond aux objets de type Facture.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la facture: c'est un identifiant unique."
        },
        member: {
            type: AdherentType,
            description: "Correspond au membre qui a saisie la facture dans le logiciel.",
            resolve(parentValue) {
                return adherent.findById(parentValue.member);
            }
        },
        date: {
            type: GraphQLString,
            description: "Correspond à la date où la facture a été saisie."
        },
        provider: {
            type: ProviderType,
            description: "Correspond à l'identifiant d'un fournisseur. La facture vient de ce fournisseur.",
            resolve(parentValue) {
                return provider.findById(parentValue.provider);
            }
        },
        products: {
            type: new GraphQLList(LineBillType),
            description: "Liste d'identifiant correspondant aux différentes lignes de la facture.",
            resolve(parentValue) {
                return linebill.find({ _id: parentValue.products });
            }
        },
        price_tot: {
            type: GraphQLFloat,
            description: "Correspond au prix total payé indiqué sur la facture."
        }
    })
});

module.exports = BillType;