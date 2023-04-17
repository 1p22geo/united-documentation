async function add_docs(){
    let query = new URLSearchParams(window.location.search);
    try{
        let session = query.get("session");

        let res = await axios.get("/docs?session="+session);
        if(res.status != 200){
            window.location.replace("index.html");
        }
        docs = res.data;
        console.log(docs);

        const container = document.querySelector("#docs");

        docs.forEach(doc => {
            let article = document.createElement("article");
            article.classList.add("col-span-1");
            let h2 = document.createElement("h2");
            h2.classList.add("text-xl", "font-semibold");
            h2.textContent = doc.title;
            article.appendChild(h2);
            let h3 = document.createElement("h3");
            h3.classList.add("text-right","font-thin","mb-1","-mt-1");
            h3.textContent = doc.author;
            article.appendChild(h3);
            if (doc.hasImage){
                let img = document.createElement("img");
                img.classList.add("p-4", "w-1/2", "float-left");
                img.src = doc.image;
                img.alt = "user image";
                article.appendChild(img);
            }

            let p = document.createElement("p");
            p.classList.add("text-left");
            p.textContent = doc.desc;
            article.appendChild(p);
            let button = document.createElement("button");
            button.classList.add("float-right", "rounded-full", "p-2", "bg-emerald-300");
            button.textContent = "Report";
            console.log(doc._id)
            button.onclick = async ()=>{
                await axios.post("/del_doc", {session: session, doc:doc._id});
                window.location.reload()
            }
            article.appendChild(button);
            container.appendChild(article);
        });

    }
    catch{
        window.location.replace("index.html");
    }
}
add_docs();