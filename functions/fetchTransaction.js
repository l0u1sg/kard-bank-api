const ggraphqlRequest = require('graphql-request')
require('dotenv').config()


module.exports = async function fetchTransaction(fromDate, toDate, userID) {
    const endpoint = process.env.ENDPOINT
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    {
        transactions(from: ${fromDate}, to: ${toDate}, userID: ${userID}) {
            edges{
                node{
                    title
                    amount{
                        value, currency{symbol}
                    }
                }
            }
        }
    }`
    const data = await graphQLClient.request(query)
    console.log(`Here are your last transactions for the selected date \n ${data.transactions.edges}`)
}