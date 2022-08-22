import { Injectable } from '@nestjs/common';
const removeMd = require('remove-markdown');
const CryptoJS = require('crypto-js');
const regexImage = /!\[[^\]]*]\((.*?)\s*(".*[^"]")?\s*\)/g;
@Injectable()
export class ParseMarkdownService {
  decImage = (markdown: string): string => {
    return markdown.replace(/\(IMG\).+\(IMG\)/g, (match) => {
      match = match.replace(/\(IMG\)/g, '');
      const img = CryptoJS.enc.Base64.parse(match).toString(CryptoJS.enc.Utf8);
      return `\n${img}\n\n`;
    });
  };
  decText = (text: string): string => {
    text = this.decImage(text);
    text = text.replace(/\(HEADING\)/g, '##');
    text = text.replace(/\(LIST\)/g, '- ');
    return text;
  };
  encImage = (markdown: string): string => {
    return markdown.replace(regexImage, (match) => {
      const enc = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(match));
      return `(IMG)${enc}(IMG)`;
    });
  };
  splitText = (text: string): string[] => {
    return ('(HEADING)\n' + text)
      .split(/(\(HEADING\)|\(IMG\).+\(IMG\)|\(LIST\) |^\d. )/gm)
      .map((item) => item.replace(/^\n|$\n/gs, ' '))
      .splice(1);
  };
  connectSecondary = (splitText: string[]): string[] => {
    return splitText.reduce((acc, item, i) => {
      i % 2 ? (acc[acc.length - 1] += item) : acc.push(item);
      return acc;
    }, []);
  };
  splitFirstLine = (text: string[]) => {
    return text.map((text) => ({
      firstLine: this.decText(text.match(/.+/m)[0]),
      body: this.decText(text.replace(/.+/m, '').replace(/^(\n)+|(\n)+$/g, '')),
    }));
  };
  async parseMarkdown(markdown: string) {
    markdown = this.encImage(markdown);
    markdown = markdown.replace(/^#+/gm, '(HEADING)');
    markdown = markdown.replace(/^-|^ +-/gm, '(LIST)');
    const text = removeMd(markdown, {
      stripListLeaders: false,
    });
    const splitText = this.splitText(text);
    const connectSecondary = this.connectSecondary(splitText);
    return this.splitFirstLine(connectSecondary);
  }
}
