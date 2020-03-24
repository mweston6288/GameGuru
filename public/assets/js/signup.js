$(document).ready(function () {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const usernameInput = $("input#user-input");
    const passwordInput = $("input#password-input");
    const passwordConfirm = $("input#password-input-confirm");
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    function signUpUser(username, password) {
        $.post("/api/signup", {
            username: username,
            password: password
        })
            .then(function () {
                window.location.replace("/user");
                // If there's an error, handle it by throwing up a bootstrap alert
            }).catch(handleLoginErr);
    }


    // When the signup button is clicked, we validate the username and password are not blank
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        const userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim(),
            passwordConfirm: passwordConfirm.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }
        if (userData.password !== userData.passwordConfirm){
            return;
        }
        // If we have a username and password, run the signUpUser function
        signUpUser(userData.username, userData.password);
        usernameInput.val("");
        passwordInput.val("");
        passwordInputConfirm.val("");
    });

});
