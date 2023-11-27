import { schema } from './src/schema';
import { WebSocketServer } from 'ws'

import {useServer} from 'graphql-ws/lib/use/ws'

const server = new WebSocketServer({
  port: 1234,
  path: '/graphql'
})

useServer({ schema }, server)

console.log('Listening on ws://localhost:1234')