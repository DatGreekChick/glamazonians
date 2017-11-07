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
      password: 'bones'
    }),
    User.create({
      name: 'murphy',
      email: 'murphy@email.com',
      password: 'iammurphy'
    }),
    User.create({
      name: 'eleni',
      email: 'eleni@email.com',
      password: 'admin',
      isAdmin: true
    }),
    User.create({
      name: 'keri',
      email: 'keri@email.com',
      password: 'admin',
      isAdmin: true
    }),
    User.create({
      name: 'cecilia',
      email: 'cecilia@email.com',
      password: 'admin',
      isAdmin: true
    }),
    User.create({
      name: 'shelby',
      email: 'shelby@email.com',
      password: 'admin',
      isAdmin: true
    }),
    User.create({
      name: 'nicolas',
      email: 'nic.cage@email.com',
      password: 'actor',
      isAdmin: false
    }),
    User.create({
      name: 'wonder',
      email: 'wonder.woman@email.com',
      password: 'wonderful',
      isAdmin: false
    }),
    User.create({
      name: 'blake',
      email: 'blake@email.com',
      password: 'ilovegreenlantern',
      isAdmin: false
    })
  ]);

  console.log(`seeded ${users.length} users`);

  const reviews = await Promise.all([
    Review.create({
      title: 'I loved this!',
      rating: 5,
      description:
        'Nic Cage was so wonderful in this role! So great! I\'m such a fan!',
      productId: 1,
      userId: 1
    }),
    Review.create({
      title: 'Just ok...',
      rating: 3,
      description:
        "Eh, it was okay. I probably wouldn't buy it again for Nic Cage, but it was fine.",
      productId: 1,
      userId: 2
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 2,
      userId: 3
    }),
    Review.create({
      rating: 4,
      description: 'This role was super great for Nic Cage. It really added depth to his character portfolio.',
      productId: 3,
      userId: 3
    }),
    Review.create({
      title: 'This guy is the worst',
      rating: 1,
      description: 'Does this guy even act? Like DOES. 👏 HE. 👏 EVEN!?',
      productId: 3,
      userId: 3
    }),
    Review.create({
      title: 'What a stud',
      rating: 5,
      description: 'I fan girl at the thought of Nic Cage.',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      description: 'NEVER AGAIN! HATED THIS!',
      productId: 3,
      userId: 3
    })
  ]);

  console.log(`seeded ${reviews.length} reviews`);

  const lineItems = await Promise.all([
    LineItem.create({
      purchasePrice: 21.0,
      purchaseNum: 2,
      orderId: 1,
      productId: 1
    }),
    LineItem.create({
      purchasePrice: 15.0,
      orderId: 2,
      productId: 2
    }),
    LineItem.create({
      purchasePrice: 68.85,
      purchaseNum: 3,
      orderId: 3,
      productId: 3
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
      tags: ['katniss', 'tribute', 'archer', 'jacket'],
      orderId: 1
    }),
    Product.create({
      name: 'Courageous Forest Princess',
      price: 25.99,
      quantityAvailable: 25,
      description: 'Totally not Merida from Brave',
      tags: ['merida', 'brave', 'forest', 'princess', 'courageous'],
      orderId: 2
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 3
    })
  ]);

  console.log(`seeded ${products.length} products`);

  const orders = await Promise.all([
    Order.create({
      status: 'Created',
      userId: 1,
      addressId: 1
    }),
    Order.create({
      status: 'Processing',
      userId: 2,
      addressId: 2
    }),
    Order.create({
      status: 'Completed',
      userId: 3,
      addressId: 3
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
