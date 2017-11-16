// handeling the response
function showRepositories(event, data){
  //this is set to the XMLHttpRequest object that fired the event
  // now we'll output the JSON to the DOM
  // in order to get responseText working, we need to tell JS that it's working with a JSON, we do this by adding JSON.parse
  // in addition to listing the repos, we are going to include a link for the 'Get Commits'
  // in the link, the data-repo value will hold data so we can retrieve it later
  var repos = JSON.parse(this.responseText)
 console.log(repos)
 const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
 document.getElementById("repositories").innerHTML = repoList

}

// the repository request
function getRepositories() {
  const req = new XMLHttpRequest()
  // we include a addEventListener to listen for a 'load', the load will tell us the we've recieved the request, then we'll use a call back function, 'showRepositories()'
  req.addEventListener("load", showRepositories);
  // we open with the http verb, 'GET', in this case, and then call for the url we want requested
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  // once the request is set up, we call send() to make it happen
  req.send()
}

// get commit request
// we grab the repo-data by using the dataset property
function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

// now our showCommits() callback function
function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
