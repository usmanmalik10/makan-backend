const { handleImageUpload } = require('../middlewares/s3Manager');

const sspImage = async (req, res, next) => {
  // Use the request body or any other source to get image data
  const { profilePic, idCardFront, idCardBack } = req.body;

  try {
    const profilePicUrl = await handleImageUpload(profilePic, 'profilePic');
    const idCardFrontUrl = await handleImageUpload(idCardFront, 'idCardFront');
    const idCardBackUrl = await handleImageUpload(idCardBack, 'idCardBack');

    // Attach the URLs to the request body for further processing
    req.body.profilePic = profilePicUrl;
    req.body.idCardFront = idCardFrontUrl;
    req.body.idCardBack = idCardBackUrl;

    next();
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};

module.exports = {
  sspImage,
};
