const {gql} = require('apollo-server');

module.exports = gql`
type Post {
    id: ID!
    title: String!
    description: String!
}
    type Query {
        getPosts: [ Post ]
    }
`;