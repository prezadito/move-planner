
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyAW-4T5bpS-_wSsv8DwAMphCpdq-G4pRe8">');

    // Update greeting
    $greeting.text('So you want to live at ' + address+ '?');
    
    // Load New York Times articles



    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
