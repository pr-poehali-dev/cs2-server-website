import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface DonatePackage {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  features: string[];
  color: string;
  popular?: boolean;
}

interface DonateSectionProps {
  donatePackages: DonatePackage[];
  user: SteamUser | null;
  setIsAuthOpen: (open: boolean) => void;
}

export default function DonateSection({ donatePackages, user, setIsAuthOpen }: DonateSectionProps) {
  return (
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
  );
}
