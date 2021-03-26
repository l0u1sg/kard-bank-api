const Axios = require('axios')
const readLine = require('readline')
exports.printMsg = function () {
    console.log("This is a message from the demo package");
}
let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


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
        console.log(response.data.data)
        if (response.data.data.initSession.challenge === "OTP") {
            rl.question("You need to confirm OTP code sent to " + number + " : ", function (answer) {
                let otp = answer
                rl.close()
                Axios.post('https://api.kard.eu/graphql', {
                    operationName: "VerifyOtp",
                    variables: {
                        input: {
                            phoneNumber: number,
                            code: otp,
                            vendorIdentifier: "android:is-that-a-uuid",
                        }
                    },
                    query: "mutation VerifyOtp($input: VerifyOTPInput!) {\n  verifyOtp(input: $input) {\n    challenge\n    accessToken\n    refreshToken\n    errors {\n      message\n      path\n      __typename\n    }\n    __typename\n  }\n}\n"
                }).then(function (response) {
                    console.log(response.data)
                }).catch(function (error) {
                    console.log(error)
                })

            })
        } else if (response.data.data.initSession.challenge === "PASSCODE") {
            console.log("Kard indique : Aucune demande de validation n'est necessaire.")
        } else {
            console.log(response)
        }
        /* let TOKEN
        Axios.post('https://api.kard.eu/graphql'), {
            operationName: ""
        } */
    })
        .catch(function (error) {
            console.log(error);
        });

}