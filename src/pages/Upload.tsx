import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface UploadedVideo {
  file: File
  title: string
  description: string
  visibility: 'public' | 'unlisted' | 'private'
  category: string
  tags: string[]
  thumbnail?: string
  language: string
  captions: boolean
  comments: boolean
  ratings: boolean
  monetization: boolean
  playlist?: string
}

export default function Upload() {
  const [step, setStep] = useState<'upload' | 'details' | 'visibility' | 'publish'>('upload')
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideo | null>(null)
  const [newTag, setNewTag] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    
    if (videoFile) {
      handleFileUpload(videoFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Симуляция загрузки
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          setUploadedVideo({
            file,
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: '',
            visibility: 'public',
            category: 'Развлечения',
            tags: [],
            language: 'ru',
            captions: false,
            comments: true,
            ratings: true,
            monetization: false
          })
          setStep('details')
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }

  const addTag = () => {
    if (newTag.trim() && uploadedVideo && !uploadedVideo.tags.includes(newTag.trim())) {
      setUploadedVideo({
        ...uploadedVideo,
        tags: [...uploadedVideo.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (uploadedVideo) {
      setUploadedVideo({
        ...uploadedVideo,
        tags: uploadedVideo.tags.filter(tag => tag !== tagToRemove)
      })
    }
  }

  const updateVideoData = (field: keyof UploadedVideo, value: any) => {
    if (uploadedVideo) {
      setUploadedVideo({
        ...uploadedVideo,
        [field]: value
      })
    }
  }

  const handlePublish = () => {
    console.log('Публикация видео:', uploadedVideo)
    setStep('publish')
  }

  const renderUploadStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <Icon name="ArrowLeft" size={20} />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Icon name="Upload" size={24} className="text-accent" />
          <h1 className="text-2xl font-bold gradient-text">Загрузить видео</h1>
        </div>
      </div>

      <Card className="border-2 border-dashed border-border hover:border-accent/50 transition-all duration-300">
        <CardContent className="p-12">
          <div 
            className={`text-center transition-all duration-300 ${
              isDragOver ? 'scale-105 opacity-75' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Upload" size={48} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Перетащите видео для загрузки</h2>
              <p className="text-muted-foreground mb-4">
                Ваши видео будут приватными, пока вы не опубликуете их.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white px-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon name="Upload" size={20} className="mr-2" />
                Выбрать файлы
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Поддерживаются форматы: MP4, MOV, AVI, WMV, FLV, WebM</p>
                <p>Максимальный размер: 256 ГБ или 12 часов</p>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Загрузка...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Видео обрабатывается. Это может занять несколько минут.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderDetailsStep = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => setStep('upload')}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Icon name="Settings" size={24} className="text-accent" />
          <h1 className="text-2xl font-bold gradient-text">Сведения</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная форма */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={20} />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название (обязательно)</Label>
                <Input
                  id="title"
                  value={uploadedVideo?.title || ''}
                  onChange={(e) => updateVideoData('title', e.target.value)}
                  placeholder="Добавьте название, которое описывает ваше видео"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadedVideo?.title?.length || 0}/100
                </p>
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={uploadedVideo?.description || ''}
                  onChange={(e) => updateVideoData('description', e.target.value)}
                  placeholder="Расскажите зрителям о своем видео"
                  rows={5}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadedVideo?.description?.length || 0}/5000
                </p>
              </div>

              <div>
                <Label htmlFor="thumbnail">Значок</Label>
                <div className="mt-2 p-4 border-2 border-dashed border-border rounded-lg text-center">
                  <Icon name="Image" size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Загрузите значок, чтобы показать, о чем ваше видео
                  </p>
                  <Button variant="outline" size="sm">
                    Загрузить значок
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings2" size={20} />
                Дополнительные настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select value={uploadedVideo?.category} onValueChange={(value) => updateVideoData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Развлечения">Развлечения</SelectItem>
                    <SelectItem value="Образование">Образование</SelectItem>
                    <SelectItem value="Музыка">Музыка</SelectItem>
                    <SelectItem value="Спорт">Спорт</SelectItem>
                    <SelectItem value="Игры">Игры</SelectItem>
                    <SelectItem value="Технологии">Технологии</SelectItem>
                    <SelectItem value="Новости">Новости и политика</SelectItem>
                    <SelectItem value="Блоги">Блоги</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Язык видео</Label>
                <Select value={uploadedVideo?.language} onValueChange={(value) => updateVideoData('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Теги</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Добавить тег"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} variant="outline">
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {uploadedVideo?.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <Icon name="X" size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Теги помогают зрителям найти ваше видео при поиске
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Превью и кнопки */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Eye" size={20} />
                Предварительный просмотр
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <Icon name="Play" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2 line-clamp-2">
                {uploadedVideo?.title || 'Без названия'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {uploadedVideo?.file.name} • {Math.round(uploadedVideo?.file.size! / 1024 / 1024)} МБ
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                Аудитория
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="comments">Разрешить комментарии</Label>
                  <Switch
                    id="comments"
                    checked={uploadedVideo?.comments}
                    onCheckedChange={(checked) => updateVideoData('comments', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ratings">Показывать оценки</Label>
                  <Switch
                    id="ratings"
                    checked={uploadedVideo?.ratings}
                    onCheckedChange={(checked) => updateVideoData('ratings', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setStep('visibility')}
              className="flex-1"
            >
              Назад
            </Button>
            <Button 
              onClick={() => setStep('visibility')}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white"
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVisibilityStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => setStep('details')}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={24} className="text-accent" />
          <h1 className="text-2xl font-bold gradient-text">Доступ</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Выберите настройки доступа</CardTitle>
          <p className="text-sm text-muted-foreground">
            Кто сможет смотреть ваше видео?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              {
                id: 'public',
                icon: 'Globe',
                title: 'Открытый доступ',
                description: 'Видео могут найти и посмотреть все пользователи'
              },
              {
                id: 'unlisted',
                icon: 'Link',
                title: 'По ссылке',
                description: 'Видео могут посмотреть только пользователи со ссылкой'
              },
              {
                id: 'private',
                icon: 'Lock',
                title: 'Ограниченный доступ',
                description: 'Видео можете смотреть только вы'
              }
            ].map((option) => (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  uploadedVideo?.visibility === option.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
                onClick={() => updateVideoData('visibility', option.id)}
              >
                <div className="flex items-start gap-3">
                  <Icon name={option.icon as any} size={20} className="mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    uploadedVideo?.visibility === option.id
                      ? 'border-accent bg-accent'
                      : 'border-border'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
              Назад
            </Button>
            <Button onClick={handlePublish} className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
              Опубликовать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPublishStep = () => (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="space-y-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <Icon name="Check" size={48} className="text-white" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-4">Видео опубликовано!</h1>
          <p className="text-muted-foreground mb-6">
            Ваше видео "{uploadedVideo?.title}" успешно загружено и опубликовано
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="aspect-video w-32 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="Play" size={24} className="text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium mb-1">{uploadedVideo?.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {uploadedVideo?.visibility === 'public' ? 'Открытый доступ' :
                   uploadedVideo?.visibility === 'unlisted' ? 'По ссылке' : 'Ограниченный доступ'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Видео будет обработано в течение нескольких минут
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button asChild variant="outline">
            <Link to="/">
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
            <Link to="/upload">
              <Icon name="Plus" size={16} className="mr-2" />
              Загрузить еще
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {step === 'upload' && renderUploadStep()}
      {step === 'details' && renderDetailsStep()}
      {step === 'visibility' && renderVisibilityStep()}
      {step === 'publish' && renderPublishStep()}
    </div>
  )
}