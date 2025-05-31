module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    items: DataTypes.JSONB
  }, {});
  return Order;
};
