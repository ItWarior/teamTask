const {
    get_users_from_dbs,
    is_valid_user,
    add_user_to_dbs,
    delete_user_in_dbs } = require('../services/user.services');

module.exports = {
    get_all_users_from_db: async (req, res, next) => {
        try {
            const users = await get_users_from_dbs();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    get_user_by_id: async (req, res, next) => {
        try {

            const { email } = req.params;

            const users = await get_users_from_dbs();

            for (let i = 0; i < users.length; i++) {

                if (email == users[i].email) {
                    res.json(users[i]);
                    return
                }
            }
            res.status(404).json('not faund')
        } catch (e) {

            next(e);

        }
    },
    add_new_user: async (req, res, next) => {

        try {

            const newUser = (req.body);

            const valid = await is_valid_user(newUser.email);

            if (valid) {

                res.status(400).json('There is the same user');
                return

            }
            await add_user_to_dbs(newUser);

            res.end("congratulations you have successfully registered");

        } catch (e) {

            next(e);

        }

    },
    delete_user_by_id: async (req, res, next) => {

        try {

            const { id } = req.params;
            const status = await delete_user_in_dbs(id);

            if (typeof (status) === "object") {

                res.json(status);
                return
            }
            throw new Error(status)

        } catch (e) {

            next(e);

        }

    }

}