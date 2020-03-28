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
        }).catch(function (err) {
            console.log(err);
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
            return;
        }

        loginUser(userData.username, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });
});