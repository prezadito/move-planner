
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
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key=831032deb5a94bb6923a338fb8c201fe";
    
    $.getJSON(nytUrl, function( data ) {
        $nytHeaderElem.text('New York Times Articles About ' + city);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };
    })
    .done(function() {
        console.log("Loading NYT articles was a Success!");
        })
    .fail(function() {
        $nytHeaderElem.text('No New York Times Articles About ' + city);
    });


    // Wikipedia AJAX requests
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback";

    // If the request takes longer than 800 milliseconds (8 seconds) to come back, do this:
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get Wikipedia resources');
    }, 800);

    $.ajax(wikiUrl, {
        dataType: "jsonp",
        // jsonp: "callback",
        success: function ( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            // Don't timeout if request came back successfully
            clearTimeout(wikiRequestTimeout);

        }
    });

    return false;
};

$('#form-container').submit(loadData);
