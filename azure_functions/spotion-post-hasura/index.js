const fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const emotion = req.query.emotion;

    const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

    const graphql = `
        mutation MyMutation {
            insert_emotions(objects: {emotion: ${emotion}}) {
            returning {
                emotion
            }
            }
        }
    `

    const data = await fetch(HASURA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query: graphql })
    });
    const responseData = await data.json();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseData
    };
}