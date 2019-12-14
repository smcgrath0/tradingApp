require('dotenv/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
// const companies = require('./companies');
// const creators = require('./creators');
// const campaigns = require('./campaigns');
// const submissions = require('./submissions');
// const winningAds = require('./winningAds');
// const user = require('./user');

const events = [];
const stocks = [];
const server = express();
let PORT = process.env.PORT;

// connection.connect();

server.use(bodyParser.json());

server.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type Stock {
      _id: ID!
      name: String!
      description: String!
      symbol: String!
      price: Float!
    }

    input StockInput {
      name: String!
      description: String!
      symbol: String!
      price: Float!
    }

      type RootQuery {
        events: [Event!]!
        stocks: [Stock!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createStock(stockInput: StockInput): Stock
      }

      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: args => {
      const event = {
        _id: Math.random().toString(),
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: args.eventInput.date
      };
      events.push(event);
      return event;
    },
    stocks: () => {
      return stocks;
    },
    createStock: args => {
      const stock = {
        _id: Math.random().toString(),
        name: args.stockInput.name,
        description: args.stockInput.description,
        price: +args.stockInput.price,
        symbol: args.stockInput.symbol
      };
      stocks.push(stock);
      return stock;
    }
  },
  graphiql: true
}));
// server.use('/api/companies', companies);
// server.use('/api/creators', creators);
// server.use('/api/campaigns', campaigns);
// server.use('/api/submissions', submissions);
// server.use('/api/winningAds', winningAds);
// server.use('/api/user', user);
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

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('its listening closely on port: ' + PORT);
});
