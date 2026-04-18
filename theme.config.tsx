import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
import dynamic from 'next/dynamic'
import '@docsearch/css'

const DOCSEARCH_APP_ID = 'E9P44RVQBA'
const DOCSEARCH_API_KEY = 'ef57c3e2deedc7bae7ec5dfd64865ed7'
const DOCSEARCH_INDEX_NAME = 'IMKIT API Doc'

// @docsearch/react 為純 ESM 套件，在 Next.js SSG 的 collect-page-data 階段會炸 `Cannot use import statement outside a module`。
// 用 next/dynamic + ssr:false 延遲到瀏覽器端載入，繞開這問題。
const DocSearch = dynamic(
  () => import('@docsearch/react').then((m) => m.DocSearch),
  { ssr: false }
)

function Search({ className }: { className?: string }) {
  const { locale } = useRouter()
  return (
    <div className={className}>
      <DocSearch
        appId={DOCSEARCH_APP_ID}
        apiKey={DOCSEARCH_API_KEY}
        indexName={DOCSEARCH_INDEX_NAME}
        searchParameters={{
          facetFilters: locale ? [`lang:${locale}`] : [],
        }}
      />
    </div>
  )
}

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
    { locale: 'en', name: 'English' },
    { locale: 'ja', name: '日本語' },
    { locale: 'ko', name: '한국어' }
  ],

  // 使用 Algolia DocSearch 取代內建 Flexsearch
  search: {
    component: Search,
  },

  // SEO 配置
  head: ({ title }: { title?: string }) => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title ? `${title} - IMKIT` : 'IMKIT Platform API'} />
      <meta property="og:description" content="IMKIT Platform API Document" />
      <meta name="algolia-site-verification" content="9DC55241C6922276" />
      <title>{title ? `${title} - IMKIT` : 'IMKIT Platform API'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  ),

  footer: {
    component: <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' }}>© 2026 FUNTEK Software Inc. All rights reserved.</div>
  }
}

export default config
