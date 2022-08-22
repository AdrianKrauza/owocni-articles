import { Injectable } from '@nestjs/common';
import axios from 'axios';

var qs = require('qs');

@Injectable()
export class DeeplService {
  async translate(text: string) {
    const data = qs.stringify({
      auth_key: process.env.DEEPL_API_KEY,
      text,
      target_lang: 'PL',
      // glossary_id: '7816d578-a11f-4a1b-b5b5-1e0b17b9a1e8',
      source_lang: 'EN',
    });
    const config = {
      method: 'post',
      url: 'https://api.deepl.com/v2/translate',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const res = await axios(config);
    return res.data.translations[0].text;
  }
}
