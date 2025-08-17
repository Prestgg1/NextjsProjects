import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Stethoscope } from 'lucide-react';

interface Ixtisas {
  id: number;
  ad: string;
  sekil: string;
  hekimSayi?: number;
}

const initialIxtisaslar: Ixtisas[] = [
  {
    id: 1,
    ad: "Kardioloji",
    sekil: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 5
  },
  {
    id: 2,
    ad: "Nevroloji",
    sekil: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 3
  },
  {
    id: 3,
    ad: "Pediatriya",
    sekil: "https://images.unsplash.com/photo-1594824475574-87d8e86f9f0e?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 4
  },
  {
    id: 4,
    ad: "Dermatoloji",
    sekil: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 2
  },
  {
    id: 5,
    ad: "Ortopediya",
    sekil: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 3
  },
  {
    id: 6,
    ad: "Oftalmoloji",
    sekil: "https://images.unsplash.com/photo-1612531386530-97d2d1aa6157?w=100&h=100&fit=crop&crop=face",
    hekimSayi: 2
  }
];

export default function Ixtisaslar() {
  const [ixtisaslar, setIxtisaslar] = useState<Ixtisas[]>(initialIxtisaslar);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [yeniIxtisas, setYeniIxtisas] = useState({
    ad: '',
    sekil: ''
  });
  const { toast } = useToast();

  const handleAddIxtisas = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!yeniIxtisas.ad.trim() || !yeniIxtisas.sekil.trim()) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }

    const newIxtisas: Ixtisas = {
      id: Date.now(),
      ad: yeniIxtisas.ad.trim(),
      sekil: yeniIxtisas.sekil.trim(),
      hekimSayi: 0
    };

    setIxtisaslar([...ixtisaslar, newIxtisas]);
    setYeniIxtisas({ ad: '', sekil: '' });
    setIsAddModalOpen(false);
    
    toast({
      title: "Uğurlu!",
      description: "Yeni ixtisas əlavə edildi",
    });
  };

  const handleDeleteIxtisas = (id: number) => {
    setIxtisaslar(ixtisaslar.filter(ixtisas => ixtisas.id !== id));
    toast({
      title: "Silindi",
      description: "İxtisas uğurla silindi",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pharmacy-dark">İxtisaslar</h1>
          <p className="text-muted-foreground">
            Tibbi ixtisasları idarə edin və yeni ixtisaslar əlavə edin
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-pharmacy hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Yeni İxtisas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-pharmacy-dark">Yeni İxtisas Əlavə Et</DialogTitle>
              <DialogDescription>
                Yeni tibbi ixtisas əlavə etmək üçün aşağıdakı məlumatları doldurun
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddIxtisas} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad" className="text-pharmacy-dark">İxtisas Adı</Label>
                <Input
                  id="ad"
                  value={yeniIxtisas.ad}
                  onChange={(e) => setYeniIxtisas({ ...yeniIxtisas, ad: e.target.value })}
                  placeholder="məs: Kardioloji"
                  className="border-input focus:border-pharmacy-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sekil" className="text-pharmacy-dark">Şəkil Linki</Label>
                <Input
                  id="sekil"
                  value={yeniIxtisas.sekil}
                  onChange={(e) => setYeniIxtisas({ ...yeniIxtisas, sekil: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="border-input focus:border-pharmacy-primary"
                />
                {yeniIxtisas.sekil && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={yeniIxtisas.sekil} alt="Önizləmə" />
                      <AvatarFallback>
                        <Stethoscope className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Şəkil önizləməsi</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Ləğv et
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-pharmacy hover:opacity-90"
                >
                  Əlavə et
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ixtisaslar.map((ixtisas) => (
          <Card key={ixtisas.id} className="group hover:shadow-md transition-all duration-200 border-border/50">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-3">
                <Avatar className="w-16 h-16 border-2 border-pharmacy-light">
                  <AvatarImage src={ixtisas.sekil} alt={ixtisas.ad} />
                  <AvatarFallback className="bg-pharmacy-light text-pharmacy-dark">
                    <Stethoscope className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg text-pharmacy-dark">{ixtisas.ad}</CardTitle>
              <CardDescription>
                {ixtisas.hekimSayi ? (
                  <Badge variant="secondary" className="bg-pharmacy-light text-pharmacy-dark">
                    {ixtisas.hekimSayi} həkim
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-pharmacy-primary text-pharmacy-primary">
                    Yeni əlavə edilib
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-pharmacy-primary hover:bg-pharmacy-light"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteIxtisas(ixtisas.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ixtisaslar.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-pharmacy-dark mb-2">Hələ ixtisas yoxdur</h3>
          <p className="text-muted-foreground mb-4">
            İlk tibbi ixtisasınızı əlavə etmək üçün yuxarıdakı düyməni klikləyin
          </p>
        </div>
      )}
    </div>
  );
}