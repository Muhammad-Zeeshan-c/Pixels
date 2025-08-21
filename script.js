const accessKey = "TTlNinXFQ-kGN4g_Kn7LjP0QyPu1-N0ruvQH-W-x704";
let userInput = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-btn")
let SearchResult = document.querySelector(".search-result")
let moreResults = document.querySelector(".Show-more");
let loader = document.querySelector(".loader");
let body = document.querySelector("body");

let searchBtn_1 = document.querySelector(".search-nature")
let searchBtn_2 = document.querySelector(".search-cats")
let searchBtn_3 = document.querySelector(".search-abstract")


let imageModal=document.querySelector(".image-modal");
let modalImg=document.querySelector('.modal-img');
let closeImgBtn=document.querySelector(".close-btn");


let keyWord = "Apple";
let page = 1;

let counter = 0;


async function searchImgs(responsetime) {
    keyWord = userInput.value;

    let newurl = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=18`

    loader.style.display = "block";
    body.style.opacity = 0.4;
    try {
        await new Promise(resolve => setTimeout(resolve, responsetime));

        const response = await fetch(newurl);
        let data = await response.json();
        console.log(data);

        const results = data.results;

        results.map((result) => {

            //stroing download and visit link in anchor tags
            const downloadBtn = document.createElement("a");
            downloadBtn.href = result.links.download + "&dl=unsplash.jpg";  //download link
            downloadBtn.target = "_self";
            downloadBtn.className = "download-btn";
            downloadBtn.innerHTML = "<span>Download</span>";




            const visitBtn = document.createElement("a");
            visitBtn.href = result.links.html;
            visitBtn.target = "_blank";
            visitBtn.className = "visit-btn";
            visitBtn.innerHTML = "<span>Visit Site</span>"



            //creating wrapper btn class for btns
            const wrapperBtn = document.createElement("div");
            wrapperBtn.appendChild(downloadBtn);
            wrapperBtn.appendChild(visitBtn);
            wrapperBtn.className = "Button_class";


            //creating img and adding link in it
            const image = document.createElement("img");
            image.className = "wrapper_Img";
            image.src = result.urls.small;

            image.addEventListener("click", (event) => {
                const fullSizeUrl = result.urls.full;
                modalImg.src = fullSizeUrl;
                imageModal.style.display = "flex";
                scrollY="none";
            
            })


            //creating wrapper class for img and btns
            const wrapperClass = document.createElement("div");
            wrapperClass.className = "wrapper_class";

            wrapperClass.appendChild(image);
            wrapperClass.appendChild(wrapperBtn);


            SearchResult.appendChild(wrapperClass);

        })

    }
    catch (error) {
        console.log(error)
    }
    finally {
        loader.style.display = "none";
        body.style.opacity = 1;

    }
    moreResults.style.display = "flex";

}

function toDefaults() {
    SearchResult.innerHTML = "";
    moreResults.style.display = "none";
}


// Search Button 
searchButton.addEventListener("click", () => {
    if (userInput.value !== "") {
        toDefaults();
        page = 1;
        searchImgs(1500);
    }
})

//Show more btn
moreResults.addEventListener("click", () => {
    page++;
    searchImgs(250);
})


// Trending Searches

searchBtn_1.addEventListener("click", () => {
    userInput.value = "Nature";
    toDefaults();
    searchImgs(1500);
    console.log("data");
})


searchBtn_2.addEventListener("click", () => {
    userInput.value = "Cats";
    toDefaults();
    searchImgs(1500);
    console.log("data");
})

searchBtn_3.addEventListener("click", () => {
    userInput.value = "Abstract";
    toDefaults();
    searchImgs(1500);
    console.log("data");
})


document.querySelectorAll('.wrapper_class').forEach(wrapper => {
    wrapper.addEventListener('click', function (e) {
        // if clicking on a button, let it work normally
        if (e.target.closest('button')) return;

        // toggle "touched" state
        this.classList.toggle('touched');
    });
});


closeImgBtn.addEventListener("click",()=>{
    imageModal.style.display="none";
})
