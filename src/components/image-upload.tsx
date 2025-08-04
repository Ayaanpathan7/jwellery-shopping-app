'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  disabled?: boolean
}

export default function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size should be less than 10MB')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'luna_gems_products')

      console.log('Uploading to:', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`)
      console.log('Upload preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Upload response error:', errorData)
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Upload successful:', data)
      onChange(data.secure_url)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
    onChange('')
  }

  const handleUrlChange = (url: string) => {
    setUploadError(null)
    onChange(url)
  }

  return (
    <div className="space-y-4">
      <Label>Product Image</Label>
      
      {/* Image Preview */}
      {value && (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative w-full h-48">
              <Image
                src={value}
                alt="Product preview"
                fill
                className="object-cover rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Section */}
      {!value && (
        <div className="space-y-4">
          {/* File Upload */}
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-6">
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={disabled || isUploading}
                />
                
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm text-gray-600">Uploading image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Or Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              placeholder="https://example.com/image.jpg"
              value={value || ''}
              onChange={(e) => handleUrlChange(e.target.value)}
              disabled={disabled || isUploading}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {uploadError}
        </div>
      )}
    </div>
  )
}
