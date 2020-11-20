module.exports.removeEmpty = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      newObj[key] = removeEmpty(obj[key]);
    } else if (obj[key] != null) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
