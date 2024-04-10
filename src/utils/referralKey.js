const { StrategicSalePartner } = require('../models/index');

const generateReferralKey = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 8;

  let referralKey = '';

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralKey += characters.charAt(randomIndex);
  }

  return referralKey;
};

const checkUniqueReferralKey = async (referralKey) => {
  try {
    const existingPartner = await StrategicSalePartner.findOne({ referralKey });
    return !!existingPartner; // Simplified the return statement
  } catch (error) {
    console.error('Error checking unique referral key:', error);
    return false;
  }
};

const findUniqueReferralKey = async () => {
  let referralKey;
  let isUnique = false;

  while (!isUnique) {
    referralKey = generateReferralKey();
    isUnique = !(await checkUniqueReferralKey(referralKey));
  }

  if (!isUnique) {
    console.error(
      'Could not generate a unique referral key after multiple attempts.'
    );
    return null;
  }

  return referralKey;
};

module.exports = findUniqueReferralKey;
