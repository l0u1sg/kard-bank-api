# Kard Bank API
Kard Bank API is a repository that interacts with the Kard API. This project uses NodeJS, with dependencies *dotenv, graphql, graphql-request*.

## Installation
Check that you have NodeJS, NPM and Yarn installed on your computer. To check this, you can type the following commands in the terminal:

    node -v
    npm -v
    yarn -v
If the 3 commands give the version of each depedance, then it's ok, you can continue. If not, refer to the documentation. 

### Installation of dependencies 

    yarn install
### Adding secure variables
Copy the contents of the `.env.example` file and paste it into a new `.env` file and add the various variables requested 
## Start the project
To start the project, simply issue the command `yarn start` and follow the instructions
## Available commands
The following functions are available: 

    createVault 		=> Create a vault on the application
    fetchBalance 		=> Know the remaining balance on the Kard
    fetchID				=> Know your internal Kard ID
    fetchTransaction	=> See the latest transactions between two date
