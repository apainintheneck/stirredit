import reddit from './reddit-api.js';

//Delay all three calls to public reddit API
searchReddit(getSubreddit("subreddit1"), "10", "results1");
setTimeout(() => { searchReddit(getSubreddit("subreddit2"), "10", "results2"); }, 500);
setTimeout(() => { searchReddit(getSubreddit("subreddit3"), "10", "results3"); }, 1000);

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened) + '...';
}

// Search reddit and update results.
function searchReddit(subreddit, postLimit, resultDiv){
  //Get posts from subreddit
  reddit.getPosts(subreddit, postLimit).then(results => {
    let redditPosts = ''; //Holds the html to display the reddit posts

    if(results) { //Display posts if available
      // console.log(results); // testing
      results.forEach(post => {
        redditPosts += `
        <article>
          <a href="${post.url}" target="_blank">
            <h3>${truncateString(post.title, 100)}</h3>
          </a>
        </article>
        `;
      });
    } else { //Display error message if can't load posts
      redditPosts += `
      <div class="error-box">
        <h3>Unable to display nonexistent or private subreddit.</h3>
      </div>
      `;
    }

    document.getElementById(resultDiv).innerHTML = redditPosts;
  });
}

//Get subreddit from embedded url
function getSubreddit(linkId){
  let url = document.getElementById(linkId).href;
  return url.split("/")[4];
}
