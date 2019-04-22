// render data in the DOM
function displayResults(responseJson) {
  console.log('*data recieved*')
  console.log(responseJson)
  $('#results-list').empty();
  $('.results').empty();
  $('.results').append(`<h3>${responseJson[0].owner.login}</h3>`)
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(`<li><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></li>`)}; 
  $('#results').removeClass('hidden');
  console.log('*App Finished*')
};

// get data from server
function getRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#results-list').empty();
      $('.results').empty();
      $('#js-error-message').text(`Something went wrong - ${error.message}`);
      
    });
}

// listen for form submit
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('.js-query').val();
    console.log('*query for user: '+username+'*')
    getRepos(username);
    // reset form
    $('.js-query').val('');
    console.log('*fill form reset*')
  });
}

// load and run app
function appLoad(){
  console.log('*App Loaded*')
  watchForm();
}

appLoad();
