const express = require('express');
const ngrok = require('ngrok');

const { DetectDominantLanguageCommand } = require("@aws-sdk/client-comprehend");
const { TranslateTextCommand } = require("@aws-sdk/client-translate");
const { PostTextCommand } = require("@aws-sdk/client-lex-runtime-service");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const { lexClient } = require("./libs/lexClient.js");
const { translateClient } = require("./libs/translateClient.js");
const { comprehendClient } = require("./libs/comprehendClient.js");

var g_text = "";

const app = express();
const port = 3000;//process.env.PORT ||

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/ctwa', async (req, res) => {
    console.log();
    let response = '';
    console.log(req.body);
    if (req.body.type == 'message' && req.body.payload.type == 'text') {
        let utterance = req.body.payload.payload.text;
        response = await createResponse(utterance);
    }

    res.send(response);
})


app.listen(3000, async () => {
    console.log(`Server running`);

})


function handletext(text) {
    g_text = text;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../text", true); // A Spring MVC controller
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //necessary
    xhr.send("text=" + text);
}

const createResponse = async (utterance) => {
    var wisdom = utterance.trim();
    handletext(wisdom);

    const comprehendParams = {
        Text: wisdom,
    };
    try {
        const data = await comprehendClient.send(
            new DetectDominantLanguageCommand(comprehendParams)
        );
        console.log(
            "Success. The language code is: ",
            data.Languages[0].LanguageCode
        );
        const translateParams = {
            SourceLanguageCode: data.Languages[0].LanguageCode,
            TargetLanguageCode: "en", // For example, "en" for English.
            Text: wisdom,
        };
        try {
            const data = await translateClient.send(
                new TranslateTextCommand(translateParams)
            );
            console.log("Success. Translated text: ", data.TranslatedText);
            const lexParams = {
                botName: "BOT_NAME", 
                botAlias: "BOT_ALIAS",
                inputText: data.TranslatedText,
                userId: "USER_ID", // For example, 'chatbot-demo'.
            };
            try {
                const data = await lexClient.send(new PostTextCommand(lexParams));
                console.log("Success. Response is: ", data.message);
                var msg = data.message;
                //showResponse(msg);
                console.log('RESPONSEE:  ', msg)
                return msg
            } catch (err) {
                console.log("Error responding to message. ", err);
            }
        } catch (err) {
            console.log("Error translating text. ", err);
        }
    } catch (err) {
        console.log("Error identifying language. ", err);
    }
};