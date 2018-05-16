import express from 'express';
import graphqlHTTP from 'express-graphql';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

import { APP_PORT } from './constants'
import schema from './schema'


const app  = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.use(graphqlHTTP(req => {
  return {
    graphiql: true,
    schema,
    pretty: true
  }
}))



app.listen(APP_PORT, () => console.log(`GraphQL server running at ${APP_PORT}`))