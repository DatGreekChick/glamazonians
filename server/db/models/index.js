const {Product, User, Review, Order, Address, LineItem} = require('./models');

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);
User.hasMany(Review);
User.hasMany(Address);
Address.belongsTo(User);
Order.belongsTo(Address);
Address.hasMany(Order);

module.exports = {
  Product,
  User,
  Review,
  Order,
  Address,
  LineItem
};
