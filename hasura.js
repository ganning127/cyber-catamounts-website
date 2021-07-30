const fetch = require("node-fetch")

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const secret = process.env.HASURA_ADMIN_SECRET;

const addEntry = async (challengeID, challengeName, email, flag, teamName, description) => {
  console.log("Adding entry...")
    var queryString = `mutation MyMutation {
        insert_flag_correct(objects: {challenge_id: "${challengeID}", challenge_name: "${challengeName}", email: "${email}", flag: "${flag}", name: "${teamName}", prompt: "${description}"}) {
          returning {
            name
          }
        }
      }`

    const data = await fetch(HASURA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': secret,
        },
        body: JSON.stringify({query: queryString})
    });
    const responseData = await data.json();
    console.log(responseData)
    return responseData;
};

const checkFlag = (flag) => {
    if (flag == process.env.flag) {
        return true;
    } else {
        return false;
    }
}

exports.addEntry = addEntry
exports.checkFlag = checkFlag