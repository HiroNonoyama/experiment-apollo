import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { schema } from "./src/schema";

(async () => {
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  const app = express();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer)
  );

  const server = app.listen(1234, () => {
    const wsServer = new WebSocketServer({
      server,
      path: "/graphql",
    });
    useServer({ schema }, wsServer);
  });

  console.log("Listening on http://localhost:1234/graphql");
  console.log("Listening on ws://localhost:1234/ws");
})();
