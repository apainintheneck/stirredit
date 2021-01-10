import reddit from './reddit-api.js';

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
        <a href="${post.url}" target="_blank">
          <h3>${truncateString(post.title, 100)}</h3>
        </a>
      </article>
      `;
    });

    document.getElementById('results').innerHTML = output;

  });
}
