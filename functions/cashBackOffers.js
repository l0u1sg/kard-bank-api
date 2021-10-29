const ggraphqlRequest = require('graphql-request')
require('dotenv').config()


module.exports = async function cashBackOffers() {
    const endpoint = process.env.ENDPOINT
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    {
        cashbackOffers{
            brand{
                name
                description
            }
        }
    }`
    const data = await graphQLClient.request(query)
    let n = 0
    console.log('Here are the cashback offers currently available:')
    while (data.cashbackOffers[n] != TypeError) {
        console.log(data.cashbackOffers[n].brand.name)
        n = n + 1
    }
}