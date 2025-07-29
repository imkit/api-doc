import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  // 確保 Markdown 檔案被處理
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})