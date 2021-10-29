const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fetchID = require('./functions/fetchID')
const createVault = require('./functions/createVault')
const fetchBalance = require('./functions/fetchBalance')
const fetchTransaction = require('./functions/fetchTransaction')
const questionEndpoint = ["id", "createVault", "fetchBalance", "fetchTransaction"]

console.log("Fonctionnalités disponible : " + questionEndpoint)
rl.question("What do you want to fetch/do ", function(action) {
    console.log(action)
    if (action == questionEndpoint[0]) {
        fetchID().catch((error) => console.error(error))
        rl.close()
    }
    if (action == questionEndpoint[1]) {
        rl.question("Name of your new vault ? ", function(vaultName) {
            rl.question("Value of your new vault ? ", function(vaultValue) {
                rl.question("Your client ID ?", function(clientID) {
                    createVault(vaultValue, `"${vaultName}"`, `"${clientID}"`).catch((error) => console.log(error))
                    rl.close()
                })
            })
        })
    }
    if (action == questionEndpoint[2]) {
        fetchBalance().catch((error) => console.log(error))
        rl.close()
    }
    if (action == questionEndpoint[3]) {
        rl.question("Selctionner la date de début (format ISO Date, exemple 2021-05-29 ", function(fromDate){
            rl.question("Selectionner une date de fin (également au format ISO) ", function(toDate){
                rl.question("Do you know you userID ? (yes or no) ", function(searchID) {
                    if (searchID == "yes") {
                        rl.question("Collez ici votre userID ", function(userID) {
                            fetchTransaction(fromDate, toDate, userID).catch((error) => console.log(error))
                            rl.close()
                        })
                    } else if (searchID == "no") {
                        console.log("Copiez votre UserID ci-dessous")
                        fetchID().catch((error) => console.log(error))
                        rl.question("Collez ici votre userID", function(userID){
                            fetchTransaction(fromDate, toDate, userID).catch((error) => console.log(error))
                            rl.close()
                        })
                    } else {
                        console.log("aborted")
                        rl.close()
                    }
                })
            })
        })
        
    }
})



