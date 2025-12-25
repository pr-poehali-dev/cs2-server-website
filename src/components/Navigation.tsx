import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface SteamUser {
  steamId: string;
  username: string;
  avatar: string;
  level: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface NavigationProps {
  navItems: NavItem[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  user: SteamUser | null;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  handleSteamLogin: () => void;
  handleLogout: () => void;
}

export default function Navigation({
  navItems,
  activeSection,
  scrollToSection,
  user,
  isAuthOpen,
  setIsAuthOpen,
  handleSteamLogin,
  handleLogout,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-anime-purple to-anime-pink flex items-center justify-center text-2xl">
              ⚡
            </div>
            <span className="font-heading font-bold bg-gradient-to-r from-anime-purple via-anime-pink to-anime-orange bg-clip-text text-transparent mx-0 text-2xl">CS2 COMEBACK </span>
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
  );
}