import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><strong>IMKIT Platform API</strong></span>,
  project: {
    link: 'https://github.com/imkit/api-doc',
  },
  docsRepositoryBase: 'https://github.com/imkit/api-doc',

  footer: {
    component: <span>© 2025 FUNTEK Inc. All rights reserved.</span>
  }
}

export default config