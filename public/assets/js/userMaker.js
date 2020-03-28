const userMaker = {
    createMainResult: function(data){
        const body = $("#searchResults");
        const searchHeader = $("<h3>");
        searchHeader.attr("class", "searchHeader");
        body.append(searchHeader);

        const divContainer = $("<div>");
        const divRow = $("<div>");
        const col1 = $("<div>");
        const imgContainer = $("<div>");
        const img = $("<img>");
        const pDeveloper = $("<div>");
        const pGenre = $("<p>");

        const col2 = $("<div>");
        const row2 = $("<div>");
        const pName = $("<h3>");
        const pDescription = $("<p>");
        const wishlistButton = $("<button>");
        const libraryButton = $("<button>");

        divContainer.attr("class", "container");
        divRow.attr("class", "row");
        col1.attr("class", "col-sm-4");
        imgContainer.attr("class", "container-fluid");
        img.attr({src: data.background_image, class: "search-img"});
        pDeveloper.attr("class", "row developer-button");
        pGenre.attr("class", "row genre");
        col2.attr("class", "col-sm-8");
        row2.attr("class", "row");
        pName.attr("id", "name");
        pDescription.attr("id", "description");
        wishlistButton.attr({id: data.id, class:"wishlist-add"});
        libraryButton.attr({id: data.id, class:"library-add"});

        pName.text(data.name);
        pDescription.text(data.description_raw);
        wishlistButton.text("Add to Wishlist");
        libraryButton.text("Add to library");

        data.developers.forEach(function (developers) {
            const dev = $("<p>");
            const devLink = $("<a>");
            devLink.text(developers.name);
            devLink.attr({id: developers.id, href: "#"});
            dev.append(devLink);
            pDeveloper.append(dev);
        });
        data.genres.forEach(function (genres) {
            const genre = $("<p>");
            genre.text(genres.name);
            pGenre.append(genre);
        });


        body.append(divContainer);
        divContainer.append(divRow);
        divRow.append(col1);
        col1.append(imgContainer);
        imgContainer.append(img);
        col1.append(pDeveloper);
        col1.append(pGenre);
        divRow.append(col2);
        col2.append(row2);
        row2.append(pName);
        row2.append(pDescription);
        divRow.append(wishlistButton);
        divRow.append(libraryButton);
    },

    createSubResult: function(data){
        const body = $("#searchResults");
        const container = $("<div>");
        container.attr("class", "container");
        data.results.forEach(function (element) {
            const divContainer = $("<div>");
            const divRow = $("<div>");
            const imgCol = $("<div>");
            const textCol = $("<div>");
            const img = $("<img>");
            const pName = $("<p>");
            const aLink = $("<a>");

            divContainer.attr("class", "container");
            divRow.attr("class", "row");
            imgCol.attr("class", "col-sm-2");
            textCol.attr("class", "col-sm-10");
            img.attr({src: element.background_image, class: "search-img"});
            pName.attr("id", "name");
            pName.attr("class", "suggestedGame");
            aLink.attr("id", element.id);
            aLink.attr("href", "#");
            aLink.attr("class", "newSeach");

            aLink.text(element.name);
            pName.append(aLink);
            body.append(divContainer);
            divContainer.append(divRow);
            divRow.append(imgCol);
            divRow.append(textCol);
            imgCol.append(img);
            textCol.append(pName);
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