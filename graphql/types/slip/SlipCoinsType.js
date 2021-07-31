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

const SlipCoinsType = new GraphQLObjectType({
    name: 'SlipCoins',
    description: "SlipCoins correspond aux objets de type Bordereau_pièce.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            require: true,
            description: "Correspond à l'identifiant du bordereau pièce: c'est un identifiant unique."
        },
        date: {
            type: GraphQLString,
            description: "Correspond à la date à laquelle le bordereau pièce a été réalisé."
        },
        member: {
            type: AdherentType,
            require: true,
            description: "Correspond à l'identifiant du membre qui a réalisé le bordereau pièce.",
            resolve(parentValue) {
                return Adherent.findById(parentValue.member);
            }
        },
        total_amount: {
            type: GraphQLFloat,
            default: 0,
            description: "Correspond au montant total du bordereau pièce."
        },
        num_slip: {
            type: GraphQLString,
            description: "Correspond au numéro du bordereau pièce."
        },
        two: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 2€ dans le bordereau pièce.",
            default: 0
        },
        one: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 1€ dans le bordereau pièce.",
            default: 0
        },
        fiftycents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.5€ dans le bordereau pièce.",
            default: 0
        },
        twentycents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.2€ dans le bordereau pièce.",
            default: 0
        },
        tencents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.1€ dans le bordereau pièce.",
            default: 0
        },
        fivecents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.05€ dans le bordereau pièce.",
            default: 0
        },
        twocents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.02€ dans le bordereau pièce.",
            default: 0
        },
        onecents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.01€ dans le bordereau pièce.",
            default: 0
        }
    })
});

module.exports = SlipCoinsType;