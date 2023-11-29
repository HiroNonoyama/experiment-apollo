import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { PubSubRedisOptions } from "graphql-redis-subscriptions/dist/redis-pubsub";

const options: PubSubRedisOptions["connection"] = {
  host: "redis",
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
};
const pubSub = new RedisPubSub({ connection: options });

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: {
    id: { type: GraphQLString },
    text: { type: GraphQLString },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      getMessage: {
        type: MessageType,
        resolve: async () => {
          const message = { id: "1", text: "Hello world" };
          pubSub.publish("MESSAGE_ADDED", { message });
          return message;
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createMessage: {
        type: MessageType,
        args: { text: { type: GraphQLString } },
        resolve: async (_, { text }) => {
          const message = {
            id: "2",
            text,
          };
          await pubSub.publish("MESSAGE_ADDED", { message });
          return message;
        },
      },
    },
  }),
  subscription: new GraphQLObjectType({
    name: "Subscription",
    fields: {
      message: {
        type: MessageType,
        subscribe: () => pubSub.asyncIterator("MESSAGE_ADDED"),
      },
    },
  }),
});
