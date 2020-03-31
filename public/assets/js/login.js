$(document).ready(function() {
    const login = $("form.login");
    const userInput = $("input#user-input");
    const passwordInput = $("input#password-input");

    function loginUser(username, password) {
        $.post("/api/login", {
            username: username,
            password: password
        }).then(function () {
            window.location.assign("/user");
        }).fail(function () {
            $("#alert .msg").text("Username or Password is incorrect");
            $("#alert").fadeIn(500);
            userInput.val("");
            passwordInput.val("");
        });
    }
    // Validate login information when login button is clicked
    login.on("submit", function(event){
        event.preventDefault();
        const userData = {
            username: userInput.val().trim(),
            password: passwordInput.val().trim()
        };
        // Confirm the fields were filled in
        if(!userData.username || !userData.password){
            $("#alert .msg").text("Username and password cannot be blank");
            $("#alert").fadeIn(500);
            userInput.val("");
            passwordInput.val("");
            return;
        }

        loginUser(userData.username, userData.password);
        userInput.val("");
        passwordInput.val("");
    });
});