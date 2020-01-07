$(document).ready(function() {

    $(".scrape").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function(data) {
            console.log(data);
            location.reload();
        })
    });
    
    $(".clear").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/clear"
        }).then(function(data) {
            console.log(data);
            window.location="/"
        })
    })

    $(".save").on("click", function(event) {
        event.preventDefault();
        console.log("click");
        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
        }).then(function(data) {
            location.reload();
        });
    });

});