const graphql = require('graphql');

const {
    GraphQLEnumType,
} = graphql;

const chatimeEnum = new GraphQLEnumType({
    name: 'TaskStateEnum',
    values: {
        ICE: {
            value: "ICE",
        },
        LESS_ICE: {
            value: "LESS_ICE",
        },
        NO_ICE: {
            value: "NO_ICE",
        },
        SUGAR: {
            value: "SUGAR",
        },
    },
});

module.exports = chatimeEnum;