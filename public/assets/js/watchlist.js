$(document).ready(() => {
    let userID;
    const watchlist = $(".watchlist-item");

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    function loadGames(searchTerm){
        const queryURL = "https://api.rawg.io/api/games?developers=" + searchTerm;
        $.get(queryURL)
            .then((response)=>{
                const parent = $("#watchlist-games");
                parent.empty();
                response.results.forEach((data)=>{
                    const container = $("<div>");
                    container.attr({ class: "container" });
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
                });
            });
    }
    function addEventListeners(watchlistBtn, gameBtn) {
        watchlistBtn.on("click", (event) => {
            $.ajax("/api/watchlist/", {
                type: "DELETE",
                data: { userID: userID, id: event.toElement.id }
            })

                .then(() => {
                    location.reload();
                });
        });
        gameBtn.on("click", (event) => {
            loadGames(event.toElement.id);
        });
    }
    function buildElement(parent, data) {
        const container = $("<div>");
        container.attr({ class: "container" });
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
        img.attr({ src: data.image_background, class: "search-img" });
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

        const watchlistCol = $("<div>");
        watchlistCol.attr("class", "col-sm-2");
        divRow.append(watchlistCol);

        const watchlistBtn = $("<button>");
        watchlistBtn.attr({ class: "watchlist-rem", id: data.id });
        watchlistBtn.text("Remove from watchlist");
        watchlistCol.append(watchlistBtn);

        const gameCol = $("<div>");
        gameCol.attr("class", "col-sm-2");
        divRow.append(gameCol);

        const gameBtn = $("<button>");
        gameBtn.attr({ class: "game-add", id: data.id });
        gameBtn.text("Check Games");
        gameCol.append(gameBtn);
        addEventListeners(watchlistBtn, gameBtn);
    }

    for (let i = 0; i < watchlist.length; i++) {
        const id = watchlist[i].attributes.id.value;
        const queryURL = "https://api.rawg.io/api/developers/" + id;
        const liElement = $("div#" + id);
        $.get(queryURL).then((res) => {
            buildElement(liElement, res);

        });
    }

});