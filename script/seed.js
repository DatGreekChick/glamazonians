const db = require('../server/db');
const {
  User,
  Review,
  Product,
  Address,
  Order,
  LineItem
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      name: 'cody',
      email: 'cody@email.com',
      password: '123456789'
    }),
    User.create({
      name: 'murphy',
      email: 'murphy@email.com',
      password: '123456789'
    }),
    User.create({
      name: 'eleni',
      email: 'eleni@email.com',
      password: '123456789',
      isAdmin: true
    })
  ]);

  console.log(`seeded ${users.length} users`);

  const reviews = await Promise.all([
    Review.create({
      title: 'I loved this!',
      rating: 5,
      description:
        'This product was so great. Love it. Buy it! Highly recommend!',
      verifiedPurchase: true
    }),
    Review.create({
      title: 'Just ok...',
      rating: 3,
      description:
        "Eh, it was okay. I probably wouldn't buy it again, but it was fine."
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!'
    })
  ]);

  console.log(`seeded ${reviews.length} reviews`);

  const lineItems = await Promise.all([
    LineItem.create({
      purchasePrice: 21.0,
      purchaseNum: 2
    }),
    LineItem.create({
      purchasePrice: 15.0
    }),
    LineItem.create({
      purchasePrice: 68.85,
      purchaseNum: 3
    })
  ]);

  console.log(`seeded ${lineItems.length} line items`);

  const addresses = await Promise.all([
    Address.create({
      line1: '123 Road Way',
      line2: '',
      city: 'New York',
      state: 'NY',
      zip: '10003',
      userId: 1
    }),
    Address.create({
      line1: '123 Montvale Road',
      line2: '',
      city: 'Montvale',
      state: 'NJ',
      zip: '07645',
      userId: 2
    }),
    Address.create({
      line1: '123 Houston Street',
      line2: '',
      city: 'New York',
      state: 'NY',
      zip: '10003',
      userId: 3
    })
  ]);

  console.log(`seeded ${addresses.length} addresses`);

  // using default images here for the time being
  const products = await Promise.all([
    Product.create({
      name: 'Archer Jacket',
      price: 25.5,
      quantityAvailable: 10,
      description: 'Totally not Katniss from The Hunger Games',
      tags: ['katniss', 'tribute', 'archer', 'jacket']
    }),
    Product.create({
      name: 'Courageous Forest Princess',
      price: 25.99,
      quantityAvailable: 25,
      description: 'Totally not Merida from Brave',
      tags: ['merida', 'brave', 'forest', 'princess', 'courageous']
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow']
    })
  ]);

  console.log(`seeded ${products.length} products`);

  const orders = await Promise.all([
    Order.create({
      status: 'Created'
    }),
    Order.create({
      status: 'Processing'
    }),
    Order.create({
      status: 'Completed'
    })
  ]);

  console.log(`seeded ${orders.length} orders`);

  console.log(`seeded database successfully`);
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
