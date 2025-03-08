'use client'

import { useChat } from 'ai/react'
import { Button } from '@/components/ui/shadcn/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [inputValue, setInputValue] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSubmit(e)
      setInputValue('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    handleInputChange(e)
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex flex-col max-w-[80%] rounded-lg p-4',
              message.role === 'user'
                ? 'bg-primary text-primary-foreground self-end'
                : 'bg-muted self-start'
            )}
          >
            <div className="text-sm font-semibold mb-1">
              {message.role === 'user' ? 'You' : 'AI'}
            </div>
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center h-8">
            <div className="animate-pulse text-sm text-muted-foreground">AI is thinking...</div>
          </div>
        )}
      </div>
      <form onSubmit={onSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type your message..."
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
} 