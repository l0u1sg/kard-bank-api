const ggraphqlRequest = require('graphql-request')
require('dotenv').config()

module.exports = async function fetchBalance() {
    const endpoint = 'https://staging.kard.eu/graphql'
    const graphQLClient = new ggraphqlRequest.GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${process.env.KARD_TOKEN}`
        }
    })
    const query = ggraphqlRequest.gql `
    {
        me{
            bankAccount{
                balance{
                    value, currency
                    {symbol
                    }
                }
            }
        }
    }`
    const data = await graphQLClient.request(query)
    console.log(`Your balance is : ${data.me.bankAccount.balance.value} ${data.me.bankAccount.balance.currency.symbol}`)
}