import { ChatGPTAPI } from 'chatgpt';
//const { ChatGPTAPI } = require('chatgpt');

import * as dotenv from 'dotenv';
dotenv.config();

const delay = ms => new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, ms)
});

const performAIRequest = async text => {
    try {
        const api = new ChatGPTAPI({
            apiKey: process.env.CHATGPT_KEY
        });
        const res = await api.sendMessage(text);
        return res.text;
    } catch (err) {
        if (err.statusCode === 401) {
            console.log('API KEY FOR CHATGPT EXPIRED');
            // Unauthorized error, api-key expired most likely, check https://platform.openai.com/account/api-keys
            // Send mail
        }
        console.log('ChatGPT API ERROR', err);
    }
}

const getTitleInSwedish = async text => {
    const response = await performAIRequest(`Can you please formulate a title in Swedish, with maximum 30 characters, without explanation, from the following text: ${text}`);
    return response;
}

export default {
    getTitleInSwedish
};