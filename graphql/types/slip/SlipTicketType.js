const graphql = require('graphql');
const Adherent = require('../../models/adherent');
const AdherentType = require('../AdherentType');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLString
} = graphql;

const SlipTicketType = new GraphQLObjectType({
    name: 'SlipTicket',
    description: "SlipTicketType correspond aux objets de type Bordereau_billet.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            require: true,
            description: "Correspond à l'identifiant du bordereau billet: c'est un identifiant unique."
        },
        date: {
            type: GraphQLString,
            description: "Correspond à la date à laquelle le bordereau billet a été réalisé."
        },
        member: {
            type: AdherentType,
            require: true,
            description: "Correspond à l'identifiant du membre qui a réalisé le bordereau billet.",
            resolve(parentValue) {
                return Adherent.findById(parentValue.member);
            }
        },
        total_amount: {
            type: GraphQLFloat,
            default: 0,
            description: "Correspond au montant total du bordereau billet."
        },
        num_slip: {
            type: GraphQLString,
            description: "Correspond au numéro du bordereau billet."
        },
        fifty: {
            type: GraphQLInt,
            description: "Correspond au nombre de billets de 50€ dans le bordereau billet.",
            default: 0
        },
        twenty: {
            type: GraphQLInt,
            description: "Correspond au nombre de billets de 20€ dans le bordereau billet.",
            default: 0
        },
        ten: {
            type: GraphQLInt,
            description: "Correspond au nombre de billets de 10€ dans le bordereau billet.",
            default: 0
        },
        five: {
            type: GraphQLInt,
            description: "Correspond au nombre de billets de 5€ dans le bordereau billet.",
            default: 0
        }
    })
});

module.exports = SlipTicketType;