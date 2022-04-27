const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

// Create Product --ADMIN (Post route to add to mongodb)
exports.createProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res) => {
	const apiFeatures = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter();
	const products = await apiFeatures.query;
	res.status(200).json({
		success: true,
		products,
	});
});

// GET Product detail
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product Not Found', 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// update Product --ADMIN
exports.updateProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(500).json({
			success: false,
			message: 'product not found',
		});
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		product,
	});
});

// DELETE PRODUCT
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(500).json({
			success: false,
		});
	}
	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product Deleted successfully',
	});
});
