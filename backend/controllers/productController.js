import ProductSchema from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const doc = new ProductSchema({
      name: req.body.name,
      price: req.body.price,
      isAvailable: req.body.isAvailable,
      imageURL: req.body.imageURL,
      user: req.userId,
    });

    const product = await doc.save();

    res.status(200).json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can not add this product',
      error: err
    });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find().populate('user').exec();
    res.status(200).json(products);
  }
  catch(err) {
    console.log(err);
    res.status(500).json(
      {
        success: false,
        message: 'Can not get all products'
      }
    )
  }
}

export const getProductById = async (req, res) => {
  try {

    const prodId = req.params.id;

    // findOne
    // findById
    const product = await ProductSchema.findOne({_id: prodId}).populate('user').exec();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: 'Product not found'
      });
    }

  }
  catch(err) {
      console.log(err);
      res.status(500).json(
        {
          success: false,
          message: 'Can not this product info'
        }
      )
    }
}

export const removeProductById = async (req, res) => {
  try {

    const prodId = req.params.id;

    // findOne
    // findById

    ProductSchema.findOneAndDelete({
      _id: prodId
    },
      (error, document) => {
        console.log(error)

        if (error) {
          res.status(500).json({
            message: 'Product can not remove'
          });
        }

        else if (!document) {
          res.status(404).json({
            message: 'Product not found and remov'
          });
        }

        else {
          res.status(200).json({
            success: 'true'
          })
        }
      }
    );
  }
  catch(err) {
    console.log(err);
    res.status(500).json(
      {
        success: false,
        message: 'Can not remove this product'
      }
    )
  }
}

export const updateProductById = async (req, res) => {
  try {

    const prodId = req.params.id;

    // findOne
    // findById
    ProductSchema.findOneAndUpdate({
        _id: prodId
      },
      {
        _id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
        imageURL: req.body.imageURL,
        user: req.userId,
      },
      (error, document) => {
        if (error) {
          console.log(error)
          res.status(500).json({
            message: 'Product can not update'
          });
        }

        else if (!document) {
          res.status(404).json({
            message: 'Product not found and update'
          });
        }

        else {
          res.status(200).json({
            success: 'true'
          })
        }
      }
    );

    // res.status(200).json({
    //   success: 'true'
    // })
  }
  catch(err) {
    console.log(err);
    res.status(500).json(
      {
        success: false,
        message: 'Can not update this product'
      }
    )
  }
}