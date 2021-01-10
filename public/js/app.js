import reddit from './reddit-api.js';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchReddit("tech", "10", "hot"); //Shows latest news when the page is first loaded.

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened) + '...';
}

// Search reddit and update results.
function searchReddit(searchTerm, searchLimit, sortBy){
  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '';
    console.log(results); // testing
    results.forEach(post => {
      output += `
      <article>
        <h2>${post.title}</h2><br>
        <p class="card-text">${truncateString(post.selftext, 100)}</p>
        <a href="${post.url}" target="_blank">Read More</a>
      </article>
      `;
    });

    document.getElementById('results').innerHTML = output;

  });
}
