import { Injectable } from '@nestjs/common';
import { GetNotionPageService } from '../get-notion-page/get-notion-page.service';
import { ParseMarkdownService } from '../parse-markdown/parse-markdown.service';
import { GenerateGtp3Service } from '../generate-gtp-3/generate-gtp-3.service';
import { SendDataService } from '../send-data/send-data.service';
import { NotionService } from '../notion/notion.service';
import { DeeplService } from '../deepl/deepl.service';
const CryptoJS = require('crypto-js');
@Injectable()
export class RegenerateService {
  constructor(
    private readonly getNotionPageService: GetNotionPageService,
    private readonly parseMarkdownService: ParseMarkdownService,
    private readonly generateGtp3Service: GenerateGtp3Service,
    private readonly sendDataService: SendDataService,
    private readonly notionService: NotionService,
    private readonly deeplService: DeeplService,
  ) {}
  async regenerate(id: string, type: string, text: string) {
    const dec = CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);

    const textGpt = await this.generateGtp3Service.makeRequest(
      dec,
      // @ts-ignore
      type,
      false,
    );

    const pageChildren = await this.notionService.getChildBlocks(id);

    const translate = await this.deeplService.translate(textGpt.text);
    const hrefIndex = pageChildren.results.findIndex((child) => {
      if ('type' in child && child?.type !== 'paragraph') return false;
      // @ts-ignore
      const rich_text = child.paragraph.rich_text;
      return rich_text.some((item) => item?.href?.includes(text));
    });
    // return hrefIndex;
    const updatingBlock = pageChildren.results[hrefIndex - 1];
    await this.notionService.updateBlock(updatingBlock.id, translate);
    return { hrefIndex, updatingBlock };
    return;
    // return pageChildren;
    // return translate;
    // return textGpt;
    // return `<div style="white-space: break-spaces;display: flex;justify-content: center;align-items: center;height: 100vh;font-family: arial;font-size: 17px;max-width: 1000px;margin: auto;">${textGpt.text}</div>`;
    // return this.generateGtp3Service.makeRequest(dec, type, false);

    // let markdown = await this.getNotionPageService.getPage(id);
    // markdown = markdown.replace(/\[Wygeneruj jeszcze raz\]\(.+\)/gm, '');
    // markdown = markdown.replace(/\[Duck Duck Go\]\(.+\)/gm, '');
    // return markdown;
    // const data = await this.parseMarkdownService.parseMarkdown(markdown);
    // do {
    //   const currentData = data[headingNumber];
    //   const body = await this.generateGtp3Service.bodyTransform(
    //     currentData.body,
    //   );
    //   data[headingNumber].body = body[type].text;
    // } while (!/^#/.test(data[++headingNumber].firstLine));
    // return { data };
  }
}
