const express = require('express');

const path = require('path');


const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'jade');

const USERS_ROUTER = require('./routers/user.router');

app.use('/users', USERS_ROUTER);

app.get('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'main.html'));
    } catch (e) {
        next(e);
    }
});


app.use(_mainErrorHandler);

app.listen(3000, () => {
    console.log('listening...');
})

function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || 500)
        .json({ message: err.message } || 'Unknown error');
}