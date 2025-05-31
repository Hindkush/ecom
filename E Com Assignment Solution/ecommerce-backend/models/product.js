module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT,
    discountedPrice: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Product;
};
