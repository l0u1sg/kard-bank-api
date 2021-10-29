const ggraphqlRequest = require('graphql-request')
require('dotenv').config()

module.exports = async function askParentForMoney(amountValue, reason) {
    const endpoint = process.env.ENDPOINT
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer  ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    mutation{
        askParentForMoney(input: {
            amount: {
                value: ${amountValue},
                currency: EUR
            },
            reason: "${reason}"
        }) {
        clientMutationId
        errors{message}
        }
    }`
    const data = await graphQLClient.request(query)
    console.log("Success, see on your test app")
}