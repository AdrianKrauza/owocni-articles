import { Controller, Get, Param } from '@nestjs/common';
import { GetNotionPageService } from '../get-notion-page/get-notion-page.service';
import { ParseMarkdownService } from '../parse-markdown/parse-markdown.service';
import { GenerateGtp3Service } from '../generate-gtp-3/generate-gtp-3.service';
import { SendDataService } from '../send-data/send-data.service';

@Controller('simple')
export class SimpleController {
  constructor(
    private readonly getNotionPageService: GetNotionPageService,
    private readonly parseMarkdownService: ParseMarkdownService,
    private readonly generateGtp3Service: GenerateGtp3Service,
    private readonly sendDataService: SendDataService,
  ) {}

  @Get(':id')
  async getHello(@Param('id') id: string) {
    const markdown = await this.getNotionPageService.getPage(id);

    const data = await this.parseMarkdownService.parseMarkdown(markdown);
    const newData: {
      firstLine: string;
      body: {
        summarize: { text: string; cost: any };
        simplify: { text: string; cost: any };
      };
    }[] = [];
    for (const item of data) {
      const body = await this.generateGtp3Service.bodyTransform(item.body);
      newData.push({
        firstLine: item.firstLine,
        body,
      });
    }
    const connect = (type: 'summarize' | 'simplify') => {
      let headingNumber = 0;
      return newData
        .map((item) => {
          const { body, firstLine } = item;
          const isHeading = /^#/.test(firstLine);
          if (isHeading) headingNumber++;
          return `${isHeading ? '\n' : ''}${firstLine}${
            body[type].text ? '\n' + body[type].text : ''
          }`;
        })
        .join('\n');
    };
    const costSum = (type: 'summarize' | 'simplify') =>
      newData.reduce((acc, item) => acc + item.body[type].cost, 0);

    const d = {
      notionId: id,
      summarize: { text: connect('summarize'), cost: costSum('summarize') },
      simplify: { text: connect('simplify'), cost: costSum('simplify') },
    };
    // await this.sendDataService.create(d);
    return d;
    return d.summarize.text;
  }
}
