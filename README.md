# Amazon Lex Integration
## Pre-requisites

- Create an user pool in Amazon Cognito
- Create an unauthenticated IAM role with permissions attached to:
 -- Amazon Comprehend
-- Amazon Translate
-- Amazon Lex
- Create an Amazon Lex bot

## Changes before testing
- Replace with your data the following parameters BOT_NAME, BOT_ALIAS and USER_ID on the index file. 
- Replace with your data the following parameters REGION and IDENTITY_POOL_ID on the comprehendClient file. 
- Replace with your data the following parameters REGION and IDENTITY_POOL_ID on the lexClient file. 
- Replace with your data the following parameters REGION and IDENTITY_POOL_ID on the translateClient file. 

## Installation
Install npm packages
```sh
npm install
```
## Run the code
```sh
node index
```