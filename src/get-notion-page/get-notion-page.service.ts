import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
const notion = new Client({
  auth: 'secret_8z6uOVOCWpeL5bAk4QPq52mmSNOlADObump2TKXmCCb',
});
@Injectable()
export class GetNotionPageService {
  async getPage(pageId: string): Promise<string> {
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const blocks = await n2m.pageToMarkdown(pageId);
    const markdown = n2m.toMarkdownString(blocks);
    return markdown;
  }
}
