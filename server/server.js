
(async function () {
    let reg = await require('./boot');

    const jack = await reg.userService.create({
        username: "jack",
        password: process.env.PASS1,
        displayName: "Jack Skellington",
        firstName: "Jack",
        lastName: "Skellington",
        email: "jack@example.com",
        validated: true,
        created: new Date().getTime(),
        provider: "local"
    });

    const jill = await reg.userService.create({
        username: "jill",
        password: process.env.PASS2,
        displayName: "Jill Scott",
        firstName: "Jill",
        lastName: "Scott",
        email: "jill@example.com",
        validated: true,
        created: new Date().getTime(),
        provider: "local"
    });

    // Define routes.
    reg.app.get('/',
        function (req, res) {
            res.render('index.html', { title: 'Welcome', user: req.user });
    });

    reg.app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('profile.html', { title: 'Profile', user: req.user });
    });

    reg.app.use(reg.express.static('public'));

    require(reg.root+'/server/default-handlers')(reg.app);

    let listener = reg.app.listen(process.env.PORT, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });
})();