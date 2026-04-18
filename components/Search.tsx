import { useEffect, useRef, useState } from 'react'
import '@pagefind/default-ui/css/ui.css'

const SHORTCUT_LABEL = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform)
  ? '⌘K'
  : 'Ctrl K'

export default function Search({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const uiRef = useRef<any>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open || !containerRef.current || uiRef.current) return
    let cancelled = false
    ;(async () => {
      const { PagefindUI } = await import('@pagefind/default-ui')
      if (cancelled || !containerRef.current) return
      uiRef.current = new PagefindUI({
        element: containerRef.current,
        showSubResults: true,
        showImages: false,
        autofocus: true,
        bundlePath: '/pagefind/',
      })
      // Focus the input after mount
      requestAnimationFrame(() => {
        const input = containerRef.current?.querySelector<HTMLInputElement>('input')
        input?.focus()
      })
    })()
    return () => {
      cancelled = true
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label="Search"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid var(--nextra-primary-border-color, rgba(127,127,127,0.3))',
          background: 'transparent',
          color: 'inherit',
          fontSize: 13,
          cursor: 'pointer',
          minWidth: 180,
        }}
      >
        <span>🔍</span>
        <span style={{ flex: 1, textAlign: 'left', opacity: 0.7 }}>Search…</span>
        <kbd
          style={{
            padding: '1px 6px',
            borderRadius: 4,
            border: '1px solid currentColor',
            fontSize: 11,
            opacity: 0.6,
          }}
        >
          {SHORTCUT_LABEL}
        </kbd>
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(680px, 92vw)',
              maxHeight: '75vh',
              overflow: 'auto',
              background: 'var(--nextra-bg, #fff)',
              color: 'inherit',
              borderRadius: 10,
              padding: 16,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div ref={containerRef} />
          </div>
        </div>
      )}
    </>
  )
}
