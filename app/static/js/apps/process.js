self.addEventListener('message', (ev)=>{
    console.log(ev.data);

    const params = {
        sumber: ev.data.sumber,
        url: ev.data.url
    }
    fetch("/api/v1/savenewsdata", {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then( response => response.json() )
        .then( data =>{
            console.log(data);
            if (data["data"]=="ok") {
                self.postMessage({"tridx":ev.data.tridx,"msg":"ok"})
            } else {
                self.postMessage({"tridx":ev.data.tridx,"msg":"error"})
            }
        })
        .catch(err=>console.log(err));

});

