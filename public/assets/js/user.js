$(document).ready(function () {
    const search = $("form.game-search");
    const searchTerm = $("input#user-input");
    const searchType = $("select#search-type");
    let searchResults;
    // let userID;
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".username").text(data.username);
        userID = data.id;
    });
    function displayResults(searchResults){
        const body = $("#searchResults");
        console.log(body);
        searchResults.forEach(function(element){
            console.log(element);
            const divContainer = $("<div>");
            const divRow = $("<div>");
            const pName = $("<p>");
            const pDeveloper = $("<div>");
            const pGenre = $("<p>");
            const pDescription = $("<p>");

            divContainer.attr("class", "container");
            divRow.attr("class", "row");
            pName.attr("id", "name");
            pDeveloper.attr("id", "developer");
            pGenre.attr("id", "genre");
            pDescription.attr("id", "description");

            pName.text(element.name);
            pDescription.text(element.description);
            element.developers.forEach(function(developers){
                const dev = $("<p>");
                dev.text(developers.name);
                pDeveloper.append(dev);
            });
            element.genres.forEach(function (genres) {
                const genre = $("<p>");
                genre.text(genres.name);
                pGenre.append(genre);
            });
            body.append(divContainer);
            divContainer.append(divRow);
            divRow.append(pName);
            divRow.append(pDeveloper);
            divRow.append(pGenre);
            divRow.append(pDescription);

        });
    }
    function getName(searchTerm){
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            searchResults.push(response);
            queryURL = "https://api.rawg.io/api/games/" + response.id + "/suggested";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                response.results.forEach(function(element){
                    searchResults.push(element);
                });
                console.log(searchResults);
                displayResults(searchResults);
            });
        });
    }
    function getDeveloper(searchTerm){
        const queryURL = "https://api.rawg.io/api/games/" + searchTerm.replace(/ /g, "-");
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    }
    function searchAPI(searchTerm, searchType){
        switch (searchType){
        case "name":
            getName(searchTerm);
            break;
        case "developer":
            getDeveloper(searchTerm);
            break;
        default: return;
        }
    }
    search.on("submit", function(event){
        event.preventDefault();
        searchResults = [];
        const searchData= {
            searchTerm: searchTerm.val().trim(),
            searchType: searchType.val().trim()
        };
        if (!searchData.searchTerm){
            return;
        }
        searchAPI(searchData.searchTerm, searchData.searchType);
        searchTerm.val("");
    });
});
