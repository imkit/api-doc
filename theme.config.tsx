import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><strong>IMKit 文檔</strong></span>,
  project: {
    link: 'https://github.com/your-org/imkit-doc-website',
  },
  docsRepositoryBase: 'https://github.com/your-org/imkit-doc-website',
  footer: {
    component: <span>© 2024 IMKit Documentation. All rights reserved.</span>
  }
}

export default config
