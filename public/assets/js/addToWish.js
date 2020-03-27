const gName = $("#pName").val();


$("#wishlist-add").on("click", (event) => {
    const Url = "https://api.rawg.io/api/games/"+gName.replace(/ /g, "-");
    $.get(Url)
        .then((req) => {
                event.preventDefault();
                const newGame = {
                    gameID: req.id,
                    platformID: req.platforms.id,
                    storeID: req.stores.id,
                    developergameID: req.developers.id,
                    genresID: req.genres.id,
                    tagID: req.tags.id,
                    publishergameID: req.publishers.id,
        
                };
                console.log(newGame);
                $.post("/api/user/game", newGame)
                .then((data) => {
                    console.log(data)
          });
    }); 
})