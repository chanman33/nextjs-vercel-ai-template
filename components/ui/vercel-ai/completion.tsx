'use client'

import { useCompletion } from 'ai/react'
import { Button } from '@/components/ui/shadcn/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Completion() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion()
  const [inputValue, setInputValue] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSubmit(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    handleInputChange(e)
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              className="w-full min-h-[100px] p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter a prompt here..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isLoading || !inputValue.trim()} className="w-full">
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </form>
      </div>
      
      {completion && (
        <div className="border-t border-gray-200 p-4">
          <div className="text-sm font-medium mb-2">Completion:</div>
          <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">{completion}</div>
        </div>
      )}
    </div>
  )
} 