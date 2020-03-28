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
        const password = $("#password-input").val().trim();
        const passwordConfirm = $("#password-input-confirm").val().trim();
        const newPassword = {};
        if (password !== passwordConfirm) {
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