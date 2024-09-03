const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { TranslateClient } = require("@aws-sdk/client-translate");

const REGION = "REGION"; //Example: us-west-2
const IDENTITY_POOL_ID = "IDENTITY_POOL_ID"; // An Amazon Cognito Identity Pool ID.

// Create an Amazon Translate service client object.
const translateClient = new TranslateClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: IDENTITY_POOL_ID,
    }),
});

module.exports =  { translateClient };
// snippet-end:[lex.JavaScript.translateClient]