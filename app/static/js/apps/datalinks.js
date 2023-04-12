$(document).ready(function() {
    
    $("#btnGetLinksToday").on("click", function() {
        linksToday()
    });
    $("#btnProses").on("click", function() {
        toProcess();
    });

});

$(document).on("click",".btn-delete",function() {
    if (confirm("Hapus link berita ini?")==true)  {
       var tr =  $(this).parent().parent();
       tr.remove();
    }  
});

function linksToday() {
    $.ajax({
        url:"/api/v1/getlinkstoday",
        dataType:"json",
        method:"get",
        beforeSend: function() {
            $("#tblLinks tbody").html("");
            $("#tblLinks tbody").html("<img src='static/images/wait.gif' width='110px' height='60px' class='pull-right'>");
        }, 
        success: function(data) {
            var str='';
            if (data["data"].length>0) {    
                for (var i=0; i<data["data"].length; i++)
                {
                    str=str+"<tr id='"+i+"'><td>"+data["data"][i]["sumber"]+"</td><td>"+data["data"][i]["link"]+"</td><td></td><td><button class='btn btn-danger btn-delete'>Delete</button></tr>";
                }
                $("#tblLinks tbody").html(str);
            } else {
                $("#tblLinks tbody").html("Empty!");
            }
        }
    });
}

function toProcess() {
    if ($("#tblLinks tbody tr").length==0) {
        alert("Data tidak ada!");
        return false;
    }

    let worker = new Worker('static/js/links/process.js');
    worker.addEventListener('message', workerMessage);
    worker.addEventListener('error', workerError);
    for (var i=0; i<$("#tblLinks tbody tr").length; i++)
    {
        worker.postMessage({'tridx':i, 'sumber':$("#tblLinks tbody tr:eq("+i+") td:eq(0)").text(), 'url': $("#tblLinks tbody tr:eq("+i+") td:eq(1)").text()});
    }

}

function workerMessage(ev) {
    if (ev.data.msg=="ok") {
        $("#tblLinks tbody tr:eq("+ev.data.tridx+")").attr("bgcolor","blue");
        $("#tblLinks tbody tr:eq("+ev.data.tridx+")").css({"color":"white"});
        $("#tblLinks tbody tr:eq("+ev.data.tridx+") td:eq(2)").html("&#9745;")
    }
    else {
        $("#tblLinks tbody tr:eq("+ev.data.tridx+")").attr("bgcolor","grey");
        $("#tblLinks tbody tr:eq("+ev.data.tridx+")").css({"color":"white"});
        $("#tblLinks tbody tr:eq("+ev.data.tridx+") td:eq(2)").html("&#9746;")
    }

}

function workerError(err) {
    console.log(err.message, err.filename);
}