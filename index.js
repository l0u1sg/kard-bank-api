const Axios = require('axios')
exports.printMsg = function () {
    console.log("This is a message from the demo package");
}

exports.login = function (number, accessCode) {
    Axios.post('https://api.kard.eu/graphql', {
        operationName: "InitSession",
        variables: {
            input: {
                phoneNumber: number,
                platform: "ANDROID",
                vendorIdentifier: "android:is-that-a-uuid",
                createUser: true
            }
        },
        query: "mutation InitSession($input: InitSessionInput!) {\n  initSession(input: $input) {\n    challenge\n    expiresAt\n    errors {\n      message\n      path\n      __typename\n    }\n    __typename\n  }\n}\n"
    }).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}