function submitForm() {
  $("form").on('submit', function(e) {
    e.preventDefault();
  })

  var token = ENV["GITHUB_TOKEN"];
  var repo = $("#repoName").val();
  var user = $("#repoOwner").val();
  var title = $("#title").val();
  var body = $("#body").val();

  createIssue(repo, user, title, body, token);
}

function createIssue(repo, user, title, body, token) {
  var data = {
    'title': title,
    'body': body
  }

  $.ajax({
    url: `https://api.github.com/repos/${user}/${repo}/issues`,
    type: "POST",
    headers: { 'Authorization': `token ${token}` },
    data: JSON.stringify(data),
    success: function(issue) { 
      $('#issue').html(`<a href="${issue.html_url}">${issue.title}</a>`)
    }
  }).fail(function(error) {
    console.log(`Post error: ${error.name}`)
  })
}