import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello from the Query!"
      }
    },
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      greetings: {
        type: GraphQLString,
        subscribe: function* () {
          for (let i = 0; i < 5; i++) {
            yield { greetings: `Hello from the Subscription! ${i}` }
          }
        }
      }
    }
  })
})