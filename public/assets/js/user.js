$(document).ready(function () {
    const search = $("form.game-search");
    const searchTerm = $("input#user-input");
    const searchType = $("select#search-type");

    $.get("/api/user_data").then(function (data) {
        $(".username").text(data.username);
        userID = data.id;
    });
    function createSubResult(data){
        const body = $("#searchResults");
        data.results.forEach(function (element) {
            const divContainer = $("<div>");
            const divRow = $("<div>");
            const pName = $("<p>");

            divContainer.attr("class", "container");
            divRow.attr("class", "row");
            pName.attr("id", "name");

            pName.text(element.name);
            body.append(divContainer);
            divContainer.append(divRow);
            divRow.append(pName);
        });
    }

    function createMainResult(data){
        console.log(data);
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
        wishlistButton.attr("id", "wishlist-add");
        libraryButton.attr("id", "library-add");
        img.attr("src", data.background_image);

        pName.text(data.name);
        pDescription.text(data.description_raw);
        data.developers.forEach(function (developers) {
            const dev = $("<p>");
            dev.text(developers.name);
            pDeveloper.append(dev);
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

    }
    function displayResults(mainResult, suggestedResult) {
        $("#searchResults").empty();
        createMainResult(mainResult);
        createSubResult(suggestedResult);
    }

    // This is where I'm calling the API
    function getName(searchTerm) {
        let queryURL = "https://api.rawg.io/api/games/" + searchTerm.replace(/ /g, "-");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (searchResponse) {
            queryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/suggested";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (simResponse) {
                displayResults(searchResponse, simResponse);
            });
        });
    }
    function searchAPI(searchTerm, searchType) {
        switch (searchType) {
        case "name":
            getName(searchTerm);
            break;
        case "developer":
            //getDeveloper(searchTerm);
            break;
        default: return;
        }
    }
    search.on("submit", function (event) {
        event.preventDefault();
        searchResults = [];
        const searchData = {
            searchTerm: searchTerm.val().trim(),
            searchType: searchType.val().trim()
        };
        if (!searchData.searchTerm) {
            return;
        }
        searchAPI(searchData.searchTerm, searchData.searchType);
        searchTerm.val("");
    });
});