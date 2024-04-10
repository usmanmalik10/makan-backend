const apiResponse = (code, message, data = null) => {
    return {
      code,
      message,
      data,
    };
  };

const objectId = (value, helpers) => {
  if (value && !value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid id');
  }
  return value;
};

  module.exports = {
    apiResponse,
    objectId,
  } 