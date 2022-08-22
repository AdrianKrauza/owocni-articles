import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class SendDataService {
  async create(data: any) {
    data = JSON.stringify({});

    const config = {
      method: 'get',
      url: 'https://hook.eu1.make.com/2okj2dl86257gn480zyp5utlk78jeg9p',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
