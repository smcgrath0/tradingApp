require('dotenv/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const server = express();
let PORT = process.env.PORT;

server.use(bodyParser.json());

server.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error has occurred'
  });
});

mongoose.connect(`mongodb+srv://shane:${process.env.MONGO_PASSWORD}@tradingapp-jyews.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(
    server.listen(PORT, () => {
    // eslint-disable-next-line no-console
      console.log('its listening closely on port: ' + PORT);
    })
  ).catch(err => {
    console.error(err);
  });
