    $(document).ready(function(){
      var loggedIn = false;
      
      $(".login-btn").click(function(){
        loggedIn = !loggedIn;
        $(this).text(loggedIn ? "Logout" : "Login");
        if (loggedIn) {
          $(this).append('<div class="welcome-message">Welcome rdetzner</div>');
        } else {
          $(".welcome-message").remove();
        }
      });
    });