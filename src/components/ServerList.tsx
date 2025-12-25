import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

interface ServerListProps {
  servers: Server[];
  handleConnectServer: (ip: string) => void;
  handleCopyIP: (ip: string) => void;
}

export default function ServerList({ servers, handleConnectServer, handleCopyIP }: ServerListProps) {
  return (
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
  );
}
