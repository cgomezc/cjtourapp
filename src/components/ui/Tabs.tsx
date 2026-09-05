import { useState } from 'react'
import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultTabId?: string
}

export function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id)
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTabId(tab.id)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab?.id === tab.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{activeTab?.content}</div>
    </div>
  )
}
