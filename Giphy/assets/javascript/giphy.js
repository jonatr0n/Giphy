//js loads when page loads
$(document).ready(function () {
    populateButtons(topics, 'button', '#buttons');
    // console.log("test");
});

// listing my array of topics - pokemon
var topics = ["Charmander", "Squirtle", "Bulbasaur"];

// function that populates and appends buttons
function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
};

// funtion that pulls data and appends gif images from searches, adds class and ratings
$(document).on('click', '.button', function () {
    $('#gif-here').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=10';
    // ajax request
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                //add class
                var pokeDiv = $('<div class=\"poke-item\">');
                
                //add and text ratings
                var rating = response.data[i].rating;
                var p = $('<p class="rating">').text('Rating: ' + rating); //might have issue
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                
                //image handlers
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('pokeImage');
                
                //apend poke div's
                pokeDiv.append(p);
                pokeDiv.append(image);
                $('#gif-here').append(pokeDiv);
            }
        })

});

// on click, can animate or pause gif images
$(document).on('click', '.pokeImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

$('#add-poke').on('click', function () {
    var newPoke = $('input').eq(0).val();
    topics.push(newPoke);
    console.log(topics);
    populateButtons(topics, 'button', '#buttons'); //forgot this stupid hashtag
    return false;
});
