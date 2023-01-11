const express = require("express")
const router= express.Router();
const {createUser, loginUserCtrl, getallUser, getUser, deleteUser, updatedUser}= require("../controller/userCtrl")

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-user', getallUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put("/:id", updatedUser)
module.exports = router;