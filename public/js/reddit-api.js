export default {
  search: function(subreddit, postLimit) {
    /*global fetch*/
    return fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=${postLimit}`
    )
      .then(res => res.json())
      .then(data => {
        return data.data.children.map(data => data.data);
      })
      .catch(err => console.log(err));
  }
};
