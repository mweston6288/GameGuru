$(document).ready(() => {
    let userID;
    const library = $(".library-item");

    $.get("/api/user_data").then((data) => {
        $(".username").text(data.username);
        userID = data.id;
    });

    function addEventListeners(libraryBtn) {
        libraryBtn.on("click", (event) => {
            $.ajax("/api/library/:id", {
                type: "DELETE",
                data: { userID: userID, id: event.toElement.id }
            })
                .then(() => {
                    location.reload();
                });
        });
    }
    function buildElement(parent, data) {
        const container = $("<div>");
        container.attr({ class: "container" });
        parent.append(container);

        const card = $("<div>");
        card.attr("class", "card");
        container.append(card);

        const divRow = $("<div>");
        divRow.attr("class", "row");
        card.append(divRow);

        const imgCol = $("<div>");
        imgCol.attr("class", "col-sm-2");
        divRow.append(imgCol);

        const img = $("<img>");
        img.attr({ src: data.background_image, class: "search-img" });
        imgCol.append(img);

        const textCol = $("<div>");
        textCol.attr("class", "col-sm-6");
        divRow.append(textCol);

        const pName = $("<p>");
        pName.attr({ class: "suggestedGame", id: "name" });
        textCol.append(pName);

        const aLink = $("<a>");
        aLink.attr({ class: "newSearch", id: data.id, href: "#" });
        aLink.text(data.name);
        pName.append(aLink);

        const libraryCol = $("<div>");
        libraryCol.attr("class", "col-sm-4");
        divRow.append(libraryCol);

        const libraryBtn = $("<button>");
        libraryBtn.attr({ class: "library-rem", id: data.id });
        libraryBtn.text("Remove from library");
        libraryCol.append(libraryBtn);

        addEventListeners(libraryBtn);
    }

    for (let i = 0; i < library.length; i++) {
        const id = library[i].attributes.id.value;
        const queryURL = "https://api.rawg.io/api/games/" + id;
        const liElement = $("div#" + id);
        $.get(queryURL).then((res) => {
            buildElement(liElement, res);

        });
    }

});