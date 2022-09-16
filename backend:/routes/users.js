const router = require('express').Router();
const { validateAvatarUpdate, validateUserUpdate, validateObjId } = require('../middlewares/validators');

const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', validateObjId, getUserById);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
