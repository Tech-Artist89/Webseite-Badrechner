import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  updateTitle(title: string): void {
    this.title.setTitle(`${title} | Mitra Sanitär GmbH`);
  }

  updateMetaTags(tags: { name: string; content: string }[]): void {
    tags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  updatePageMeta(pageTitle: string, description: string, keywords?: string): void {
    this.updateTitle(pageTitle);
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'og:title', content: `${pageTitle} | Mitra Sanitär GmbH` },
      { name: 'og:description', content: description },
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${pageTitle} | Mitra Sanitär GmbH` },
      { name: 'twitter:description', content: description }
    ];

    if (keywords) {
      metaTags.push({ name: 'keywords', content: keywords });
    }

    this.updateMetaTags(metaTags);
  }
}