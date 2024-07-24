const button = document.querySelector('button');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('author');

//short version from live session

button.addEventListener("click", async function(){
const response = await fetch ("https://dummy-apis.netlify.app/api/quote");
if(!response.ok){
    return
};
const data = await response.json();
quoteText.innerText = '"' + data.quote + '"';
quoteAuthor.innerText = data.author;
})

//first solution, shorter version above

/*button.addEventListener("click", function(){
    fetch("https://dummy-apis.netlify.app/api/quote")
    .then ((response) => {
        if (response.ok){return response.json()};
    })
    .then((data)=> {
     quoteText.innerText = '"' + data.quote + '"';
     quoteAuthor.innerText = data.author;
    })
})*/