const Product = require('./product');
const User = require('./user');
const Order = require('./order');
const Address = require('./address');
const LineItem = require('./lineItem');
const Review = require('./review');

User.hasMany(Order, {
  foreignKey: 'userId',
  sourceKey: 'id',
  constraints: false,
  as: 'orders'
});

User.hasMany(Review, {
  foreignKey: 'userId',
  sourceKey: 'id',
  constraints: false,
  as: 'reviews'
});

User.hasMany(Address, {
  foreignKey: 'userId',
  sourceKey: 'id',
  constraints: false,
  as: 'addresses'
});


Order.belongsTo(User, {
  foreignKey: 'userName',
  targetKey: 'name',
  constraints: false,
  as: 'user'
});

Order.hasMany(LineItem, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  constraints: false,
  as: 'lineItems'
});

Order.belongsTo(Address, {
  foreignKey: 'addressId',
  targetKey: 'id',
  constraints: false,
  as: 'address'
});


LineItem.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'id',
  constraints: false,
  as: 'order'
});

LineItem.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  constraints: false,
  as: 'product'
});


Product.hasMany(Review, {
  foreignKey: 'productId',
  sourceKey: 'id',
  constraints: false,
  as: 'reviews'
});


Review.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  constraints: false,
  as: 'product'
});

Review.belongsTo(User, {
  foreignKey: 'userName',
  targetKey: 'name',
  constraints: false,
  as: 'user'
});


Address.belongsTo(User, {
  foreignKey: 'userName',
  targetKey: 'name',
  constraints: false,
  as: 'user'
});

Address.hasMany(Order, {
  foreignKey: 'addressId',
  sourceKey: 'id',
  constraints: false,
  as: 'orders'
});

module.exports = {
  Product,
  User,
  Review,
  Order,
  Address,
  LineItem
};
