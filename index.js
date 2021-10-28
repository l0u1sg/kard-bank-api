const ggraphqlRequest = require('graphql-request')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
require('dotenv').config()

async function fetchID() {
    const endpoint = 'https://staging.kard.eu/graphql'
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    {
        me{
            id
        }
    }`
    const data = await graphQLClient.request(query)
    console.log(`your ID on Kard is : ${data.me.id}`)
}
async function createVault(vaultValue, vaultName, clientID) {
    const endpoint = 'https://staging.kard.eu/graphql'
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer  ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    mutation{
        createVault(input: {goal:{value: ${vaultValue}, currency: EUR} name: ${vaultName}, clientMutationId: ${clientID}}){
            clientMutationId
            errors{message}
            vault{name}
        }
    }`
    const data = await graphQLClient.request(query)
    console.log("Success, see on your test app")
}

rl.question("What do you want to fetch/do ", function(action) {
    console.log(action)
    if (action == "id") {
        fetchID().catch((error) => console.error(error))
        rl.close()
    }
    if (action == "createVault") {
        rl.question("Name of your new vault ? ", function(vaultName) {
            rl.question("Value of your new vault ? ", function(vaultValue) {
                rl.question("Your client ID ?", function(clientID) {
                    createVault(vaultValue, `"${vaultName}"`, `"${clientID}"`).catch((error) => console.log(error))
                    rl.close()
                })
            })
        })
    }
    
})



