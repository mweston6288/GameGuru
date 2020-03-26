const userMaker = {
    createMainResult: function(data){
        const body = $("#searchResults");
        const divContainer = $("<div>");
        const divRow = $("<div>");
        const pName = $("<p>");
        const pDeveloper = $("<div>");
        const pGenre = $("<p>");
        const pDescription = $("<p>");
        const wishlistButton = $("<button>");
        const libraryButton = $("<button>");
        const img = $("<img>");

        divContainer.attr("class", "container");
        divRow.attr("class", "row");
        pName.attr("id", "name");
        pDeveloper.attr("id", "developer");
        pGenre.attr("id", "genre");
        pDescription.attr("id", "description");
        wishlistButton.attr("id", data.id);
        wishlistButton.attr("class", "wishlist-add");
        libraryButton.attr("id", data.id);
        libraryButton.attr("class", "library-add");

        img.attr("src", data.background_image);

        pName.text(data.name);
        pDescription.text(data.description_raw);
        data.developers.forEach(function (developers) {
            const dev = $("<p>");
            const devButton = $("<button>");
            dev.text(developers.name);
            devButton.attr("id", developers.id);
            devButton.attr("class", "developer-button");
            devButton.text("Other games by this developer");
            pDeveloper.append(dev);
            pDeveloper.append(devButton);
        });
        data.genres.forEach(function (genres) {
            const genre = $("<p>");
            genre.text(genres.name);
            pGenre.append(genre);
        });
        wishlistButton.text("Add to Wishlist");
        libraryButton.text("Add to library");

        body.append(divContainer);
        divContainer.append(divRow);
        divRow.append(img);
        divRow.append(pName);
        divRow.append(pDeveloper);
        divRow.append(pGenre);
        divRow.append(pDescription);
        divRow.append(wishlistButton);
        divRow.append(libraryButton);
    },

    createSubResult: function(data){
        const body = $("#searchResults");
        data.results.forEach(function (element) {
            const divContainer = $("<div>");
            const divRow = $("<div>");
            const pName = $("<p>");
            const aLink = $("<a>");

            divContainer.attr("class", "container");
            divRow.attr("class", "row");
            pName.attr("id", "name");
            pName.attr("class", "suggestedGame");
            aLink.attr("id", element.id);
            aLink.attr("href", "#");
            aLink.attr("class", "newSeach");

            aLink.text(element.name);
            pName.append(aLink);
            body.append(divContainer);
            divContainer.append(divRow);
            divRow.append(pName);
        });
    },
    createDevResult: function(data){
        const body = $("#searchResults");
        data.results.forEach(function (element) {
            const divContainer = $("<div>");
            const divRow = $("<div>");
            const pName = $("<p>");
            const aLink = $("<a>");

            divContainer.attr("class", "container");
            divRow.attr("class", "row");
            pName.attr("id", "name");
            pName.attr("class", "suggestedGame");
            aLink.attr("id", element.id);
            aLink.attr("href", "#");
            aLink.attr("class", "newSeach");

            aLink.text(element.name);
            pName.append(aLink);
            body.append(divContainer);
            divContainer.append(divRow);
            divRow.append(pName);
        });
    }
};
userMaker;