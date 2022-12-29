const btoa = require('btoa');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const code = req.query.access;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    context.log(client_id);
    context.log(client_secret);
    context.log(code);


    const endpoint = "https://accounts.spotify.com/api/token";
    let token = 'Basic ' + btoa(`${client_id}:${client_secret}`)

    const options = {
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("https://spotion.herokuapp.com/success")}`,
        headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    };


    console.log(options)
    let resp = await fetch(endpoint, options);
    let data = await resp.json();


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}