const fs = require('fs/promises');
const path = require('path');

const WAY_TO_FILE_USERS = path.join(__dirname, '../', 'dataBase', 'users.json');

async function get_users_from_dbs() {

    const users = await fs.readFile(WAY_TO_FILE_USERS);
    const parse_users = (!users.toString()) ? [] : JSON.parse(users);

    return parse_users;

}

async function is_valid_user(email) {
    const users = await get_users_from_dbs();

    let valid = false;

    if (users.length > 0) {
        users.forEach(user => {
            if (user.email === email) {
                valid = true;
            }
        });
    }

    return valid
}

async function add_user_to_dbs(user) {
    const users = await get_users_from_dbs();

    const index = users.length - 1;
    const last_user = users[index].id + 1;

    users.push({ ...user, id: last_user });

    await fs.writeFile(WAY_TO_FILE_USERS, JSON.stringify(users));

}


async function delete_user_in_dbs(id) {
    const users = await get_users_from_dbs();

    let status = "There is not the same user";

    for (let i = 0; i < users.length; i++) {

        if (users[i].id == id) {

            status = users.splice(i, 1);
            overwriteUsers(users);

            return status;
        }
    }

    return status;
}


async function overwriteUsers(users) {
    await fs.writeFile(WAY_TO_FILE_USERS, JSON.stringify(users));
}

module.exports = {

    get_users_from_dbs,
    is_valid_user,
    add_user_to_dbs,
    delete_user_in_dbs

}