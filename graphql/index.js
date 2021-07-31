const graphql = require('graphql');

const MutationType = require('./MutationType');
const RootQueryType = require('./RootQueryType');

const {
    GraphQLSchema
} = graphql;

var schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});

module.exports = schema;