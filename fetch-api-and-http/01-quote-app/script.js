const button = document.querySelector('button');
const quoteTextElement = document.querySelector('#quote-text');
const quoteAuthorElement = document.querySelector('#author');


button.addEventListener("click", function(){
fetch("https://dummy-apis.netlify.app/api/quote")
.then ((response) => {
    if (response.ok){return response.json()};
})
.then((data)=> {
    quoteTextElement.innerText = '"' + data.quote + '"';
    quoteAuthorElement.innerText = data.author;
})

})