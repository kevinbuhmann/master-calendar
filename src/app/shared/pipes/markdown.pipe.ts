import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

const options: MarkedOptions = {
  gfm: false,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
};

@Pipe({
  name: 'appMarkdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    marked.setOptions({
      ...options,
      renderer: new marked.Renderer()
    });

    const sanitizedMarkdown = value
     .replace(/^#+(.+)$/gm, '#### $1');

    return marked(sanitizedMarkdown);
  }
}
