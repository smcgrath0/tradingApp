
const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const Stock = require('../../models/stock');
const User = require('../../models/user');

const user = userID => {
  return User.findById(userID._id)
    .then(user => {
      return {
        ...user._doc,
        createEvent: events.bind(this, user._doc.createEvent),
        createStock: stocks.bind(this, user._doc.createStock)
      };
    }).catch(err => {
      throw err;
    });
};

const stocks = async stockIds => {
  try {
    const stocks = await Stock.find({ _id: { $in: stockIds } });
    stocks.map(stock => {
      return {
        ...stock._doc,
        _id: stock.id,
        creator: user.bind(this, stock.creator)
      };
    });
    return stocks;
  } catch (err) {
    throw err;
  }
};
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: () => {
    return Event.find().populate('creator')
      .then(events => {
        return events.map(event => {
          // console.log(event._doc.creator);
          return {
            ...event._doc,
            creator: user.bind(this, event._doc.creator)
          };
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
      creator: '5df7253db57f32127d4cc7f1'
    });

    return event.save()
      .then(res => {
        // let createEvent;
        // // eslint-disable-next-line no-console
        // // console.log(res);
        // createEvent = {
        //   ...res._doc,
        //   creator: user.bind(this, res._doc.creator)
        // };
        return User.findById('5df7253db57f32127d4cc7f1');
      })
      .then(user => {
        if (!user) {
          throw new Error('User Not found');
        }
        user.createEvent.push(event);
        return user.save();
      })
      .catch(err => {
        throw err;
      });
  },
  stocks: () => {
    return Stock
      .find()
      .then(res => {
        return res.map(event => {
          return {
            ...event._doc,
            creator: user.bind(this, event._doc.creator)
          };
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
      creator: '5df7253db57f32127d4cc7f1'
    });
    let createStock;
    return stock
      .save()
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res);
        createStock = { ...res._doc };
        return User.findById('5df7253db57f32127d4cc7f1');
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
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error('User Exists Already');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newuser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const res = await newuser.save();

      return { ...res._doc, password: null, _id: res.id };
    } catch (err) {
      throw err;
    }
  }

};
