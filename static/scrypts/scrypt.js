const BTN_GET_ALL_USERS = document.getElementById('get_all');

const users_blok = document.createElement('div');
users_blok.id = 'users_block';
document.body.appendChild(users_blok);

function abort_children(parent) {
    if (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        abort_children(parent);
    }
    return
}

BTN_GET_ALL_USERS.onclick = async (event) => {

    abort_children(users_blok);

    const response = await fetch('http://localhost:3000/users');
    let users = await response.json();

    for (const user of users) {

        const user_blok = document.createElement('div');
        const user_id = document.createElement('h2');
        const first_name = document.createElement('p');
        const last_name = document.createElement('p');
        const email = document.createElement('p');
        const photo = document.createElement('img');
        const hr_on = document.createElement('hr');
        const hr_under = document.createElement('hr');
        const drop_button = document.createElement('button');

        users_blok.classList.add('user_block');
        user_id.classList.add('user_id');
        first_name.classList.add('first_name');
        last_name.classList.add('last_name');
        email.classList.add('email');
        photo.classList.add('photo');
        drop_button.classList.add('drop_button');

        user_id.innerText = `user_id : ${user.id}`;
        first_name.innerText = `first name : ${user.first_name}`;
        last_name.innerText = `last name : ${user.last_name}`;
        email.innerText = `email : ${user.email}`;
        photo.setAttribute('src', user.photo);
        drop_button.innerText = 'Delete user';

        users_blok.appendChild(user_blok);
        user_blok.appendChild(hr_on);
        user_blok.appendChild(user_id);
        user_blok.appendChild(first_name);
        user_blok.appendChild(last_name);
        user_blok.appendChild(email);
        user_blok.appendChild(photo);
        user_blok.appendChild(drop_button);
        user_blok.appendChild(hr_under);

    }

};