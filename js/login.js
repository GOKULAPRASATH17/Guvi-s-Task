$(document).ready(function() {
    $('#login-form').submit(function(event) {
        // prevent the form from submitting normally
        event.preventDefault();
  
        // get the username and password from the form
        var username = $('#username').val();
        var password = $('#password').val();
        $user = localStorage.getItem('username');
  localStorage.getItem('password');
  localStorage.getItem('username');
  localStorage.setItem('username', username);  
  localStorage.setItem('password', password);
  
  
  
        // send an Ajax request to the PHP script
        $.ajax({
            url: 'http://localhost/Last/php/login.php',
            type: 'POST',
            data: {user: username, pass: password},
            success: function(response) {
                // handle the response from the PHP script
                if (response == "success") {
                    $('#message').text("Login successful!");
                } else {
                    $('#message').text("Invalid username or password.");
                }
            },
            error: function() {
                $('#message').text("An error occurred while processing your request.");
            }
        });
    });
  });