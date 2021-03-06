const userMaker = {
    createMainResult: function(data, UserId){
        let query;
        const body = $("#searchResults");
        const searchHeader = $("<h3>");
        searchHeader.attr("class", "searchHeader");
        searchHeader.text("Search Results");
        body.append(searchHeader);

        const card = $("<div>");
        card.attr("class", "card");
        body.append(card);

        const divContainer = $("<div>");
        divContainer.attr("class", "container");
        card.append(divContainer);

        const divRow = $("<div>");
        divRow.attr("class", "row");
        divContainer.append(divRow);

        const col1 = $("<div>");
        col1.attr("class", "col-sm-4");
        divRow.append(col1);

        const cardLeft = $("<div>");
        cardLeft.attr("class","card");
        col1.append(cardLeft);

        const img = $("<img>");
        img.attr({ src: data.background_image, class: "search-img" });
        cardLeft.append(img);

        const cardBody = $("<div>");
        cardBody.attr("class","card-body");
        cardLeft.append(cardBody);

        const name = $("<h2>");
        name.text(data.name);
        cardBody.append(name);

        const devRow = $("<p>");
        devRow.attr("class", "card-text row");
        cardLeft.append(devRow);

        const developer = $("<div>");
        developer.attr("class", "card-text");
        data.developers.forEach(function (developers) {
            const dev = $("<p>");
            const devLink = $("<a>");
            devLink.text(developers.name);
            devLink.attr({ id: developers.id, class: "developer", href: "#" });
            dev.append(devLink);
            developer.append(dev);
        });
        cardBody.append(developer);

        const wishlistButton = $("<button>");
        query = {UserId: UserId, GameId: data.id};
        $.ajax({
            async: false,
            type: "GET",
            url: "/api/wishlist",
            data: query,
            success: (res)=>{
                if (res){
                    wishlistButton.attr({ id: data.id, class: "wishlist-rem" });
                    wishlistButton.text("Added to Wishlist");
                    wishlistButton.prop("disabled", true);
                } else{
                    wishlistButton.attr({ id: data.id, class: "wishlist-add" });
                    wishlistButton.text("Add to Wishlist");
                }
            }
        });
        cardBody.append(wishlistButton);

        const libraryButton = $("<button>");
        $.ajax({
            async: false,
            type: "GET",
            url: "/api/library",
            data: query,
            success: (res) => {
                if (res) {
                    libraryButton.attr({ id: data.id, class: "library-rem" });
                    libraryButton.text("Added to Library");
                    libraryButton.prop("disabled", true);

                } else {
                    libraryButton.attr({ id: data.id, class: "library-add" });
                    libraryButton.text("Add to Library");
                }
            }
        });
        cardBody.append(libraryButton);

        const col2 = $("<div>");
        col2.attr("class", "col-sm-8");
        divRow.append(col2);

        const pDescription = $("<p>");
        pDescription.attr("id", "description");
        pDescription.text(data.description_raw);
        col2.append(pDescription);

        const pGenre = $("<p>");
        pGenre.attr("class", "row genre");
        data.genres.forEach(function (genres) {
            const genre = $("<span>");
            genre.attr("class", "badge badge-secondary");
            genre.text(genres.name);
            pGenre.append(genre);
        });
        col2.append(pGenre);
    },

    createSubResult: function(data, UserId){
        let query;
        const body = $("#suggestedResults");
        const searchHeader = $("<h3>");
        searchHeader.attr("class", "suggestedHeader");
        searchHeader.text("Recommended");
        body.append(searchHeader);


        const container = $("<div>");
        container.attr({class: "container", id: "suggested"});
        data.results.forEach(function (element) {
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
            img.attr({ src: element.background_image, class: "search-img" });
            imgCol.append(img);

            const textCol = $("<div>");
            textCol.attr("class", "col-sm-6");
            divRow.append(textCol);

            const pName = $("<p>");
            pName.attr({class: "suggestedGame", id:"name"});
            textCol.append(pName);

            const aLink = $("<a>");
            aLink.attr({class: "newSearch", id: element.id, href: "#"});
            aLink.text(element.name);
            pName.append(aLink);

            const wishListCol = $("<div>");
            wishListCol.attr("class", "col-sm-2");
            divRow.append(wishListCol);

            const wishlistBtn = $("<button>");
            query = { UserId: UserId, GameId: element.id };
            $.ajax({
                async: false,
                type: "GET",
                url: "/api/wishlist",
                data: query,
                success: (res) => {
                    if (res) {
                        wishlistBtn.attr({ id: element.id, class: "wishlist-rem" });
                        wishlistBtn.text("Added to Wishlist");
                        wishlistBtn.prop("disabled", true);

                    } else {
                        wishlistBtn.attr({ id: element.id, class: "wishlist-add" });
                        wishlistBtn.text("Add to Wishlist");
                    }
                }
            });
            wishListCol.append(wishlistBtn);

            const libraryCol = $("<div>");
            libraryCol.attr("class", "col-sm-2");
            divRow.append(libraryCol);

            const libraryBtn = $("<button>");
            $.ajax({
                async: false,
                type: "GET",
                url: "/api/library",
                data: query,
                success: (res) => {
                    if (res) {
                        libraryBtn.attr({ id: element.id, class: "library-rem" });
                        libraryBtn.text("Added to Library");
                        libraryBtn.prop("disabled", true);

                    } else {
                        libraryBtn.attr({ id: element.id, class: "library-add" });
                        libraryBtn.text("Add to Library");
                    }
                }
            });
            libraryCol.append(libraryBtn);
        });
        body.append(container);
    },
    createDevResult: function(data, UserId){
        const query = { UserId: UserId, DeveloperId: data.id };

        const body = $("#searchResults");
        const searchHeader = $("<h3>");
        searchHeader.attr("class", "searchHeader");
        body.append(searchHeader);

        const divContainer = $("<div>");
        const divRow = $("<div>");
        const col1 = $("<div>");
        const imgContainer = $("<div>");
        const img = $("<img>");

        const col2 = $("<div>");
        const row2 = $("<div>");
        const pName = $("<h3>");
        const watchlistButton = $("<button>");

        divContainer.attr("class", "container");
        divRow.attr("class", "row");
        col1.attr("class", "col-sm-8");
        imgContainer.attr("class", "container-fluid");
        img.attr({ src: data.image_background, class: "search-img" });
        col2.attr("class", "col-sm-4");
        row2.attr("class", "row");
        pName.attr("id", "name");

        pName.text(data.name);
        console.log(query);
        $.ajax({
            async: false,
            type: "GET",
            url: "/api/watchlist",
            data: query,
            success: (res) => {
                if (res) {
                    watchlistButton.attr({ id: data.id, class: "watchlist-rem" });
                    watchlistButton.text("Added to Watchlist");
                    watchlistButton.prop("disabled", true);

                } else {
                    watchlistButton.attr({ id: data.id, class: "watchlist-add" });
                    watchlistButton.text("Add to Watchlist");
                }
            }
        });

        body.append(divContainer);
        divContainer.append(divRow);
        divRow.append(col1);
        col1.append(imgContainer);
        imgContainer.append(img);
        divRow.append(col2);
        col2.append(row2);
        row2.append(pName);
        row2.append(watchlistButton);
    },
};
userMaker;