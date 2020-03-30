$(document).ready(() => {
    let userID;
    const wishlist = $(".wishlist-item");

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    function addEventListeners(wishlistBtn,libraryBtn){
        wishlistBtn.on("click", (event)=>{
            console.log(event);
            $.ajax("/api/wishlist",{
                type: "DELETE",
                data: { userID: userID, id: event.toElement.id }
            })

            .then(()=>{
                location.reload
            })
        })
    }
    function buildElement(parent, data){
        console.log(parent);
        const container = $("<div>");
        container.attr({ class: "container"});
        parent.append(container);

        const card = $("<div>");
        card.attr("class", "card");
        container.append(card);

        const divRow = $("<div>");
        divRow.attr("class", "row");
        card.append(divRow);

        const imgCol = $("<div>");
        imgCol.attr("class", "col-sm-2");
        divRow.append(imgCol);

        const img = $("<img>");
        img.attr({ src: data.background_image, class: "search-img" });
        imgCol.append(img);

        const textCol = $("<div>");
        textCol.attr("class", "col-sm-6");
        divRow.append(textCol);

        const pName = $("<p>");
        pName.attr({ class: "suggestedGame", id: "name" });
        textCol.append(pName);

        const aLink = $("<a>");
        aLink.attr({ class: "newSearch", id: data.id, href: "#" });
        aLink.text(data.name);
        pName.append(aLink);

        const wishListCol = $("<div>");
        wishListCol.attr("class", "col-sm-2");
        divRow.append(wishListCol);

        const wishlistBtn = $("<button>");
        wishlistBtn.attr({ class: "wishlist-rem", id: data.id });
        wishlistBtn.text("Remove from Wishlist");
        wishListCol.append(wishlistBtn);

        const libraryCol = $("<div>");
        libraryCol.attr("class", "col-sm-2");
        divRow.append(libraryCol);

        const libraryBtn = $("<button>");
        libraryBtn.attr({ class: "library-add", id: data.id });
        libraryBtn.text("Add to Library");
        libraryCol.append(libraryBtn);
        addEventListeners(wishlistBtn, libraryBtn);
    }
    console.log(wishlist);

    for (let i = 0; i < wishlist.length; i++){
        const id = wishlist[i].attributes.id.value;
        const queryURL = "https://api.rawg.io/api/games/"+id;
        const liElement = $("div#"+id);
        console.log(queryURL);
        $.get(queryURL).then((res)=>{
            buildElement(liElement, res);

        });
    }

});