document.querySelector("button").addEventListener("click", async ()=>{
    let uname = document.querySelector("#user").value;
    let pass = document.querySelector("#pass").value;
    axios.post("/create_session", {
        user: uname,
        pass: pass
    }).then(function (response) {
        console.log(response);
        window.location.replace("/in.html?session=" + response.data);
      });
    
});