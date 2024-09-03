// snippet-start:[lex.JavaScript.lexClient]
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { LexRuntimeServiceClient } = require("@aws-sdk/client-lex-runtime-service");

const REGION = "REGION"; //Example: us-west-2
const IDENTITY_POOL_ID = "IDENTITY_POOL_ID"; // An Amazon Cognito Identity Pool ID.

// Create an Amazon Lex service client object.
const lexClient = new LexRuntimeServiceClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

module.exports = { lexClient };
// snippet-end:[lex.JavaScript.lexClient]