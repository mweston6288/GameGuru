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
            });
        });
    }
    function getDeveloper(searchTerm){
        const queryURL = "https://api.rawg.io/api/games/developers" + searchTerm.replace(/ /g, "-");
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
        searchType.val("");
    });
});
