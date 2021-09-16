const router = require('express').Router();

const {
    get_all_users_from_db,
    get_user_by_id,
    add_new_user,
    delete_user_by_id} = require('../controllers/user.controller');


router.get('/', get_all_users_from_db);

router.post('/register', add_new_user);

router.delete('/delete/:id', delete_user_by_id);

router.get('/:email', get_user_by_id);

module.exports = router;