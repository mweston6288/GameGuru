$(document).ready( () => {
    const search = $("form#game-search");
    const searchTerm = $("input#user-input");
    const options = $("button#options");
    let userID;

    $.get("/api/user_data").then( (data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    const getByName = (searchTerm) => {
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $("#searchResults").empty();
        $("#suggestedResults").empty();
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
    const getByDeveloper = (searchTerm) =>{
        let queryURL = "https://api.rawg.io/api/developers/" + searchTerm;
        $("#searchResults").empty();
        $("#suggestedResults").empty();
        $.get(queryURL)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games?developers=" + searchTerm;
                $.get(queryURL)
                    .then((gameSearch)=>{
                        userMaker.createDevResult(searchResponse);
                        userMaker.createSubResult(gameSearch);
                        makeNewSearchEvent();
                    });
            });
    };

    const addToWishlist = (gameID)=>{
        const Url = "https://api.rawg.io/api/games/"+ gameID;
        $.get(Url)
            .then((req) => {
                event.preventDefault();
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
                $.post("/api/user/game", newGame);
            });
    };
    const makeNewSearchEvent =() => {
        const newSearch = $("a.newSearch");
        const devButton = $("a.developer");
        const wishlistButton = $("button.wishlist-add");
        newSearch.on("click", (event) => {
            getByName(event.toElement.id);
        });
        devButton.on("click", (event)=>{
            getByDeveloper(event.toElement.id);
        });
        wishlistButton.click((event)=>{
            addToWishlist(event.toElement.id);
        });
    };
    search.on("submit", (event) => {
        event.preventDefault();
        const searchData = {
            searchTerm: searchTerm.val().trim(),
        };
        if (!searchData.searchTerm) {
            return;
        }
        getByName(searchData.searchTerm);
        searchTerm.val("");
    });
    options.click((event)=>{
        event.preventDefault();
        window.location.assign("/options");
    });
});