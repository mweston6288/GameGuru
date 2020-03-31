$(document).ready(() => {
    let userID;

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    $("#return").on("click",()=>{
        window.location.assign("/user");
    });
    $(".changeUsername").on("submit", (event)=>{
        event.preventDefault();
        const newUsername = {
            name: $("#username").val().trim()
        };
        if (!newUsername.name){
            console.log("Username cannot be blank");
            return;
        }
        newUsername.id = userID;
        $.ajax({
            type: "PUT",
            url: "/api/user",
            data: newUsername
        }).then(function () {
            window.location.href = "/options";
        });
    });
    $(".changePassword").on("submit",(event)=>{
        event.preventDefault();
        const newPassword = {
            password: $("#password-input").val().trim(),
            passwordConfirm: $("#password-input-confirm").val().trim()

        };
        if (!newPassword.password){
            console.log("Password cannot be blank");
            return;
        }
        if (newPassword.password !== newPassword.passwordConfirm) {
            console.log("Password fields do not match");
            return;
        }
        newPassword.id = userID;
        newPassword.password = password;
        $.ajax({
            type: "PUT",
            url: "/api/user",
            data: newPassword
        }).then(function () {
            window.location.href = "/options";
        });
    });
});