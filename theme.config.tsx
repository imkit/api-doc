import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><strong>IMKIT Platform API</strong></span>,
  project: {
    link: 'https://github.com/imkit/api-doc',
  },
  docsRepositoryBase: 'https://github.com/imkit/api-doc',

  // SEO 配置
  head: ({ title }: { title?: string }) => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title ? `${title} - IMKIT` : 'IMKIT Platform API'} />
      <meta property="og:description" content="IMKIT Platform API Document" />
      <title>{title ? `${title} - IMKIT` : 'IMKIT Platform API'}</title>
    </>
  ),

  footer: {
    component: <span>© 2025 FUNTEK Inc. All rights reserved.</span>
  }
}

export default config