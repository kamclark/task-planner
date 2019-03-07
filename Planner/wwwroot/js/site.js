// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const uri = "api/todo";
let todos = null;
const tBody = $("#todostable");


function refreshTable() {
    $("#todostable tbody").empty();
    $("#todostable").load("index.html #todostable");
}

function clearTable() {
    $("#todostable tbody").empty();
}

$(document).ready(function () {
});

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

            todos = data;
        }
    })

}

            /*$.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append(
                        $("<td></td>").append(
                            $("<input/>", {
                                type: "checkbox",
                                disabled: true,
                                checked: item.isComplete
                            })
                        )
                    )
                    .append($("<td></td>").text(item.name))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            todos = data;
        }
    });
}*/


function addItem() {
    const item = {
        name: $("#newTaskTitle").val(),
        memo: $("#newTaskMemo").val(),
        priority: $("#newTaskPriority").val(),
        icon: "question",
        isComplete: false
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
            $("#add-name").val("");
        }
    });

    const tBody = $("#todostable");
    clearTable;
    refreshTable();


    $('#newTaskModal').modal('toggle'); //or  $('#IDModal').modal('hide');
    return false;
}