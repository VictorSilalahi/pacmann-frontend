
var token = null;

$(document).ready(function() {
    
    token = localStorage.getItem('jwt-token');

    if (token) {
        loadTodos(token);
    } else {
        logOut();
    }

    $("#logoutid").on("click", function() {
        logOut();
    });
});

function logOut() {
    localStorage.removeItem("jwt-token");
    window.location.replace("http://127.0.0.1:3000");
}

function loadTodos(token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo",
        dataType:"json",
        method:"get",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#divTodos").html("");
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            // console.log(data['token']);
            console.log(data['data']);

            var str = '';
            for (var i=0; i<data['data'].length; i++) {
                    if (data['data'][i]['status']=='done') {
                        str = str + "<div class='panel panel-default' style='background-color:rgb(200,200,200)'>";
                    } else {
                        str = str + "<div class='panel panel-default' id='"+data['data'][i]['todoid']+"'>";
                    }
                    str = str + "    <div class='panel-heading'><span class='spanTitle'>"+data['data'][i]['title']+"</span></div>";
                    str = str + "    <div class='panel-body'>";
                    str = str + "        <span class='spanDesc'>"+data['data'][i]['desc']+"</span><br><hr>";
                    if (data['data'][i]['status']=='done') {
                        str = str + "           <button class='btn btn-default disabled'>edit</button>&nbsp;<button class='btn btn-danger disabled'>delete</button>&nbsp;<button class='btn btn-info disabled'>done</button>"
                    } else {
                        str = str + "           <button class='btn btn-default btn-edit'>edit</button>&nbsp;<button class='btn btn-danger btn-delete'>delete</button>&nbsp;<button class='btn btn-info btn-done'>done</button>"
                    }

                    str = str + "    </div>";
                    str = str + "</div>";
            }

            $("#divTodos").html(str);
        }
    });        


}

function todoDelete(todo_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo",
        data: {todo_id: todo_id},
        method:"delete",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}

function todoAdd(token) {

    const title = $("#modalAddEditTodo #txtTitle").val();
    const desc = $("#modalAddEditTodo #txtDesc").val();

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo",
        data: {title: title, desc: desc},
        method:"post",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}

function todoEdit(token) {

    const title = $("#modalAddEditTodo #txtTitle").val();
    const desc = $("#modalAddEditTodo #txtDesc").val();
    const todo_id = $("#modalAddEditTodo #txtTodoId").val();

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo",
        data: {title: title, desc: desc, todo_id: todo_id},
        method:"put",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}

function todoDone(todo_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo/status",
        data: {todo_id: todo_id},
        method:"put",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}

$(document).on("click",".btn-delete", function() {
    const todo_id = $(this).parent().parent().attr("id");

    ans = confirm("Are you sure to delete this todo item?");
    if (ans==true) {
        todoDelete(todo_id, token);
    }
});

$(document).on("click",".btn-done", function() {
    const todo_id = $(this).parent().parent().attr("id");

    ans = confirm("Are you sure to change this todo item status?");
    if (ans==true) {
        todoDone(todo_id, token);
    }
});

$(document).on("click","#btn-add", function() {

    $("#modalAddEditTodo .modal-title").text("Add new Todo");
    $("#modalAddEditTodo #mode").val("add");
    $("#modalAddEditTodo #txtTitle").val("");
    $("#modalAddEditTodo #txtDesc").val("");
    $("#modalAddEditTodo").modal("show");

});

$(document).on("click",".btn-edit", function() {

    $("#modalAddEditTodo .modal-title").text("Edit todo");
    $("#modalAddEditTodo #mode").val("edit");
    
    const todo_id = $(this).parent().parent().attr("id");
    const title = $(this).parent().prev().text();
    const desc = $(this).parent().find(".spanDesc").text();

    $("#modalAddEditTodo #txtTitle").val(title);
    $("#modalAddEditTodo #txtDesc").val(desc);
    $("#modalAddEditTodo #txtTodoId").val(todo_id);

    $(".btn-save-todo").text("Save");

    $("#modalAddEditTodo").modal("show");

});

$(document).on("click",".btn-save-todo", function() {

    if ($("#txtTitle").val()=='' || $("#txtDesc").val()=='') {
        alert("Required data not complete!");
        $("#txtTitle").focus();
        return false
    }

    if ($("#modalAddEditTodo #mode").val()=="add") {

        todoAdd(token);

    } else {

        todoEdit(token);
    }
    
    $("#modalAddEditTodo").modal("hide");

});
