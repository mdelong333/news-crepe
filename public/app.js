$(document).ready(function() {

    $(".scrape").on("click", function(event) {
        // event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function(data) {
            console.log(data);
            window.location="/";
        });
    });
    
    $(".clear").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/clear"
        }).then(function(data) {
            console.log(data);
            window.location="/";
        });
    });

    $(".save").on("click", function(event) {
        event.preventDefault();
        console.log("click");
        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
        }).done(function(data) {
            location.reload();
        });
    });

    $(".remove").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            method: "PUT",
            url: "/articles/remove/" + id,
        }).then(function(data) {
            location.reload();
        });
    });

    $(".notes").on("click", function(event) {
        event.preventDefault();
        var id= $(this).attr("data-id");
        console.log(id);

        $.ajax({
            method: "GET",
            url: "/articles/" + id
        }).then(function(data) {
            console.log(data);
            $("#modal-title").text(data.title);
            $("#save-note").attr("data-id", data._id);

            if (data.note) {
                $(".note-div").append(`<div>
                <h3>${data.note.title}</h3>
                <h6>${data.note.body}</h6>
                </div>`)
            }
        })
        
    })

    $("#save-note").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                title: $("#title").val(),
                body: $("#body").val()
            }
        }).then(function(data) {
            console.log(data);
            $("#body").val("");
            $("#title").val("");
        });
    });
});