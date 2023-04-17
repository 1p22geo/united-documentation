document.querySelector("button").addEventListener("click", ()=>{
    let uname = document.querySelector("#user").value;
    let pass = document.querySelector("#pass").value;
    let pass2 = document.querySelector("#pass2").value;

    if (!uname || !pass || !pass2){
        console.log("AAFF");
        return;
    }
    if (pass != pass2){
        console.log("BAAFF");
        return;
    }
    axios.post("/adduser", 
    {
        user: uname,
        pass: pass2
    });
});