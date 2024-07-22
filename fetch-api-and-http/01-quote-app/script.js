const button = document.querySelector('button');
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#author');


button.addEventListener("click", function(){
    fetch("https://dummy-apis.netlify.app/api/quote")
    .then ((response) => {
        if (response.ok){return response.json()};
    })
    .then((data)=> {
     quoteText.innerText = '"' + data.quote + '"';
     quoteAuthor.innerText = data.author;
    })
})