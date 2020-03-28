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
            name: $("#user-input").val().trim()
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
});