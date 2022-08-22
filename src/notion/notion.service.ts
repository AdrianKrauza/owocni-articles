import { Injectable } from '@nestjs/common';

import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });
const notion = new Client({
  auth: 'secret_8z6uOVOCWpeL5bAk4QPq52mmSNOlADObump2TKXmCCb',
});
@Injectable()
export class NotionService {
  async getChildBlocks(id: string) {
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    return response;
  }
  async updateBlock(blockId: string, content: string) {
    const response = await notion.blocks.update({
      block_id: blockId,
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
        color: 'default',
      },
    });
  }
}
