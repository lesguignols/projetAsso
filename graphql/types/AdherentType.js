const graphql = require('graphql');
const price = require('../models/price');
const PriceType = require('./PriceType');
const training = require('../models/training');
const TrainingType = require('./TrainingType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const AdherentType = new GraphQLObjectType({
    name: 'Adherent',
    description: "AdherentType correspond aux objets de type Adhérent.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de l'adhérent: c'est un identifiant unique."
        },
        card: {
            type: GraphQLString,
            description: "Correspond au numéro de la carte de l'adhérent."
        },
        name: {
            type: GraphQLString,
            description: "Correspond au nom de l'adhérent."
        },
        firstName: {
            type: GraphQLString,
            description: "Correspond au prénom de l'adhérent."
        },
        link_photo: {
            type: GraphQLString,
            description: "Correspond au lien de la photo de l'adhérent."
        },
        email: {
            type: GraphQLString,
            description: "Correspond à l'email de l'adhérent."
        },
        price: {
            type: PriceType,
            description: "Correspond à l'identifiant du tarif que l'adhérent a utilisé pour (re)faire son adhésion.",
            resolve(parentValue) {
                return price.findById(parentValue.price);
            }
        },
        training: {
            type: TrainingType,
            description: "Correspond à l'identifiant de la formation que l'adhérent suit pour l'année en cours.",
            resolve(parentValue) {
                return training.findById(parentValue.training);
            }
        },
        active: {
            type: GraphQLBoolean,
            description: "Si vrai, la carte est activée."
        },
        member: {
            type: GraphQLBoolean,
            description: "Si vrai, l'adhérent est un membre actif de l'association."
        },
        code: {
            type: GraphQLInt,
            description: "Correspond au code que le membre a choisis pour pouvoir avoir accès au logiciel. Si member = false, code = null."
        },
        secret_code: {
            type: GraphQLInt,
            description: "Correspond au code que le membre a choisis pour pouvoir modifier son code en cas de besoin. Si member = false, code = null."
        },
        administrator: {
            type: GraphQLBoolean,
            description: "Si vrai, l'utilisateur est un membre de bureau. Il peut réaliser plus d'action."
        },
        superAdministrator: {
            type: GraphQLBoolean,
            description: "Si vrai, l'utilisateur a tout les droits, il peut absolument tout faire."
        }
    })
});

module.exports = AdherentType;