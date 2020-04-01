$(document).ready( () => {
    const search = $("form#game-search");
    const searchTerm = $("input#user-input");
    const options = $("button#options");
    let userID;

    $.get("/api/user_data").then( (data) => {
        $(".username").text(data.username);
        userID = data.id;
    });
    const createTwitchStream = (twitchID)=>{
        const twitchDiv = $("<div>");
        twitchDiv.attr("id", "twitchStream");
        $("#searchResults").after(twitchDiv);
        const options = {
            width: 400,
            height: 300,
            video: twitchID,
            autoplay: false
        };
        const player = new Twitch.Player("twitchStream", options);
        player.setVolume(0.5);
    };
    const makeSpinner = ()=>{
        const div = $("<div>");
        div.attr("class", "d-flex justify-content-center");
        $("#searchResults").append(div);
        const spinnerDiv = $("<div>");
        spinnerDiv.attr({ class: "spinner-border text-dark", role: "status" });
        div.append(spinnerDiv);
        const spinnerSpan = $("<span>");
        spinnerSpan.attr("class", "sr-only");
        spinnerSpan.text("Loading...");
        spinnerDiv.append(spinnerSpan);
        const div2 = $("<div>");
        div2.attr("class", "d-flex justify-content-center");
        $("#suggestedResults").append(div2);
        const spinnerDiv2 = $("<div>");
        spinnerDiv2.attr({ class: "spinner-border text-dark", role: "status" });
        div2.append(spinnerDiv2);
        const spinnerSpan2 = $("<span>");
        spinnerSpan2.attr("class", "sr-only");
        spinnerSpan2.text("Loading...");
        spinnerDiv2.append(spinnerSpan2);
    };
    const getByName = (searchTerm) => {
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $("#twitchStream").remove();
        $("#searchResults").empty();
        $("#suggestedResults").empty();
        $("#twitchStream").empty();
        $.get(queryURL, makeSpinner)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/suggested";
                const twitchqueryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/twitch";
                $.get(queryURL)
                    .then((simResponse) => {
                        $(".spinner-border").remove();
                        userMaker.createMainResult(searchResponse, userID);
                        userMaker.createSubResult(simResponse, userID);
                        makeNewSearchEvent();
                    });
                $.get(twitchqueryURL)
                    .then((twitchResponse)=>{
                        console.log(twitchResponse);
                        let twitchID = -1;
                        twitchResponse.results.forEach((element)=>{
                            if (element.external_id > twitchID){
                                twitchID = element.external_id;
                            }
                        });
                        createTwitchStream(twitchID);
                    });

            });
    };
    const getByDeveloper = (searchTerm) =>{
        $("#twitchStream").remove();
        let queryURL = "https://api.rawg.io/api/developers/" + searchTerm;
        $("#searchResults").empty();
        $("#suggestedResults").empty();
        $.get(queryURL, makeSpinner)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games?developers=" + searchTerm;
                $.get(queryURL)
                    .then((gameSearch)=>{
                        $(".spinner-border").remove();
                        userMaker.createDevResult(searchResponse, userID);
                        userMaker.createSubResult(gameSearch, userID);
                        makeNewSearchEvent();
                    });
            });
    };

    const addToWishlist = (gameID) => {
        let newGame = {
            id: gameID,
            userID: userID,
        };
        $.post("/api/user/game", newGame).then($.post("/api/wishlist", newGame));
    };


    const addToLibrary = (gameID) => {
        const newGame = {
            id: gameID,
            userID: userID,
        };
        $.post("/api/user/game", newGame).then($.post("/api/library", newGame));
    };


    const addToWatch = (devId) => {
        const newDev = {
            id: devId,
            userID: userID
        };
        $.post("/api/developer", newDev)
            .then($.post("/api/watchlist", newDev));
    };

    const makeNewSearchEvent =() => {
        const newSearch = $("a.newSearch");
        const devButton = $("a.developer");
        const wishlistButton = $("button.wishlist-add");
        const removewish = $("button.wishlist-rem");
        const libraryAddButton = $("button.library-add");
        const libraryRemButton = $("button.library-rem");
        const addWatch =$("button.watchlist-add");
        const removeWatch = $("button.watchlist-rem");

        newSearch.off();
        devButton.off();
        wishlistButton.off();
        removewish.off();
        libraryAddButton.off();
        libraryRemButton.off();
        addWatch.off();
        removeWatch.off();

        newSearch.on("click", (event) => {
            getByName(event.toElement.id);
        });
        devButton.on("click", (event)=>{
            getByDeveloper(event.toElement.id);
        });
        wishlistButton.on("click", function(event){
            addToWishlist(event.toElement.id);
            $(this).attr("class", "wishlist-rem");
            $(this).text("Added to Wishlist");
            $(this).prop("disabled", true);
        });

        libraryAddButton.on("click",function(event){
            addToLibrary(event.toElement.id);
            $(this).attr("class", "library-rem");
            $(this).text("Added to Library");
            $(this).prop("disabled", true);
        });

        addWatch.on("click", function(event){
            addToWatch(event.toElement.id);
            $(this).attr("class", "watchlist-rem");
            $(this).text("Added to Watchlist");
            $(this).prop("disabled", true);
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