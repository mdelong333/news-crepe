// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
// });


$("#scrape").on("click", function(event) {
    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function(data) {
        console.log(data);
        window.location="/"
    })
});

$("#clear").on("click", function(event) {
    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "/clear"
    }).done(function(data) {
        console.log(data);
        window.location="/"
    })
})
