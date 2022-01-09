function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name>
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>
        </span>
    </h2>`
}

function fetchGitHubInformation(event) {
    let username = $("#gh-username").val(); //gets username from text Filed
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a gitHub usermane.</h2>`) //displays if no user name or no valid username is inputed
        return;
    };
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`
    )

    $.when(
        $.getJSON(`https://api.github.com/user/${username}`)
    ).then(
        function(response) {
            let userData = respons;
            $("#gh-user-data").html(userInformationHTML(userData))
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No infor found for user ${username}</h2>`);
        } else {
            console.log(errorResponse);
            $("#gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON}</h2>`);
        }
    })
}

