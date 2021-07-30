var challengeName = "Test Challenge"
var challengeDescription = "Hi! This is the test challenge description"
var challengeID = "week1"
// edit to change challenge

window.onload = function updateChallenge() {
    document.getElementById("challengeName").innerText = challengeName
    document.getElementById("description").innerText = challengeDescription

    document.getElementById("submitFlag").addEventListener("click", async function(event) {
        event.preventDefault()
        document.getElementById("loading").style.display = "inline"
        console.log("Checking your flag...")
        let result = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                challengeID: challengeID,
                challengeName: challengeName,
                challengeDescription: challengeDescription,
                email: document.getElementById("name").value,
                name: document.getElementById("email").value,
                flag: document.getElementById("flag").value 
            })
        })
        let status = await result.json()
        console.log(status)
        if (status.status == "success") {
            document.getElementById("loading").style.display = "none"
            document.getElementById("sent-message").style.display = "inline"
        } else {
            document.getElementById("loading").style.display = "none"
            document.getElementById("error-message").style.display = "inline"
        }
    
    })
}
