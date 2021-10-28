const ggraphqlRequest = require('graphql-request')
require('dotenv').config()


module.exports = async function fetchID() {
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