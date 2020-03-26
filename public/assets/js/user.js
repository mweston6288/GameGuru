$(document).ready( () => {
    const search = $("form.game-search");
    const searchTerm = $("input#user-input");
    const searchType = $("select#search-type");

    $.get("/api/user_data").then( (data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    function makeNewSearchEvent() {
        const newSearch = $("a.newSeach");

        newSearch.click((event) => {
            console.log(event);
            searchAPI(event.toElement.text, "name")
        })
    }
    const getName = (searchTerm) => {
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $.get(queryURL)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/suggested";
                $.get(queryURL)
                    .then((simResponse) => {
                        $("#searchResults").empty();
                        userMaker.createMainResult(searchResponse);
                        userMaker.createSubResult(simResponse);
                        makeNewSearchEvent();
                    });
            });
    };
    const searchAPI = (searchTerm, searchType) => {
        switch (searchType) {
        case "name":
            getName(searchTerm);
            break;
        case "developers":
            //getDeveloper(searchTerm);
            break;
        default: return;
        }
    };
    search.on("submit", (event) => {
        event.preventDefault();
        console.log(event);

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