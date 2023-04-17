async function check(){
    let query = new URLSearchParams(window.location.search);
    // console.log(query);
    try{
        let session = query.get("session");
        // console.log(session);
        let res = await axios.get("/check?session="+session);
        // console.log(res)
        if(res.status != 200){
            window.location.replace("index.html");
        }
        setTimeout(check, res.data.expires - Date.now());
        document.querySelector("#username").textContent = res.data.user;
    }
    catch{
        window.location.replace("index.html");
    }
}
check();

async function formhandle(){
    let query = new URLSearchParams(window.location.search);
    let session = query.get("session");

    let title = document.querySelector("#title").value;
    let desc = document.querySelector("#desc").value;
    let image = document.querySelector("#image").value;

    if(!title || !desc){
        return;
    }

    axios.post("/document_add", {
        session: session,
        title: title,
        desc: desc,
        isImage: !!image,
        image: image
    });
    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
    document.querySelector("#image").value = "";
}