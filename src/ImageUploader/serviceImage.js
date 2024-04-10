const { handleImageUpload } = require('../middlewares/s3Manager');

const serviceImage = async (req, res, next) => {
  // Use the request body or any other source to get image data
  const { serviceImage } = req.body;

  try {
    const serviceImageUrl = await handleImageUpload(
      serviceImage,
      'serviceImage'
    );

    // Attach the URLs to the request body for further processing
    req.body.serviceImage = serviceImageUrl;

    next();
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};

module.exports = {
  serviceImage,
};
