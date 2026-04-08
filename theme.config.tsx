import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><strong>IMKIT Platform API</strong></span>,
  project: {
    link: 'https://github.com/imkit/api-doc',
  },
  docsRepositoryBase: 'https://github.com/imkit/api-doc',

  // 國際化配置
  i18n: [
    { locale: 'zh-TW', name: '繁體中文' },
    { locale: 'zh-CN', name: '简体中文' },
    { locale: 'en', name: 'English' }
  ],

  // SEO 配置
  head: ({ title }: { title?: string }) => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title ? `${title} - IMKIT` : 'IMKIT Platform API'} />
      <meta property="og:description" content="IMKIT Platform API Document" />
      <title>{title ? `${title} - IMKIT` : 'IMKIT Platform API'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  ),

  footer: {
    component: <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' }}>© 2026 FUNTEK Software Inc. All rights reserved.</div>
  }
}

export default config