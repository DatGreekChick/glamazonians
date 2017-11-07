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
      userId: 4
    }),
    Review.create({
      title: 'This guy is the worst',
      rating: 1,
      description: 'Does this guy even act? Like DOES. 👏 HE. 👏 EVEN!?',
      productId: 4,
      userId: 2
    }),
    Review.create({
      title: 'What a stud',
      rating: 5,
      description: 'I fan-girl at the thought of Nic Cage.',
      productId: 6,
      userId: 4
    }),
    Review.create({
      rating: 5,
      description: 'All these trolls need to go. Sure, Nic Cage might no longer be in the best films of our time,' +
      ' but he is a valued actor in the community. People should be aware of his talent, and just be nice!',
      productId: 7,
      userId: 4
    }),
    Review.create({
      rating: 1,
      description: 'No.',
      productId: 8,
      userId: 5
    }),
    Review.create({
      rating: 4,
      description: 'SO GOOD!',
      productId: 7,
      userId: 6
    }),
    Review.create({
      rating: 5,
      description: 'I\'ve never written a review before, but I feel like it was necessary this time. Nic Cage should' +
      ' teach everyone how it\'s done. Sure, it wasn\'t the most amazing role, but he was great nonetheless.',
      productId: 9,
      userId: 7
    }),
    Review.create({
      rating: 3,
      description: 'I wish that he was more prevalent in the film. With a cigar to boot! *Sigh*',
      productId: 6,
      userId: 8
    }),
    Review.create({
      rating: 1,
      description: '😫 Who wrote this role for the venerable Nic Cage?!?! Stop this madness in Hollywood!',
      productId: 3,
      userId: 9
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
      line2: 'Apt #5',
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
      userId: 4
    }),
    Address.create({
      line1: '227 Sullivan Street',
      line2: 'Apt. D5',
      city: 'New York',
      state: 'NY',
      zip: '10003',
      userId: 5
    }),
    Address.create({
      line1: '28 W 26th Street',
      line2: 'Apt. 1C',
      city: 'New York',
      state: 'NY',
      zip: '10019',
      userId: 6
    }),
    Address.create({
      line1: '40 Hanover Street',
      line2: 'Floor 25',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      userId: 7
    }),
    Address.create({
      line1: '1 Road Way',
      line2: 'Apt. 25',
      city: 'New York',
      state: 'NY',
      zip: '10003',
      userId: 8
    }),
    Address.create({
      line1: '1 Six Flags Boulevard',
      line2: '',
      city: 'Jackson',
      state: 'NJ',
      zip: '08527',
      userId: 9
    }),
    Address.create({
      line1: '1 World Way',
      line2: 'Walt Disney World Resort',
      city: 'Orlando',
      state: 'FL',
      zip: '32830',
      userId: 3
    })
  ]);

  console.log(`seeded ${addresses.length} addresses`);

  const products = await Promise.all([
    Product.create({
      name: 'Archer Jacket',
      image: 'http://placecage.com/200/200',
      price: 25.5,
      quantityAvailable: 10,
      description: 'Totally not Katniss from The Hunger Games',
      tags: ['katniss', 'tribute', 'archer', 'jacket'],
      orderId: 1
    }),
    Product.create({
      name: 'Courageous Forest Princess',
      image: 'http://placecage.com/400/400',
      price: 25.99,
      quantityAvailable: 25,
      description: 'Totally not Merida from Brave',
      tags: ['merida', 'brave', 'forest', 'princess', 'courageous'],
      orderId: 2
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/500/500',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 3
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/700/500',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 1
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/100/200',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 2
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/200/300',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 3
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/800/700',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 1
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/800/900',
      price: 35.5,
      quantityAvailable: 30,
      description: 'Totally not Uma Thurman in Kill Bill.',
      tags: ['uma', 'kill', 'bill', 'yellow'],
      orderId: 2
    }),
    Product.create({
      name: 'K Billy Skin Suit',
      image: 'http://placecage.com/700/300',
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
