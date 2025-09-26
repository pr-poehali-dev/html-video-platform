import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Globe',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'ВКонтакте',
      icon: 'MessageCircle',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-white'
    },
    {
      name: 'Яндекс',
      icon: 'Search',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      textColor: 'text-black'
    }
  ]

  const handleSocialAuth = (provider: string) => {
    console.log(`Авторизация через ${provider}`)
    // Здесь будет логика авторизации
  }

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(isSignUp ? 'Регистрация' : 'Вход')
    // Здесь будет логика авторизации по email
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="relative">
              <Icon name="Play" size={32} className="text-accent animate-pulse" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg animate-pulse" />
            </div>
            <span className="text-2xl font-bold gradient-text">ASTINET</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Присоединяйся к видео-сообществу
          </p>
        </div>

        <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {isSignUp ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Зарегистрируйтесь, чтобы начать пользоваться ASTINET'
                : 'Добро пожаловать обратно! Войдите в свой аккаунт'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Социальные сети */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Быстрый вход через социальные сети
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    className={`${provider.color} ${provider.textColor} border-none hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    onClick={() => handleSocialAuth(provider.name)}
                  >
                    <Icon name={provider.icon as any} size={18} className="mr-2" />
                    {provider.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-2 text-xs text-muted-foreground">или</span>
              <Separator className="flex-1" />
            </div>

            {/* Форма email */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Введите email"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  className="h-11"
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Повторите пароль"
                    className="h-11"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSignUp ? 'Создать аккаунт' : 'Войти'}
              </Button>
            </form>

            {/* Переключение между входом и регистрацией */}
            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignUp 
                  ? 'Уже есть аккаунт? Войти'
                  : 'Нет аккаунта? Зарегистрироваться'
                }
              </button>
            </div>

            {/* Дополнительные опции */}
            {!isSignUp && (
              <div className="text-center">
                <button className="text-sm text-accent hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Условия использования */}
        <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
          Продолжая, вы соглашаетесь с{' '}
          <button className="text-accent hover:underline">
            Условиями использования
          </button>{' '}
          и{' '}
          <button className="text-accent hover:underline">
            Политикой конфиденциальности
          </button>
        </p>
      </div>
    </div>
  )
}