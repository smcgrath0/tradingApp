const { buildSchema } = require('graphql');

module.exports = buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
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
        creator: User!
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
        createEvent: [Event!]
        createStock: [Stock!]
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
  `);
