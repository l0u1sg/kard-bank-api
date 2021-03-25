const Axios = require('axios')
exports.printMsg = function () {
    console.log("This is a message from the demo package");
}

exports.login = function (number, accessCode) {
    Axios.post('https://api.kard.eu/graphql', {
        "operationName": "InitSession",
        "variables": {
            "input": {
                "phoneNumber": number,
                "platform": "ANDROID",
                "vendorIdentifier": "ghrlt:is-that-a-uuid",
                "createUser": true
            }
        }
    }).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}