import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { PaymentButton } from '@/components/extensions/robokassa/PaymentButton';
import type { CartItem } from '@/components/extensions/robokassa/useRobokassa';
import func2url from '@/../backend/func2url.json';

interface SteamUser {
  steamId: string;
  username: string;
  avatar: string;
  level: number;
}

interface Server {
  id: string;
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  mode: string;
  status: 'online' | 'full' | 'offline';
  ip: string;
  ping: number;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState<SteamUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('steamUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSteamLogin = () => {
    const mockUser: SteamUser = {
      steamId: '76561198000000000',
      username: 'AnimeGamer2024',
      avatar: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      level: 47,
    };
    setUser(mockUser);
    localStorage.setItem('steamUser', JSON.stringify(mockUser));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('steamUser');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'about', label: 'О сервере', icon: 'Info' },
    { id: 'servers', label: 'Серверы', icon: 'Server' },
    { id: 'rules', label: 'Правила', icon: 'BookOpen' },
    { id: 'donate', label: 'Донат', icon: 'CreditCard' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
    { id: 'ratings', label: 'Рейтинги', icon: 'Trophy' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  const donatePackages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 199,
      priceDisplay: '199₽',
      features: ['Уникальный префикс', 'Доступ к VIP оружию', '2x опыта на 7 дней'],
      color: 'from-anime-purple to-anime-blue',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 499,
      priceDisplay: '499₽',
      features: ['Все из Starter', 'Приоритет подключения', 'Эксклюзивные скины', '3x опыта на 30 дней'],
      color: 'from-anime-pink to-anime-purple',
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 999,
      priceDisplay: '999₽',
      features: ['Все из Premium', 'Личный статус', 'Доступ к секретным картам', '5x опыта навсегда'],
      color: 'from-anime-orange to-anime-pink',
    },
  ];

  const topPlayers = [
    { rank: 1, name: 'ShadowNinja', rating: 2847, kills: 15420, icon: '🥇' },
    { rank: 2, name: 'CyberSamurai', rating: 2735, kills: 14832, icon: '🥈' },
    { rank: 3, name: 'NeonDragon', rating: 2698, kills: 13957, icon: '🥉' },
    { rank: 4, name: 'PhantomAce', rating: 2543, kills: 12784, icon: '4' },
    { rank: 5, name: 'StormBreaker', rating: 2401, kills: 11965, icon: '5' },
    { rank: 6, name: 'VoidWalker', rating: 2365, kills: 11543, icon: '6' },
    { rank: 7, name: 'BlazeFury', rating: 2298, kills: 10987, icon: '7' },
    { rank: 8, name: 'IceQueen', rating: 2234, kills: 10654, icon: '8' },
    { rank: 9, name: 'ThunderStrike', rating: 2187, kills: 10321, icon: '9' },
    { rank: 10, name: 'MysticBlade', rating: 2143, kills: 9987, icon: '10' },
  ];

  const news = [
    {
      title: 'Новый режим: Аниме Битва',
      date: '20 декабря 2024',
      description: 'Встречайте эксклюзивный режим с уникальными способностями персонажей!',
      badge: 'Новинка',
    },
    {
      title: 'Зимний ивент запущен',
      date: '15 декабря 2024',
      description: 'Участвуйте в праздничных событиях и получайте редкие награды',
      badge: 'Ивент',
    },
    {
      title: 'Обновление рейтинговой системы',
      date: '10 декабря 2024',
      description: 'Улучшенный подсчет MMR и новые достижения для топ-игроков',
      badge: 'Обновление',
    },
  ];

  const rules = [
    { icon: 'Shield', title: 'Читы запрещены', description: 'Использование любых читов ведет к перманентной блокировке' },
    { icon: 'Users', title: 'Уважение к игрокам', description: 'Оскорбления, расизм и токсичность строго запрещены' },
    { icon: 'Mic', title: 'Голосовой чат', description: 'Используйте микрофон для командной игры, спам запрещен' },
    { icon: 'Ban', title: 'Нет гриферства', description: 'Намеренная порча игры союзников карается баном' },
  ];

  const servers: Server[] = [
    {
      id: '1',
      name: '🔥 CS2 ANIME | Deathmatch #1',
      map: 'de_dust2',
      players: 24,
      maxPlayers: 32,
      mode: 'Deathmatch',
      status: 'online',
      ip: '185.248.100.25:27015',
      ping: 12,
    },
    {
      id: '2',
      name: '⚡ CS2 ANIME | Competitive #1',
      map: 'de_mirage',
      players: 10,
      maxPlayers: 10,
      mode: 'Competitive',
      status: 'full',
      ip: '185.248.100.25:27016',
      ping: 15,
    },
    {
      id: '3',
      name: '💫 CS2 ANIME | AWP Only #1',
      map: 'awp_lego_2',
      players: 18,
      maxPlayers: 24,
      mode: 'AWP Only',
      status: 'online',
      ip: '185.248.100.25:27017',
      ping: 18,
    },
    {
      id: '4',
      name: '🌸 CS2 ANIME | Surf #1',
      map: 'surf_kitsune',
      players: 14,
      maxPlayers: 20,
      mode: 'Surf',
      status: 'online',
      ip: '185.248.100.25:27018',
      ping: 20,
    },
    {
      id: '5',
      name: '🎯 CS2 ANIME | Aim Arena #1',
      map: 'aim_redline',
      players: 8,
      maxPlayers: 16,
      mode: 'Aim Arena',
      status: 'online',
      ip: '185.248.100.25:27019',
      ping: 14,
    },
    {
      id: '6',
      name: '🎪 CS2 ANIME | Retake #1',
      map: 'de_inferno',
      players: 16,
      maxPlayers: 20,
      mode: 'Retake',
      status: 'online',
      ip: '185.248.100.25:27020',
      ping: 16,
    },
  ];

  const handleConnectServer = (ip: string) => {
    window.open(`steam://connect/${ip}`, '_self');
  };

  const handleCopyIP = (ip: string) => {
    navigator.clipboard.writeText(ip);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-anime-purple to-anime-pink flex items-center justify-center text-2xl">
                ⚡
              </div>
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-anime-purple via-anime-pink to-anime-orange bg-clip-text text-transparent">
                CS2 ANIME
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => scrollToSection(item.id)}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={16} />
                  {item.label}
                </Button>
              ))}
              
              {user ? (
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-anime-purple/20 to-anime-pink/20 border border-anime-purple">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{user.username}</p>
                      <p className="text-xs text-muted-foreground">Уровень {user.level}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <Icon name="LogOut" size={16} />
                  </Button>
                </div>
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button className="ml-4 bg-gradient-to-r from-anime-purple to-anime-pink">
                      <Icon name="LogIn" size={16} />
                      Вход через Steam
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading">Авторизация через Steam</DialogTitle>
                      <DialogDescription>
                        Войдите через Steam, чтобы получить доступ к профилю, рейтингам и донат-пакетам
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                          <Icon name="Check" size={18} className="text-anime-purple" />
                          <span className="text-sm">Синхронизация статистики</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                          <Icon name="Check" size={18} className="text-anime-purple" />
                          <span className="text-sm">Доступ к лидерборду</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                          <Icon name="Check" size={18} className="text-anime-purple" />
                          <span className="text-sm">Покупка донат-пакетов</span>
                        </div>
                      </div>
                      <Button 
                        onClick={handleSteamLogin} 
                        className="w-full h-12 text-lg bg-gradient-to-r from-[#1b2838] to-[#2a475e] hover:opacity-90"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                        </svg>
                        Войти через Steam
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-heading font-black mb-6 bg-gradient-to-r from-anime-purple via-anime-pink to-anime-orange bg-clip-text text-transparent leading-tight">
              CS2 ANIME SERVER
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Погрузись в мир Counter-Strike 2 с уникальной аниме атмосферой! Рейтинги, турниры и эпичные битвы ждут тебя
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="text-lg animate-glow" onClick={() => scrollToSection('donate')}>
                <Icon name="Zap" size={20} />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => scrollToSection('ratings')}>
                <Icon name="Trophy" size={20} />
                Таблица лидеров
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-gradient-to-r from-anime-purple to-anime-pink bg-clip-text text-transparent">
            О сервере
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-anime-purple transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-purple to-anime-blue flex items-center justify-center text-2xl mb-4">
                  ⚔️
                </div>
                <CardTitle>Рейтинговая система</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Продуманная система MMR с детальной статистикой каждого игрока и лидербордами
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-anime-pink transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-pink to-anime-orange flex items-center justify-center text-2xl mb-4">
                  🎮
                </div>
                <CardTitle>Уникальные режимы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Эксклюзивные игровые режимы с элементами аниме-вселенных и способностями
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-anime-orange transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-orange to-anime-pink flex items-center justify-center text-2xl mb-4">
                  👥
                </div>
                <CardTitle>Комьюнити</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Дружное сообщество игроков, турниры и регулярные ивенты с призами
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="servers" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-anime-purple to-anime-pink bg-clip-text text-transparent">
            Наши серверы
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выбери сервер и присоединяйся к игре!</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {servers.map((server) => (
              <Card
                key={server.id}
                className={`border-2 transition-all hover:scale-[1.02] ${
                  server.status === 'online'
                    ? 'hover:border-anime-purple'
                    : server.status === 'full'
                    ? 'border-anime-orange'
                    : 'opacity-60'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{server.name}</CardTitle>
                    <Badge
                      className={
                        server.status === 'online'
                          ? 'bg-anime-purple'
                          : server.status === 'full'
                          ? 'bg-anime-orange'
                          : 'bg-muted'
                      }
                    >
                      {server.status === 'online' ? 'Онлайн' : server.status === 'full' ? 'Заполнен' : 'Оффлайн'}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Map" size={14} />
                      <span className="font-mono text-xs">{server.map}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Users" size={14} />
                        <span className="text-sm">
                          {server.players}/{server.maxPlayers}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Wifi" size={14} />
                        <span className="text-sm">{server.ping}ms</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground">Режим:</span>
                    <Badge variant="outline" className="text-xs">
                      {server.mode}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground font-mono">{server.ip}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyIP(server.ip)}
                      className="h-6 px-2"
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleConnectServer(server.ip)}
                      disabled={server.status === 'offline'}
                      className="flex-1 bg-gradient-to-r from-anime-purple to-anime-pink hover:opacity-90 disabled:opacity-50"
                    >
                      <Icon name="Gamepad2" size={16} />
                      {server.status === 'full' ? 'Присоединиться' : 'Играть'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-gradient-to-r from-anime-orange to-anime-pink bg-clip-text text-transparent">
            Правила сервера
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {rules.map((rule, index) => (
              <Card key={index} className="border-2 hover:border-anime-purple transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-purple to-anime-pink flex items-center justify-center">
                      <Icon name={rule.icon as any} size={24} />
                    </div>
                    <CardTitle>{rule.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-anime-purple to-anime-orange bg-clip-text text-transparent">
            Донат пакеты
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Поддержи сервер и получи эксклюзивные привилегии
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {donatePackages.map((pkg, index) => (
              <Card
                key={index}
                className={`border-2 hover:scale-105 transition-all relative ${
                  pkg.popular ? 'border-anime-pink shadow-xl shadow-anime-pink/20' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-anime-pink to-anime-orange text-white px-6 py-1">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                    💎
                  </div>
                  <CardTitle className="text-center text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-center">
                    <span className="text-4xl font-heading font-bold text-foreground">{pkg.priceDisplay}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-anime-purple flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {user ? (
                    <PaymentButton
                      apiUrl={func2url['robokassa-robokassa']}
                      amount={pkg.price}
                      userName={user.username}
                      userEmail={`${user.steamId}@steam.local`}
                      userPhone="+70000000000"
                      cartItems={[
                        {
                          id: pkg.id,
                          name: `Донат-пакет ${pkg.name}`,
                          price: pkg.price,
                          quantity: 1,
                        } as CartItem,
                      ]}
                      successUrl={window.location.origin + '/?payment=success'}
                      failUrl={window.location.origin + '/?payment=failed'}
                      onSuccess={(orderNumber) => {
                        alert(`Оплата успешна! Номер заказа: ${orderNumber}`);
                      }}
                      onError={(error) => {
                        alert(`Ошибка оплаты: ${error.message}`);
                      }}
                      buttonText="Купить"
                      className={`w-full h-10 rounded-lg bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white font-semibold transition-all`}
                    />
                  ) : (
                    <Button 
                      onClick={() => setIsAuthOpen(true)}
                      className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90`}
                    >
                      Войти для покупки
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-gradient-to-r from-anime-blue to-anime-purple bg-clip-text text-transparent">
            Новости
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {news.map((item, index) => (
              <Card key={index} className="border-2 hover:border-anime-blue transition-all hover:scale-105">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-gradient-to-r from-anime-purple to-anime-pink">{item.badge}</Badge>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ratings" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-anime-orange to-anime-purple bg-clip-text text-transparent">
            Топ-10 игроков
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Лучшие воины нашего сервера</p>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-3">
              {topPlayers.map((player) => (
                <Card
                  key={player.rank}
                  className={`border-2 transition-all hover:scale-[1.02] ${
                    player.rank <= 3
                      ? 'border-anime-purple bg-gradient-to-r from-anime-purple/10 to-anime-pink/10'
                      : 'hover:border-anime-purple'
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-heading font-bold ${
                          player.rank <= 3
                            ? 'bg-gradient-to-br from-anime-purple to-anime-pink'
                            : 'bg-muted'
                        }`}
                      >
                        {player.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold">{player.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Target" size={14} />
                            {player.kills} убийств
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-heading font-bold bg-gradient-to-r from-anime-purple to-anime-pink bg-clip-text text-transparent">
                        {player.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">рейтинг</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-anime-pink to-anime-orange bg-clip-text text-transparent">
            Контакты
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Присоединяйся к нашему сообществу</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-anime-blue to-anime-purple">
              <Icon name="MessageCircle" size={20} />
              Discord
            </Button>
            <Button size="lg" className="gap-2 bg-gradient-to-r from-anime-purple to-anime-pink">
              <Icon name="Send" size={20} />
              Telegram
            </Button>
            <Button size="lg" className="gap-2 bg-gradient-to-r from-anime-pink to-anime-orange">
              <Icon name="Youtube" size={20} />
              YouTube
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 CS2 Anime Server. Все права защищены.</p>
          <p className="text-sm mt-2">Made with 💜 for anime and CS2 lovers</p>
        </div>
      </footer>
    </div>
  );
}