    $(document).ready(function() {
        $('#login').click(function() {
            const username = $('#username').val();
            $.post('/login', {
                username: username,
            }).done(function() {
                document.location.reload();
            });
        });
        $('#quest').click(function() {
            const description = $('#description').val();
            const value = $('#value').val();
            $.post('/quest', {
                description: description,
                value: value
            }).done(function() {
                document.location.reload();
            });
        });
        $('.addpoints').click(function() {
            $.post('/addpoints', {
            }).done(function() {
                document.location.reload();
            });
        });
        $('#logout').click(function() {
            $.post('/logout', {}).done(function() {
                document.location.reload();
            });
        });
        /*$('#listedquest').click(function() {
            const value = $('#listedquest').val();
            $.post('/endquest', {
                value: value
            }).done(function() {
                document.location.reload();
            });
        });*/
    });