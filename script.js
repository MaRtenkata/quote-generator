const quoteContainer = document.getElementById('quout-container');
const quoutText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show Loading
function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function hideLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
   
}

// Show New Quote

function newQuote() {
    showLoading()
    // Pick Random Quote
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author is blank
    if (!authorText.textContent) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = randomQuote.author;
    }
    // Check if quote text is long
    if (quoutText.textContent.length > 120) {
        quoutText.classList.add('long-quote');
    } else {
        quoutText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoutText.textContent = randomQuote.text;
    hideLoading()
}



// Get Quout From API 

async function getQuouts() {
    showLoading()
    const apiURL = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote()
    } catch (err) {
        alert(err)
    }
}

// Tweet Quote 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoutText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}



// On Click New Quote Button

newQuoteButton.addEventListener('click', event => {
    getQuouts()
});

// On Click Twitter Button

twitterButton.addEventListener('click',  event => {
    tweetQuote()
});


// On Load 

getQuouts()
