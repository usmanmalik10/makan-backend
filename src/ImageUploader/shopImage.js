const { handleImageUpload } = require('../middlewares/s3Manager');

const shopImage = async (req, res, next) => {
  // Use the request body or any other source to get image data
  const { shopImage } = req.body;

  try {
    const shopImageUrl = await handleImageUpload(shopImage, 'shopImage');

    // Attach the URLs to the request body for further processing
    req.body.shopImage = shopImageUrl;

    next();
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};

module.exports = {
  shopImage,
};
