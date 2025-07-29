import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  // 確保 Markdown 檔案被處理
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // GitHub Pages 靜態導出配置
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // 如果部署在子路徑，取消註解下面這行並替換 'your-repo-name'
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name',
})