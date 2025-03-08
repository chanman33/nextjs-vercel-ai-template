'use client'

import { Button } from '@/components/ui/shadcn'
import { Chat, Completion } from '@/components/ui/vercel-ai'

export default function UIDemoPage() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-6">UI Components Demo</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shadcn UI Components</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Vercel AI UI Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Chat Component</h3>
                <Chat />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Completion Component</h3>
                <Completion />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 