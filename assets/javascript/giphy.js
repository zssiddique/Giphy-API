$(document).ready(function() {

    $("#addAnimal").on("click", function() {

        var animal = $("#animal-input").val();
        console.log(animal);
        const animalbtn = $("<button>");
        animalbtn.addClass("animal-button animal animal-button-color");
        animalbtn.attr("data-animal", animal);
        animalbtn.text(animal);
        $("#animalButtons").append(animalbtn);
   
    });

    function animalGif() {
        var animal = $(this).attr("data-animal");
        //var animal = "cat";
        console.log(animal);
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            methid: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                var results = response.data;
                console.log(queryURL);
                console.log(results);
                for (let i = 0; i < results.length; i++) {
                    var animalDiv = $("<div>");
                    var rating = $("<p>").text(results[i].rating);
                    var animalImg = $("<img id = 'gif' >");
                    animalImg.attr("src", results[i].images.downsized_still.url);
                    animalImg.attr({ 'data-animate': results[i].images.downsized.url });
                    animalImg.attr({ 'data-state': 'data-still' });
                    animalImg.attr({ 'data-still': results[i].images.downsized_still.url });
                    animalDiv.append(rating);
                    animalDiv.append(animalImg);
                    $("#animals").prepend(animalDiv);
                }
            });
    }

    function changeGif() {
        
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    }

    $(document).on("click", ".animal-button", animalGif);

    $(document).on("click", "#gif", changeGif);

});