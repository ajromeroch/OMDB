const S = require("sequelize");
const db = require("../config/db");
const bCrypt = require("bcrypt");
const saltRounds = 10;

class User extends S.Model {}

User.init(
  {
    email: { type: S.STRING, allowNull: false, validate: { isEmail: true } },
    password: { type: S.STRING, allowNull: false },
    salt: S.STRING,
  },
  { sequelize: db, modelName: "user" }
);

User.prototype.genHash = (password, salt) => {
  return bCrypt.hash(password, salt);
};

User.addHook("beforeCreate", (user) => {
  return bCrypt // este return
    .genSalt(saltRounds)
    .then((resSalt) => {
      user.salt = resSalt;
      return user.genHash(user.password, resSalt);
    })
    .then((hash) => (user.password = hash));
});

module.exports = User;
