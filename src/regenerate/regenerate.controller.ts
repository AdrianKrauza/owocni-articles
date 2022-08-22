import { Controller, Get, Param } from '@nestjs/common';
import { RegenerateService } from './regenerate.service';
const CryptoJS = require('crypto-js');
@Controller('regenerate')
export class RegenerateController {
  constructor(private readonly regenerateService: RegenerateService) {}

  @Get('/:id/:type/:text')
  async regenerate(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('text') text: string,
  ) {
    return this.regenerateService.regenerate(id, type, text);
  }
}
