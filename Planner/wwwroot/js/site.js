const uri = "api/todo";
let todos = null;
const tBody = $("#todostable");


function refreshTable() {
    // I broke it
}

function clearTable() {
    $("#todostable tbody").empty();
}


function validateForm() {
    //TODO --- Validate add task modal form
}

function clearTaskForm() {
    $('#newTaskModal').modal('hide');

    $(document).on("hidden.bs.modal", "#newTaskModal", function () {
        $("#taskform")[0].reset();
        console.log("hidden modal and cleared form");
    })
}


$(document).ready(function () {
    $('.modal [data-dismiss="modal"]').click(function () {
        clearTaskForm();
        console.log('Closed modal');
    });
});

// Count todo task objects
function getCount(data) {
    const el = $("#counter");
    let name = "to-do";
    if (data) {
        if (data > 1) {
            name = "to-dos";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

// get data from JSON object and append to table
function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").append("?"))
                    .append($("<td></td>").text(item.priority))
                    .append($("<td></td>").text(item.name))
                    .append($("<td></td>").text(item.memo))
                    .append($("<td></td>").text("X"));

                tr.appendTo(tBody);
            });

            //TODO --- Append deletion button to end of each task row
            todos = data;
        }
    })

}

// Post to json object based off of form values
function addItem() {
    const item = {
        name: $("#newTaskTitle").val(),
        memo: $("#newTaskMemo").val(),
        priority: $("#newTaskPriority").val(),
        icon: "question",
        isComplete: false
        //TODO --- Display icon in row based on item.icon
        //TODO --- Display check or X in row based on item.isComplete
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            clearTaskForm();
        }
    });

    clearTable(); // clear table to be populated again anew from JSON object

    return false;
}