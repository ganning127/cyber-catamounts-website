const fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const emotion = await getEmotion();
    const access_token = req.query.access_token;
    const token_type = req.query.token_type;
    const limit = req.query.limit;
    const auth = `${token_type} ${access_token}`;

    // get the user id
    let resp_me = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Accept: "application/json",
            Authorization: `${token_type} ${access_token}`,
            "Content-Type": "application/json"
        }
    });
    let data_me = await resp_me.json();
    const id = data_me.id; // the user id



    // get all the tracks back
    let resp = await fetch(`https://api.spotify.com/v1/search?q=${emotion}&type=track&market=US&limit=${limit}`, {
        headers: {
            Accept: "application/json",
            Authorization: auth,
            "Content-Type": "application/json"
        }
    });

    let data = await resp.json();

    let uri_tracks = [];

    for (let i = 0; i < data.tracks.items.length; i++) {
        context.log(data.tracks.items[0])
        // context.log(JSON.stringify(data.tracks.items))
        let uri = data.tracks.items[i].uri;
        uri.replace(":", "%3A");

        uri_tracks.push(uri);
    }

    // create a playlist
    const body_create = {
        name: `${emotion} playlist`,
        description: "Created via Spotion",
        public: true
    }
    let resp_playlist = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
        body: JSON.stringify(body_create),
        headers: {
            Accept: "application/json",
            Authorization: `${token_type} ${access_token}}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    let data_playlist = await resp_playlist.json();

    context.log(data_playlist)
    const playlist_id = data_playlist.id;

    // add tracks to the playlist
    let joined_tracks = uri_tracks.join(",");
    context.log(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${joined_tracks}`);
    let resp_add = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${joined_tracks}`, {
        headers: {
            Accept: "application/json",
            Authorization: `${token_type} ${access_token}}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    });

    let data_add = await resp_add.json();




    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}


async function getEmotion() {
    const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
    const queryString = `
    query MyQuery {
        emotions(order_by: {created_at: desc}) {
              emotion
            }
      }  
    `

    const data = await fetch(HASURA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query: queryString })
    });
    const responseData = await data.json();

    const emotion = responseData.data.emotions[0].emotion;
    console.log(emotion);
    return emotion;


}