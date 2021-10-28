const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fetchID = require('./functions/fetchID')
const createVault = require('./functions/createVault')
const fetchBalance = require('./functions/fetchBalance')
const questionEndpoint = ["id", "createVault", "fetchBalance"]

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
})



