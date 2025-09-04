import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  
  const getCurrentLanguage = () => {
    const path = router.asPath
    if (path.includes('.zh-cn')) {
      return { locale: 'zh-CN', text: '简体中文' }
    }
    return { locale: 'zh-TW', text: '繁體中文' }
  }
  
  const switchLanguage = (targetLocale: string) => {
    const currentPath = router.asPath
    let newPath = currentPath
    
    if (targetLocale === 'zh-CN') {
      // 切換到簡體中文
      if (currentPath.endsWith('.zh-cn')) {
        // 已經是簡體中文，不需要改變
        return
      } else {
        // 添加 .zh-cn 後綴
        newPath = currentPath + '.zh-cn'
      }
    } else {
      // 切換到繁體中文
      if (currentPath.includes('.zh-cn')) {
        // 移除 .zh-cn 後綴
        newPath = currentPath.replace('.zh-cn', '')
      }
      // 如果已經是繁體中文，不需要改變
    }
    
    router.push(newPath)
    setIsOpen(false)
  }
  
  const currentLang = getCurrentLanguage()
  const otherLang = currentLang.locale === 'zh-CN' 
    ? { locale: 'zh-TW', text: '繁體中文' }
    : { locale: 'zh-CN', text: '简体中文' }
  
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {currentLang.text}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600">
          <div className="py-1">
            <button
              onClick={() => switchLanguage(currentLang.locale)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-900 bg-blue-50 dark:bg-blue-900 dark:text-white"
            >
              <span className="mr-2">✓</span>
              {currentLang.text}
            </button>
            <button
              onClick={() => switchLanguage(otherLang.locale)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <span className="mr-2 invisible">✓</span>
              {otherLang.text}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}