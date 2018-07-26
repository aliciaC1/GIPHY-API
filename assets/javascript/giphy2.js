$(document).ready(function() {

   
    var films = ["My Neighbor Totoro", "Kiki's Delivery Service", "Princess Mononoke"];

    function displayFilmGif() {

        var film = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        film + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific film button being clicked // 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;

            // deleting previous gifs, so new gifs won't continue to append & only show current button gifs 
            $('#gif-view').empty();
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p class='overlay'>").text("Rating: " + rating);

                // Creating an image tag
                var  filmImage = $('<img src=' + results[i].images.fixed_height_still.url + 'data-still=' +
                results[i].images.fixed_height_still.url + ' data-animate=' +
                results[i].images.fixed_height.url + ' data-state="still" class="filmImage">');
          
                // image tag an src attribute and data state of still 
            
                filmImage.attr("src", results[i].images.fixed_height_still.url);
            
                // Appending the paragraph and filmImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(filmImage);

                // Prepending the gifDiv to the "#gifs-view" div in the HTML
                $("#gif-view").prepend(gifDiv);
              }
            }
    
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the previous buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of films
        for (var i = 0; i < films.length; i++) {

          // Then dynamicaly generating buttons for each film in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button type='button' class='btn btn-outline-dark'><br>");
          // Adding a class of film-btn to our button
          a.addClass("film-btn");
          // Adding a data-attribute
          a.attr("data-name", films[i]);
          // Providing the initial button text
          a.text(films[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a button is clicked
      $("#add-film").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var film = $("#film-input").val().trim();

        // Adding film from the textbox to our array
        films.push(film);

        // Calling renderButtons which handles the processing of film array
        renderButtons();
      });

      // Displays gifs on click film btns 
      $(document).on("click", ".film-btn", displayFilmGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      //function to animate gifs on click 
      function imgAnimate() {
        //Sets state to be the data in state for the images
        var state = $(this).attr('data-state');
    
        //Switches the source to the animate/still state depending on what it is currently at
          if(state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }
            else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
      }
    
      
      //Runs the imgAnimate function if the images are clicked
      $(document).on('click', '.filmImage', imgAnimate);
       
 
});
