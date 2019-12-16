require('dotenv/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const Stock = require('./models/stock');
const User = require('./models/user');

const server = express();
let PORT = process.env.PORT;

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

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input UserInput {
        email: String!
        password: String
      }

      type RootQuery {
        events: [Event!]!
        stocks: [Stock!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createStock(stockInput: StockInput): Stock
        createUser(userInput: UserInput): User
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
        date: new Date(args.eventInput.date),
        creator: '5df70bf202716f0eb76c6f30'
      });
      let createEvent;
      return event
        .save()
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          createEvent = { ...res._doc };
          return User.findById('5df70bf202716f0eb76c6f30');
        })
        .then(user => {
          if (!user) {
            throw new Error('User Not found');
          }
          user.createEvent.push(event);
          return user.save();
        })
        .then(res => {
          return createEvent;
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
        dateIPO: args.stockInput.dateIPO,
        creator: '5df70bf202716f0eb76c6f30'
      });
      let createStock;
      return stock
        .save()
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          createStock = { ...res._doc };
          return User.findById('5df70bf202716f0eb76c6f30');
        })
        .then(user => {
          if (!user) {
            throw new Error('User Not found');
          }
          user.createStock.push(stock);
          return user.save();
        })
        .then(res => {
          return createStock;
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    },
    createUser: args => {
      return User.findOne({ email: args.userInput.email })
        .then(user => {
          if (user) {
            throw new Error('User Exists Already');
          }
          return bcrypt.hash(args.userInput.password, 12)
            .then(hashedPassword => {
              const user = new User({
                email: args.userInput.email,
                password: hashedPassword
              });
              user.save()
                .then(res => {
                  return { ...res._doc, password: null };
                })
                .catch(err => {
                  throw err;
                });
            });
        })
        .catch(err => {
          throw err;
        });
    }

  },
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
