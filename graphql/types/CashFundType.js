const graphql = require('graphql');
const Adherent = require('../models/adherent');
const AdherentType = require('./AdherentType');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLString
} = graphql;

//Fond de caisse
const CashFundType = new GraphQLObjectType({
    name: 'CashFund',
    description: "CashFundType correspond aux objets de type FondDeCaisse.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            require: true,
            description: "Correspond à l'identifiant du fond de caisse: c'est un identifiant unique."
        },
        date: {
            type: GraphQLString,
            description: "Correspond à la date du fond de caisse."
        },
        member: {
            type: AdherentType,
            require: true,
            description: "Correspond à l'identifiant du membre qui a réalisé le fond de caisse.",
            resolve(parentValue) {
                return Adherent.findById(parentValue.member);
            }
        },
        sum: {
            type: GraphQLFloat,
            description: "Correspond à la somme total du fond de caisse.",
            default: 0
        },
        fifty: {
            type: GraphQLInt,
            description: "Correspond au nombre de billet de 50€ dans le fond de caisse.",
            default: 0
        },
        twenty: {
            type: GraphQLInt,
            description: "Correspond au nombre de billet de 20€ dans le fond de caisse.",
            default: 0
        },
        ten: {
            type: GraphQLInt,
            description: "Correspond au nombre de billet de 10€ dans le fond de caisse.",
            default: 0
        },
        five: {
            type: GraphQLInt,
            description: "Correspond au nombre de billet de 5€ dans le fond de caisse.",
            default: 0
        },
        two: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 2€ dans le fond de caisse.",
            default: 0
        },
        one: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 1€ dans le fond de caisse.",
            default: 0
        },
        fiftycents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.5€ dans le fond de caisse.",
            default: 0
        },
        twentycents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.2€ dans le fond de caisse.",
            default: 0
        },
        tencents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.1€ dans le fond de caisse.",
            default: 0
        },
        fivecents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.05€ dans le fond de caisse.",
            default: 0
        },
        twocents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.02€ dans le fond de caisse.",
            default: 0
        },
        onecents: {
            type: GraphQLInt,
            description: "Correspond au nombre de pièces de 0.01€ dans le fond de caisse.",
            default: 0
        }
    })
});

module.exports = CashFundType;