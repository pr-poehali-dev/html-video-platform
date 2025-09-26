import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Movie {
  id: number
  title: string
  genre: string[]
  year: number
  rating: number
  poster: string
  description: string
  actors: string[]
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Темная Ночь",
    genre: ["Триллер", "Драма"],
    year: 2023,
    rating: 8.5,
    poster: "/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg",
    description: "Захватывающий триллер о детективе, расследующем серию загадочных преступлений.",
    actors: ["Иван Петров", "Анна Сидорова", "Михаил Козлов"]
  },
  {
    id: 2,
    title: "Взрывная Волна",
    genre: ["Боевик", "Приключения"],
    year: 2023,
    rating: 7.8,
    poster: "/img/dffeb761-bf0d-4fc2-b862-7136aa95b106.jpg",
    description: "Адреналиновый боевик с головокружительными сценами погонь и взрывов.",
    actors: ["Александр Волков", "Елена Морозова", "Сергей Белов"]
  },
  {
    id: 3,
    title: "Тени Прошлого",
    genre: ["Ужасы", "Мистика"],
    year: 2022,
    rating: 8.2,
    poster: "/img/2701a33e-694e-402d-848c-9ff24ef7a992.jpg",
    description: "Мистический хоррор о семье, которая переезжает в дом с темным прошлым.",
    actors: ["Ольга Краснова", "Дмитрий Новиков", "Татьяна Лебедева"]
  },
  {
    id: 4,
    title: "Космическая Одиссея",
    genre: ["Фантастика", "Драма"],
    year: 2023,
    rating: 9.1,
    poster: "/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg",
    description: "Эпическая история о путешествии к далеким звездам.",
    actors: ["Максим Орлов", "Виктория Смирнова", "Артем Федоров"]
  },
  {
    id: 5,
    title: "Городские Джунгли",
    genre: ["Криминал", "Триллер"],
    year: 2023,
    rating: 8.0,
    poster: "/img/dffeb761-bf0d-4fc2-b862-7136aa95b106.jpg",
    description: "Напряженная криминальная драма о выживании в большом городе.",
    actors: ["Роман Захаров", "Светлана Павлова", "Игорь Соколов"]
  },
  {
    id: 6,
    title: "Последний Герой",
    genre: ["Боевик", "Драма"],
    year: 2022,
    rating: 8.7,
    poster: "/img/2701a33e-694e-402d-848c-9ff24ef7a992.jpg",
    description: "История о человеке, который должен спасти мир от неминуемой катастрофы.",
    actors: ["Андрей Волков", "Мария Кузнецова", "Николай Попов"]
  }
]

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  
  const allGenres = Array.from(
    new Set(mockMovies.flatMap(movie => movie.genre))
  )
  
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = searchQuery === '' || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.actors.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.genre.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesGenre = selectedGenre === '' || movie.genre.includes(selectedGenre)
    
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Film" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CinemaStream</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Главная
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Фильмы
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Сериалы
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Мой список
              </Button>
            </nav>
            
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Войти
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('/img/211b2e7b-6fb8-4c99-b072-14b62fc64b48.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-left max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Темная Ночь
          </h2>
          <p className="text-xl mb-8 text-gray-200 leading-relaxed">
            Захватывающий триллер о детективе, расследующем серию загадочных преступлений в городе, где каждая тень таит опасность.
          </p>
          <div className="flex gap-4 mb-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Icon name="Plus" size={20} className="mr-2" />
              В список
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
              8.5
            </span>
            <span>2023</span>
            <span>Триллер, Драма</span>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по названию, актеру или жанру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input pl-10 h-12 text-base"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedGenre === '' ? 'default' : 'outline'}
              onClick={() => setSelectedGenre('')}
              className="h-12"
            >
              Все жанры
            </Button>
            {allGenres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                onClick={() => setSelectedGenre(selectedGenre === genre ? '' : genre)}
                className="h-12"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 pb-12">
        <h3 className="text-2xl font-semibold mb-6 text-foreground">
          {searchQuery || selectedGenre ? 'Результаты поиска' : 'Рекомендации'}
          <span className="text-muted-foreground ml-2">({filteredMovies.length})</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredMovies.map(movie => (
            <Card key={movie.id} className="movie-card group">
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Icon name="Play" size={16} className="mr-1" />
                    Смотреть
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded">
                  <span className="text-yellow-400 text-sm font-medium flex items-center gap-1">
                    <Icon name="Star" size={12} className="fill-yellow-400" />
                    {movie.rating}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-card-foreground mb-2 line-clamp-1">
                  {movie.title}
                </h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {movie.genre.map(genre => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="genre-badge text-xs"
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {movie.year} • {movie.actors.slice(0, 2).join(', ')}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {movie.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или выбрать другой жанр
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold text-foreground mb-4">Контент</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Фильмы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сериалы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документальные</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Жанры</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Боевики</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Драмы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Комедии</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Социальные сети</h5>
              <div className="flex gap-4">
                <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Icon name="Instagram" size={20} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CinemaStream. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}