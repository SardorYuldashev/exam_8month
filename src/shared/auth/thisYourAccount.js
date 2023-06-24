const { BadReqqustError } = require("../errors");

const thisYourAccount = (req, res, next) => {
  const { id: accountId } = req.params;

  const {id: userId} = req.user;

  if (accountId != userId) {
    throw new BadReqqustError(`Birovning profilini tahrirlash mumkin emas`);
  };

  next();
};

module.exports = thisYourAccount;