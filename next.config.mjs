import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  // 確保 Markdown 檔案被處理
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Nextra 3.x 原生 i18n 配置
  i18n: {
    locales: ['zh-TW', 'zh-CN'],
    defaultLocale: 'zh-TW'
  },
  
  // GitHub Pages 靜態導出配置
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // GitHub Pages 子路徑配置
  basePath: '/api-doc',
  assetPrefix: '/api-doc',
})