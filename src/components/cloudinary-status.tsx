'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function CloudinaryStatus() {
  const [status, setStatus] = useState<'loading' | 'configured' | 'missing' | 'partial'>('loading')
  const [missingVars, setMissingVars] = useState<string[]>([])

  useEffect(() => {
    const checkCloudinaryConfig = () => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      const missing = []
      
      if (!cloudName || cloudName === 'your_cloud_name_here') {
        missing.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
      }
      
      if (!uploadPreset || uploadPreset === 'luna_gems_products') {
        // For upload preset, we accept 'luna_gems_products' as valid since that's what we want
        // Only mark as missing if it's empty or the placeholder
        if (!uploadPreset) {
          missing.push('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET')
        }
      }

      setMissingVars(missing)

      if (missing.length === 0) {
        setStatus('configured')
      } else if (missing.length === 2) {
        setStatus('missing')
      } else {
        setStatus('partial')
      }
    }

    checkCloudinaryConfig()
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case 'configured':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'missing':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'configured':
        return 'Cloudinary is properly configured! You can upload images.'
      case 'missing':
        return 'Cloudinary is not configured. Please set up your environment variables.'
      case 'partial':
        return 'Cloudinary is partially configured. Some environment variables are missing.'
      default:
        return 'Checking Cloudinary configuration...'
    }
  }

  if (status === 'loading') {
    return null
  }

  return (
    <Alert className={`mb-4 ${
      status === 'configured' ? 'border-green-200 bg-green-50' :
      status === 'missing' ? 'border-red-200 bg-red-50' :
      'border-yellow-200 bg-yellow-50'
    }`}>
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <AlertDescription>
          {getStatusMessage()}
          {missingVars.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Missing variables:</p>
              <ul className="text-sm list-disc list-inside">
                {missingVars.map(varName => (
                  <li key={varName}>{varName}</li>
                ))}
              </ul>
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  )
}
