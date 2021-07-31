const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
} = graphql;

const SettingsType = new GraphQLObjectType({
    name: 'Settings',
    description: "SettingsType correspond aux objets de type Paramètres.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant des paramètres: c'est un identifiant unique."
        },
        photo_directory: {
            type: GraphQLString,
            description: "Correspond au chemin pour accèder aux photos."
        },
        cash_register: {
            type: GraphQLBoolean,
            description: "Si vrai, une caisse est branchée et connectée."
        },
        scan: {
            type: GraphQLBoolean,
            description: "Si vrai, un scan est branché et connecté."
        }
    })
});

module.exports = SettingsType;