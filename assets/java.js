$(document).ready(function () {

	var topics = ["eggs benedict", "lobster", "Macaroni and cheese", "steak", "fried chicken", "calamari", "charcuterie", "risotto", "burger", "tacos", "gumbo"];

	// Add buttons for original food array
	function renderButtons() {
		$("#food-buttons").empty();
		for (i = 0; i < topics.length; i++) {
			$("#food-buttons").append("<button class='btn btn-success' data-food='" + topics[i] + "'>" + topics[i] + "</button>");
		}
}

renderButtons();

	// Adding a button for food entered
	$("#add-food").on("click", function () {
		event.preventDefault();
		var food = $("#food-input").val().trim();
		topics.push(food);
		renderButtons();
		return;
});

$("button").on("click", function () {
    var food = $(this).attr("data-food");
    console.log(food);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=QLyUumuGk3jmUU0HGF4Ba58A5vEgbkcj&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.original_still.url);
            foodImage.attr("data-still", results[i].images.original_still.url);
            foodImage.attr("data-animate", results[i].images.original.url);
            foodImage.attr("data-state", "still");
            foodImage.attr("class", "gif");
            gifDiv.append(p);
            gifDiv.append(foodImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

    function changeState(){
        var state = $(this).attr("data-state");
        console.log(state);
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
    
        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
    
        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
    
    
    $(document).on("click", ".gif", changeState);



});



function changeState(){
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}


$(document).on("click", ".gif", changeState);

// });


// $(document).on("click", ".foodImage", function() {
//     var state = $(this).attr("data-state");
//     console.log("test");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });