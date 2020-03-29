$(document).ready(() => {
    let userID;

    $.get("/api/user_data").then((data) => {
        userID = data.id;
    });

    $.get("/api/wishlist/:id", id, (response) => {
        console.log("Yay!");
    });
});