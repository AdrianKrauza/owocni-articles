import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const CryptoJS = require('crypto-js');
@Injectable()
export class GenerateGtp3Service {
  async text(text: string) {
    return text;
  }
  async makeRequest(
    text: string,
    type: 'simplify' | 'summarize',
    createLink = true,
  ) {
    // return {
    //   text: text + 'test',
    //   cost: 0,
    // };
    const enc = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));

    const href = `http://localhost:4000/regenerate/pageId/${type}/${enc}`;
    const link = createLink ? '\n[Wygeneruj jeszcze raz](' + href + ')\n' : '';
    let prompt, best_of;
    if (type === 'simplify') {
      prompt = 'Write it simple: \n' + text + '\n';
      best_of = 3;
    } else if (type === 'summarize') {
      prompt = 'Write it summarize: \n' + text + '\n';
      best_of = 5;
    }
    const data = {
      model: 'text-davinci-002',
      prompt: await this.text(prompt),
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      best_of,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    const response = await openai.createCompletion(data);
    return {
      text: response.data.choices[0].text.replace(/\n/g, '') + link,
      // @ts-ignore
      cost: response.data.usage.total_tokens || 0,
    };
  }
  async bodyTransform(body: string) {
    const empty = {
      text: body,
      cost: 0,
    };
    if (body.length < 200)
      return {
        summarize: empty,
        simplify: empty,
      };
    const summarize = await this.makeRequest(body, 'summarize');
    const simplify = await this.makeRequest(body, 'simplify');

    return {
      summarize,
      simplify,
    };
  }
}
