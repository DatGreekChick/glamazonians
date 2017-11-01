const db = require('../server/db');
const { User, Review, Product, Address, Order, LineItem } = require('../server/db/models');

async function seed () {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      name: 'cody',
      email: 'cody@email.com',
      password: '12345678',
    }),
    User.create({
      name: 'murphy',
      email: 'murphy@email.com',
      password: '12345678',
    }),
    User.create({
      name: 'eleni',
      email: 'eleni@email.com',
      password: '12345678',
      isAdmin: true,
    })
  ]);

  console.log(`seeded ${users.length} users`);

  const reviews = await Promise.all([
    Review.create({
      title: 'I loved this!',
      rating: 5,
      description: 'This product was so great. Love it. Buy it! Highly recommend!',
      verifiedPurchase: true,
    }),
    Review.create({
      title: 'Just ok...',
      rating: 3,
      description: 'Eh, it was okay. I probably wouldn\'t buy it again, but it was fine.',
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
    })
  ]);

  console.log(`seeded ${reviews.length} reviews`);

  const lineItems = await Promise.all([
    LineItem.create({
      purchasePrice: 21.00,
      purchaseNum: 2,
    }),
    LineItem.create({
      purchasePrice: 15.00,
    }),
    LineItem.create({
      purchasePrice: 68.85,
      purchaseNum: 3,
    }),
  ]);

  console.log(`seeded ${lineItems.length} line items`);

  const addresses = await Promise.all([
    Address.create({
      line1: '123 Road Way',
      line2: '',
      city: 'New York',
      state: 'NY',
      zip: '10003',
    }),
    Address.create({
      line1: '123 Montvale Road',
      line2: '',
      city: 'Montvale',
      state: 'NJ',
      zip: '07645',
    }),
    Address.create({
      line1: '123 Houston Street',
      line2: '',
      city: 'New York',
      state: 'NY',
      zip: '10003',
    }),
  ]);

  console.log(`seeded ${addresses.length} addresses`);

  const products = await Promise.all([
    Product.create({
      name: '',
      image: '',
      price: 25.50,
      quantityAvailable: 10,
      description: '',
      tags: [],
    }),
    Product.create({
      name: '',
      image: '',
      price: '',
      quantityAvailable: 25,
      description: '',
      tags: [],
    }),
    Product.create({
      name: '',
      image: '',
      price: '',
      quantityAvailable: 30,
      description: '',
      tags: [],
    }),
  ]);

  console.log(`seeded ${products.length} products`);

  const orders = await Promise.all([
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
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
