$(document).ready(function() {
    $('#register').click(function() {
        const username = $('#regusername').val();
        const password = $('#regpassword').val();
        const confirmPassword = $('#regconfirmpassword').val();
        if (password != confirmPassword) {
            return;
        }
        $.post('/register', {
            username: username,
            password: password,
        }).done(function() {
            document.location.reload();
        });
    })
    $('#login').click(function() {
        const username = $('#username').val();
        $.post('/login', {
            username: username,
        }).done(function () {
            document.location.reload();
        });
    });
    $('#logout').click(function() {
        $.post('/logout', {}).done(function() {
            document.location.reload();
        });
    })

    $('#submit').click(function () {
        const message = $('#message').val();
        $.post('/message', {
            message: message,
        }).done(function () {
            document.location.reload();
        });
    });
});
