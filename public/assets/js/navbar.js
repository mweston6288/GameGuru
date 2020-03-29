$(document).ready(() => {
    const wishlist = $("#wishlist");
    let userID;

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    wishlist.on("click",(req,res)=>{
        const id = {id:userID};
        $.get("/wishlist/:id", id);
    });
})
;