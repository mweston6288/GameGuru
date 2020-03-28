$(document).ready( () => {
    const search = $("form.game-search");
    const searchTerm = $("input#user-input");
    const searchType = $("select#search-type");
    let userID;

    $.get("/api/user_data").then( (data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    const getName = (searchTerm) => {
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $("#searchResults").empty();
        $.get(queryURL)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/suggested";
                $.get(queryURL)
                    .then((simResponse) => {
                        userMaker.createMainResult(searchResponse);
                        userMaker.createSubResult(simResponse);
                        makeNewSearchEvent();
                    });
            });
    };
    const getDeveloper = (searchTerm) =>{
        let queryURL = "https://api.rawg.io/api/games?developers=" + searchTerm;
        $("#searchResults").empty();
        $.get(queryURL)
            .then((searchResponse) => {
                userMaker.createDevResult(searchResponse);
                makeNewSearchEvent();
            });
    };
    const searchAPI = (searchTerm, searchType) => {
        switch (searchType) {
        case "name":
            getName(searchTerm);
            break;
        case "developer":
            getDeveloper(searchTerm);
            break;
        default: return;
        }
    };

    const addToWishlist = (gameID)=>{
        const Url = "https://api.rawg.io/api/games/"+ gameID;
        $.get(Url)
            .then((req) => {
                event.preventDefault();
                console.log(req.genres);
                /*const pArray = req.platforms;
                const pArrayId = [];
                pArray.forEach((element) => {
                    pArrayId.push((element.platform.id));
                });
                const dArray = req.developers;
                const dArrayId = [];
                dArray.forEach((element) => {
                    dArrayId.push(element.id);
                });
                const gArray = req.genres;
                const gArrayId = [];
                gArray.forEach((element) => {
                    gArrayId.push(element.id);
                });
                const tArray = req.tags;
                const tArrayId = [];
                tArray.forEach((element) => {
                    tArrayId.push(element.id);
                });
                const pubArray = req.publishers;
                const pubArrayId = [];
                pubArray.forEach((element) => {
                    pubArrayId.push(element.id);
                });*/
                const newGame = {
                    gameID: req.id,
                    //platformID: pArrayId,
                    //developergameID: dArrayId,
                    //genresID: gArrayId,
                    //tagID: tArrayId,
                    //publishergameID: pubArrayId,
                    userID: userID,
                };
                console.log(newGame);
                $.post("/api/user/game", newGame)
                    .then((data) => {
                        console.log(data);
                    });
            });
        console.log(gameID);
    };
    const makeNewSearchEvent =() => {
        const newSearch = $("a.newSeach");
        const devButton = $("a.developer");
        const wishlistButton = $("button.wishlist-add");
        newSearch.click((event) => {
            searchAPI(event.toElement.id, "name");
        });
        devButton.click((event)=>{
            console.log("!")
            searchAPI(event.toElement.id,"developer");
        });
        wishlistButton.click((event)=>{
            console.log(event);
            addToWishlist(event.toElement.id);
        });

    };
    search.on("submit", (event) => {
        event.preventDefault();

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