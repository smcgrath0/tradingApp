require('dotenv/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');
const Stock = require('./models/stock');
// const companies = require('./companies');
// const creators = require('./creators');
// const campaigns = require('./campaigns');
// const submissions = require('./submissions');
// const winningAds = require('./winningAds');
// const user = require('./user');

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
        dateIPO: String!
      }

      input StockInput {
        name: String!
        description: String!
        symbol: String!
        price: Float!
        dateIPO: String!
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
      return Event
        .find()
        .then(res => {
          return res.map(event => {
            return { ...event._doc };
          });
        })
        .catch(err => {
          throw err;
        });
    },
    createEvent: args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      return event
        .save()
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          return { ...res._doc };
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    },
    stocks: () => {
      return Stock
        .find()
        .then(res => {
          return res.map(event => {
            return { ...event._doc };
          });
        })
        .catch(err => {
          throw err;
        });
    },
    createStock: args => {
      const stock = new Stock({
        name: args.stockInput.name,
        symbol: args.stockInput.symbol,
        description: args.stockInput.description,
        price: +args.stockInput.price,
        dateIPO: args.stockInput.dateIPO
      });
      return stock
        .save()
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          return { ...res._doc };
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
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

mongoose.connect(`mongodb+srv://shane:${process.env.MONGO_PASSWORD}@tradingapp-jyews.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(
    server.listen(PORT, () => {
    // eslint-disable-next-line no-console
      console.log('its listening closely on port: ' + PORT);
    })
  ).catch(err => {
    console.error(err);
  });
