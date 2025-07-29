import React from 'react'

export default {
  logo: <span><strong>API 文件</strong></span>,
  project: {
    link: 'https://github.com/your-repo'
  },
  docsRepositoryBase: 'https://github.com/your-repo/tree/main',
  search: {
    placeholder: '搜尋文件...'
  },
  editLink: {
    text: '在 GitHub 上編輯此頁面'
  },
  feedback: {
    content: '有問題嗎？給我們回饋 →',
    labels: 'feedback'
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    }
  },
  footer: {
    text: <span>© 2024 Your Company. All rights reserved.</span>
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="API 文件" />
      <meta property="og:description" content="完整的 API 參考文件" />
    </>
  )
}
