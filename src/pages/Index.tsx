import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import ServerList from '@/components/ServerList';
import DonateSection from '@/components/DonateSection';

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
      name: '🔥 CS2 ANIME | Public #1',
      map: 'de_dust2',
      players: 24,
      maxPlayers: 32,
      mode: 'Public',
      status: 'online',
      ip: '185.248.100.25:27015',
      ping: 12,
    },
    {
      id: '2',
      name: '💫 CS2 ANIME | AWP + AIM',
      map: 'awp_lego_2',
      players: 18,
      maxPlayers: 24,
      mode: 'AWP + AIM',
      status: 'online',
      ip: '185.248.100.25:27017',
      ping: 14,
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
      <Navigation
        navItems={navItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        user={user}
        isAuthOpen={isAuthOpen}
        setIsAuthOpen={setIsAuthOpen}
        handleSteamLogin={handleSteamLogin}
        handleLogout={handleLogout}
      />

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-anime-purple via-anime-pink to-anime-orange bg-clip-text text-transparent animate-gradient">COMEBACK CS2</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Погрузись в мир аниме-стилистики Counter-Strike 2. Уникальные режимы, крутое комьюнити и масса фана!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-anime-purple to-anime-pink hover:scale-105 transition-transform text-lg px-8"
                onClick={() => scrollToSection('servers')}
              >
                <Icon name="Gamepad2" size={20} />
                Начать играть
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-anime-purple hover:bg-anime-purple/10 text-lg px-8"
                onClick={() => scrollToSection('about')}
              >
                <Icon name="Info" size={20} />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-gradient-to-r from-anime-purple to-anime-pink bg-clip-text text-transparent">
            Почему мы?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-anime-purple transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-purple to-anime-pink flex items-center justify-center text-2xl mb-4">
                  🎮
                </div>
                <CardTitle>Уникальные режимы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Эксклюзивные игровые режимы с аниме-тематикой, которых нет больше нигде
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-anime-pink transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-anime-pink to-anime-orange flex items-center justify-center text-2xl mb-4">
                  ⚡
                </div>
                <CardTitle>Высокая производительность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Серверы на мощном железе с минимальным пингом и 128 тик-рейтом
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

      <ServerList
        servers={servers}
        handleConnectServer={handleConnectServer}
        handleCopyIP={handleCopyIP}
      />

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

      <DonateSection
        donatePackages={donatePackages}
        user={user}
        setIsAuthOpen={setIsAuthOpen}
      />

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
            Присоединяйся к нам
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Следи за новостями и общайся с комьюнити в наших социальных сетях
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" className="gap-2 border-2 hover:border-anime-purple">
              <Icon name="MessageCircle" size={20} />
              Discord
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-2 hover:border-anime-pink">
              <Icon name="Send" size={20} />
              Telegram
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-2 hover:border-anime-orange">
              <Icon name="Globe" size={20} />
              VK
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 CS2 СOMEBACK SERVER. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}