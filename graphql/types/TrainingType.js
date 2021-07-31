const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql;

const TrainingType = new GraphQLObjectType({
    name: 'Training',
    description: "TrainingType correspond aux objets de type Formation.",
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: "Correspond à l'identifiant de la formation: c'est un identifiant unique."
        },
        curriculum: {
            type: GraphQLString,
            description: "Correspond au cursus de la formation."
        },
        wording: {
            type: GraphQLString,
            description: "Correspond à l'intitulé de la formation."
        },
        year: {
            type: GraphQLInt,
            description: "Correspond à l'année d'étude de la formation."
        }
    })
});

module.exports = TrainingType;