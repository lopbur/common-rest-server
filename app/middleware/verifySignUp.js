const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const checkUsername = await User.findOne({ where: { username: req.body.username } })
  const checkEmail = await User.findOne({ where: { email: req.body.email } })

  if (checkUsername)
    return res.status(400).send({
      message: 'Failed! Username is already exist!'
    });

  if (checkEmail)
    return res.status(400).send({
      message: 'Failed! Email is already exist!'
    });
  
  next();
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
}

module.exports = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
}