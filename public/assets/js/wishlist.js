$(document).ready(() => {
    let userID;
    const wishlist = $(".wishlist-item");

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    function addEventListeners(wishlistBtn,libraryBtn){
        wishlistBtn.on("click", (event)=>{
            $.ajax("/api/wishlist/:id",{
                type: "DELETE",
                data: { userID: userID, id: event.toElement.id }
            })

                .then(()=>{
                    location.reload();
                });
        });
        if (libraryBtn.attr("class")==="library-add"){
            libraryBtn.on("click", (event)=>{
                const data = {userID: userID, id: event.toElement.id};
                $.post("/api/library", data, (res)=>{
                    console.log(res);
                });
                libraryBtn.text("Added to Library");
                libraryBtn.attr("class", "library-rem");
                libraryBtn.prop("disabled", true);
            });
        }
    }
    function buildElement(parent, data){
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
        const query = { UserId: userID, GameId: data.id };
        $.ajax({
            async: false,
            type: "GET",
            url: "/api/library",
            data: query,
            success: (res) => {
                if (res) {
                    libraryBtn.attr({ id: data.id, class: "library-rem" });
                    libraryBtn.text("Added to Library");
                    libraryBtn.prop("disabled", true);

                } else {
                    libraryBtn.attr({ id: data.id, class: "library-add" });
                    libraryBtn.text("Add to Library");
                }
            }
        });
        libraryCol.append(libraryBtn);
        addEventListeners(wishlistBtn, libraryBtn);
    }
    function makeSpinner(element) {
        const div = $("<div>");
        div.attr("class", "d-flex justify-content-center");
        element.append(div);
        const spinnerDiv = $("<div>");
        spinnerDiv.attr({ class: "spinner-border text-dark", role: "status" });
        div.append(spinnerDiv);
        const spinnerSpan = $("<span>");
        spinnerSpan.attr("class", "sr-only");
        spinnerSpan.text("Loading...");
        spinnerDiv.append(spinnerSpan);
    }
    for (let i = 0; i < wishlist.length; i++){
        const id = wishlist[i].attributes.id.value;
        const queryURL = "https://api.rawg.io/api/games/"+id;
        const liElement = $("div#"+id);
        $.get(queryURL, ()=>{
            makeSpinner(liElement);
        }).then((res)=>{
            $(".d-flex").remove();
            buildElement(liElement, res);

        });
    }

});