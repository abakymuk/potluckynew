'use client'

import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'

export default function SentryExamplePage() {
  const triggerError = () => {
    throw new Error('Test error from Sentry example page')
  }

  const triggerUndefinedFunction = () => {
    // @ts-expect-error - Intentionally calling undefined function for testing
    myUndefinedFunction()
  }

  const triggerAsyncError = async () => {
    try {
      const response = await fetch('/api/non-existent-endpoint')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      Sentry.captureException(error)
      alert('Async error captured and sent to Sentry!')
    }
  }

  const triggerManualEvent = () => {
    Sentry.captureMessage('Manual test message from Sentry example page', 'info')
    alert('Manual event sent to Sentry!')
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sentry Test Page</h1>
      <p className="mb-8 text-gray-600">
        Use these buttons to test different types of errors and events in Sentry.
      </p>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error Testing</h2>
          <div className="space-y-2">
            <Button
              onClick={triggerError}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Trigger JavaScript Error
            </Button>

            <Button
              onClick={triggerUndefinedFunction}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Trigger Undefined Function Error
            </Button>

            <Button onClick={triggerAsyncError} variant="outline" className="w-full">
              Trigger Async Error
            </Button>

            <Button onClick={triggerManualEvent} variant="default" className="w-full">
              Send Manual Event
            </Button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>JavaScript Error:</strong> Throws a synchronous error
            </li>
            <li>
              • <strong>Undefined Function:</strong> Calls a non-existent function
            </li>
            <li>
              • <strong>Async Error:</strong> Captures an async error manually
            </li>
            <li>
              • <strong>Manual Event:</strong> Sends a custom message to Sentry
            </li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Check Sentry Dashboard:</h3>
          <p className="text-sm text-green-700">
            After triggering errors, check your Sentry dashboard at:{' '}
            <a
              href="https://us.sentry.io/organizations/dosta-corp/projects/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-900"
            >
              https://us.sentry.io/organizations/dosta-corp/projects/
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
