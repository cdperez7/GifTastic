$(document).ready(function(){

        // Array of foods to be populated as gifs
    	var foodArray = ["Eggs benedict", "Lobster", "Macaroni and cheese", "Steak", "Fried chicken", "Calamari", "Charcuterie", "Risotto", "Burger", "Tacos", "Crawfish"];


        // First step was creating buttons to add to top of page
        function createButtons(){
            $("#food-buttons").empty();

            // Looping through array and created button for each food
            for (var i = 0; i < foodArray.length; i++){
                var foodButton = $("<button>");

                //adding classes and attributes to each food to be referenced later on
                foodButton.addClass("food");
                foodButton.attr("food-name", foodArray[i]);
                foodButton.text(foodArray[i]);

                //appending the buttons for each food
                $("#food-buttons").append(foodButton);
            }
        }

        //Takes input from form in HTML to add a new button to page/array
        $("#add-food").on("click", function(event){
            event.preventDefault();
            var food = $("#food-input").val().trim();

            //adds food added in food input and pushes to the array and create button for what was added
            foodArray.push(food);
            $("#food-input").val(" ");
            createButtons();
        });

        //main function, gets gifs, animates/stills, etc.
        function addGifs(){
            var food = $(this).attr("food-name");

                //AJAX call + my giphy personal key - limit to 10 gifs per button
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                food + "&api_key=QLyUumuGk3jmUU0HGF4Ba58A5vEgbkcj&limit=10";

                $.ajax({
                    url: queryURL,
                    method: "GET"

                //empty gifs so that if you click many buttons you won't have 70 gifs on your page    
                }).done(function(response){
                    $("#gifs-appear-here").empty();

                    //targetting the information in the Gifs code
                    var results = response.data;

                    //loops through gif data and creates new div to display what the user clicks
                    for (var i = 0; i < results.length; i++){
                        var foodDiv = $("<div class='chosenFood'>");
                    
                    //targets the rating section within the gif and create a new p tag to add in below the gif
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    //specifies where to grab the still/animate data from the gif
                    var still = results[i].images.fixed_height_still.url;
                    var animate = results[i].images.fixed_height.url;

                    //toughest part for me in this hw that I had to find working examples for - creates the gif div, and adds attributes, sets the attributes for both still and animate. Last part made a string to reference the pausing/animating clicks later on. 
                    var gif = $("<img>").addClass("gif").attr("src", still).attr("data-still", still).attr("data-animate", animate).attr("data-state", "still");

                    //now we append the new div with the gif and the rating below it
                    foodDiv.append(gif);
                    foodDiv.append(p);

                    //attach to the correct spot in the html
                    $("#gifs-appear-here").append(foodDiv);
                }

                //specifies what happens when the gif is clicked by matching the addedClass above
                $(".gif").on("click", function(){

                    //using "this" keyword so that whatever is clicked is what is referenced for still/animate
                    var state = $(this).attr("data-state");

                    //if statement that will make still gifs animate and vice versa
                    if (state === "still"){
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

                });
        }
        //specifies what happens when buttons are clicked - .food class was added when buttons were created
        $(document).on("click", ".food", addGifs);

        //running the function to create buttons when the page is started
        createButtons();

});