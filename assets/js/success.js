
window.onload = async () => {
    console.log("onlload");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    console.log(code);

    const endpoint = "https://spotion.azurewebsites.net/api/spotion-auth?code=zewz5PwwNOtVHYLXQeH/HunvnRj1n6aS5RRlLEfyWYwPXxLWAdThWQ==";

    // get the tokens needed
    let resp = await fetch(`${endpoint}&access=${code}`);
    let data = await resp.json();

    let access_token = data.access_token;
    let token_type = data.token_type;
    let num_tracks = 50;


    // search for tracks and create playlist
    const endpoint_create = "https://spotion.azurewebsites.net/api/spotion-create?code=sbTC2kAxZmzHdtlB/9dGEdwAOPSRjl7Xi7vej59AYv4idB6m11Y4nw==";
    let resp_create = await fetch(`${endpoint_create}&access_token=${access_token}&token_type=${token_type}&limit=${num_tracks}`);
    let data_create = await resp_create.json();

    console.log(data_create);
}