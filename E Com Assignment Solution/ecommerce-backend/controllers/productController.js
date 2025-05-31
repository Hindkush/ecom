const { Product, Category } = require('../models');

exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.editProduct = async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.send('Product updated');
};

exports.deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.send('Product deleted');
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({ include: Category });
  res.json(products);
};

exports.getProductDetails = async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: Category });
  res.json(product);
};
