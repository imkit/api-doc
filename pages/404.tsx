import Head from 'next/head'
import Link from 'next/link'

const messages: { locale: string; label: string; title: string; desc: string; home: string }[] = [
  { locale: 'zh-TW', label: '繁體中文', title: '找不到頁面', desc: '您要找的頁面不存在或已被移動。', home: '回到首頁' },
  { locale: 'zh-CN', label: '简体中文', title: '找不到页面', desc: '您要找的页面不存在或已被移动。', home: '回到首页' },
  { locale: 'en',    label: 'English',  title: 'Page Not Found', desc: "The page you're looking for doesn't exist or has been moved.", home: 'Back to Home' },
  { locale: 'ja',    label: '日本語',    title: 'ページが見つかりません', desc: 'お探しのページは存在しないか、移動された可能性があります。', home: 'ホームへ戻る' },
  { locale: 'ko',    label: '한국어',    title: '페이지를 찾을 수 없습니다', desc: '찾으시는 페이지가 존재하지 않거나 이동되었습니다.', home: '홈으로 돌아가기' },
]

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 · IMKIT Platform API</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR", sans-serif',
          color: '#222',
          background: '#fafafa',
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: '#0070f3',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <div style={{ maxWidth: 560, width: '100%', display: 'grid', gap: 16 }}>
          {messages.map((m) => (
            <div
              key={m.locale}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                padding: '14px 16px',
                borderRadius: 8,
                background: '#fff',
                border: '1px solid #eee',
              }}
            >
              <span
                style={{
                  minWidth: 72,
                  fontSize: 12,
                  color: '#888',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {m.label}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{m.title}</div>
                <div style={{ fontSize: 14, color: '#555' }}>{m.desc}</div>
              </div>
              <Link
                href={`/${m.locale}/`}
                style={{
                  fontSize: 13,
                  color: '#0070f3',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.home} →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
