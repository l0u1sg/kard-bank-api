const ggraphqlRequest = require('graphql-request')
require('dotenv').config()

module.exports = async function createVault(vaultValue, vaultName, clientID) {
    const endpoint = process.env.ENDPOINT
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