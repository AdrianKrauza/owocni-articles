import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';

import { RegenerateController } from './regenerate/regenerate.controller';
import { GenerateGtp3Service } from './generate-gtp-3/generate-gtp-3.service';
import { AppService } from './app.service';
import { GetNotionPageService } from './get-notion-page/get-notion-page.service';
import { ParseMarkdownService } from './parse-markdown/parse-markdown.service';
import { SendDataService } from './send-data/send-data.service';
import { SimpleController } from './simple/simple.controller';
import { SummarizeController } from './summarize/summarize.controller';
import { AppController } from './app.controller';
import { RegenerateService } from './regenerate/regenerate.service';
import { NotionService } from './notion/notion.service';
import { DeeplService } from './deepl/deepl.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    RegenerateController,
    SimpleController,
    SummarizeController,
  ],
  providers: [
    AppService,
    GenerateGtp3Service,
    GetNotionPageService,
    ParseMarkdownService,
    SendDataService,
    RegenerateService,
    NotionService,
    DeeplService,
  ],
})
export class AppModule {}
