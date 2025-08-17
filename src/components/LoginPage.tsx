import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giriş yoxlanması
    if (username === 'admin' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginTime', Date.now().toString());
      toast({
        title: "Giriş uğurlu!",
        description: "ŞəfaTapp İdarə Sisteminə xoş gəlmisiniz.",
      });
      onLogin();
    } else {
      toast({
        title: "Giriş xətası",
        description: "İstifadəçi adı və ya şifrə yanlışdır.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-pharmacy-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-pharmacy rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-pharmacy-dark mb-2">ŞəfaTapp</h1>
          <p className="text-muted-foreground">İdarə Sistemi</p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl text-pharmacy-dark">Giriş</CardTitle>
            <CardDescription>
              İdarə panelinə daxil olmaq üçün hesab məlumatlarınızı daxil edin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-pharmacy-dark">İstifadəçi adı</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="İstifadəçi adını daxil edin"
                    className="pl-10 border-input focus:border-pharmacy-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-pharmacy-dark">Şifrə</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrənizi daxil edin"
                    className="pl-10 border-input focus:border-pharmacy-primary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-pharmacy hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Giriş edilir...' : 'Giriş et'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-pharmacy-light rounded-lg">
              <p className="text-sm text-pharmacy-dark font-medium mb-1">Test hesabı:</p>
              <p className="text-xs text-muted-foreground">İstifadəçi adı: admin</p>
              <p className="text-xs text-muted-foreground">Şifrə: 123</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2024 ŞəfaTapp. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </div>
  );
};