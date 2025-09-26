import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface Video {
  id: number
  title: string
  channel: string
  channelAvatar: string
  views: string
  uploadTime: string
  duration: string
  thumbnail: string
  description: string
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: "Самый захватывающий триллер года - обзор фильма 'Темная Ночь'",
    channel: "КиноОбзоры",
    channelAvatar: "КО",
    views: "2,3 млн",
    uploadTime: "2 дня назад",
    duration: "15:32",
    thumbnail: "/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg",
    description: "Подробный разбор нового триллера с Иваном Петровым"
  },
  {
    id: 2,
    title: "ТОП-10 лучших боевиков 2023 года | Что посмотреть на выходных",
    channel: "КиноТоп",
    channelAvatar: "КТ",
    views: "1,8 млн",
    uploadTime: "1 неделя назад",
    duration: "22:45",
    thumbnail: "/img/dffeb761-bf0d-4fc2-b862-7136aa95b106.jpg",
    description: "Подборка самых зрелищных боевиков этого года"
  },
  {
    id: 3,
    title: "Разбор концовки фильма 'Тени Прошлого' - все пасхалки и детали",
    channel: "КиноТеории",
    channelAvatar: "КР",
    views: "850 тыс",
    uploadTime: "3 дня назад",
    duration: "18:21",
    thumbnail: "/img/2701a33e-694e-402d-848c-9ff24ef7a992.jpg",
    description: "Объясняем сложную концовку мистического хоррора"
  },
  {
    id: 4,
    title: "КОСМИЧЕСКАЯ ОДИССЕЯ - Лучший фантастический фильм десятилетия?",
    channel: "Космо Кино",
    channelAvatar: "КК",
    views: "3,2 млн",
    uploadTime: "5 дней назад",
    duration: "28:14",
    thumbnail: "/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg",
    description: "Полный обзор эпической космической саги"
  },
  {
    id: 5,
    title: "За кадром: Как снимали сцены погонь в 'Городские Джунгли'",
    channel: "КиноКухня",
    channelAvatar: "КК",
    views: "945 тыс",
    uploadTime: "4 дня назад",
    duration: "12:08",
    thumbnail: "/img/dffeb761-bf0d-4fc2-b862-7136aa95b106.jpg",
    description: "Эксклюзивные кадры со съемочной площадки"
  },
  {
    id: 6,
    title: "Все фильмы франшизы 'Последний Герой' - от худшего к лучшему",
    channel: "КиноРейтинг",
    channelAvatar: "КР",
    views: "1,3 млн",
    uploadTime: "1 день назад",
    duration: "35:42",
    thumbnail: "/img/2701a33e-694e-402d-848c-9ff24ef7a992.jpg",
    description: "Разбираем всю серию фильмов о последнем герое"
  },
  {
    id: 7,
    title: "РЕАКЦИЯ на трейлер 'Темная Ночь 2' - МОИ ПРЕДСКАЗАНИЯ СБЫЛИСЬ!",
    channel: "РеакцииПро",
    channelAvatar: "РП",
    views: "2,7 млн",
    uploadTime: "6 часов назад",
    duration: "8:45",
    thumbnail: "/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg",
    description: "Бурная реакция на долгожданный трейлер сиквела"
  },
  {
    id: 8,
    title: "Интервью с режиссером 'Взрывной Волны' о секретах создания фильма",
    channel: "КиноИнтервью",
    channelAvatar: "КИ",
    views: "674 тыс",
    uploadTime: "2 недели назад",
    duration: "45:12",
    thumbnail: "/img/dffeb761-bf0d-4fc2-b862-7136aa95b106.jpg",
    description: "Эксклюзивное интервью с создателем блокбастера"
  }
]

const sidebarItems = [
  { icon: "Home", label: "Главная", active: true },
  { icon: "Compass", label: "В тренде" },
  { icon: "Music", label: "Музыка" },
  { icon: "Gamepad2", label: "Игры" },
  { icon: "Newspaper", label: "Новости" },
  { icon: "Trophy", label: "Спорт" },
  { icon: "Lightbulb", label: "Обучение" },
  { icon: "Shirt", label: "Мода и красота" },
]

const subscriptions = [
  { name: "КиноОбзоры", avatar: "КО", online: true },
  { name: "КиноТоп", avatar: "КТ", online: false },
  { name: "КиноТеории", avatar: "КР", online: true },
  { name: "Космо Кино", avatar: "КК", online: false },
  { name: "КиноКухня", avatar: "КК", online: true },
]

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const filteredVideos = mockVideos.filter(video => {
    if (!searchQuery) return true
    return video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2"
            >
              <Icon name="Menu" size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Play" size={28} className="text-primary" />
              <span className="text-xl font-semibold hidden sm:block">VideoStream</span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0 focus:z-10"
                />
              </div>
              <Button variant="outline" className="rounded-l-none px-6">
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>У</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`sticky top-[65px] h-[calc(100vh-65px)] bg-background border-r border-border transition-all duration-300 ${
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        }`}>
          <div className="p-2 overflow-y-auto h-full">
            {/* Main navigation */}
            <div className="space-y-1 mb-4">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-6 ${
                    sidebarCollapsed ? 'px-2' : 'px-3'
                  }`}
                  size="sm"
                >
                  <Icon name={item.icon as any} size={20} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Button>
              ))}
            </div>

            {!sidebarCollapsed && (
              <>
                <Separator className="mb-4" />
                
                {/* Subscriptions */}
                <div className="space-y-1">
                  <h3 className="px-3 text-sm font-medium text-muted-foreground mb-2">
                    Подписки
                  </h3>
                  {subscriptions.map((sub, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start gap-3 px-3"
                      size="sm"
                    >
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{sub.avatar}</AvatarFallback>
                        </Avatar>
                        {sub.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <span className="truncate">{sub.name}</span>
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Category chips */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {['Все', 'Кино', 'Обзоры', 'Трейлеры', 'Интервью', 'Топы', 'Реакции', 'За кадром'].map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "secondary"}
                size="sm"
                className="whitespace-nowrap rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Videos grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="border-0 shadow-none bg-transparent group cursor-pointer">
                <div className="relative mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg group-hover:rounded-none flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Icon name="Play" size={48} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9 mt-1 flex-shrink-0">
                      <AvatarFallback className="text-xs">{video.channelAvatar}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        {video.channel}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        {video.views} просмотров • {video.uploadTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredVideos.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте другие ключевые слова или проверьте правописание
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}