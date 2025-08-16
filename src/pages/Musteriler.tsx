import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, MapPin, Phone, Mail, Calendar, Users } from "lucide-react";

const musteriler = [
  {
    id: 1,
    ad: "Əli Həsənov",
    email: "ali.hasanov@email.com",
    telefon: "+994 55 123 4567",
    unvan: "Nizami küçəsi 45, Bakı",
    qeydiyyat: "2024-01-15",
    sifarisler: 12,
    xercler: 450.50,
    status: "aktiv",
    avatar: null
  },
  {
    id: 2,
    ad: "Günel Məmmədova",
    email: "gunel.mammadova@email.com",
    telefon: "+994 55 234 5678",
    unvan: "28 May küçəsi 123, Bakı",
    qeydiyyat: "2024-02-20",
    sifarisler: 8,
    xercler: 320.75,
    status: "aktiv",
    avatar: null
  },
  {
    id: 3,
    ad: "Rəşad Əliyev",
    email: "resad.aliyev@email.com",
    telefon: "+994 55 345 6789",
    unvan: "Fikrət Əmirov küçəsi 67, Bakı",
    qeydiyyat: "2024-03-10",
    sifarisler: 5,
    xercler: 180.25,
    status: "passiv",
    avatar: null
  },
  {
    id: 4,
    ad: "Səbinə Qurbanova",
    email: "sebine.qurbanova@email.com",
    telefon: "+994 55 456 7890",
    unvan: "Həzi Aslanov prospekti 89, Bakı",
    qeydiyyat: "2024-01-28",
    sifarisler: 15,
    xercler: 680.00,
    status: "aktiv",
    avatar: null
  },
  {
    id: 5,
    ad: "Elxan Bayramov",
    email: "elxan.bayramov@email.com",
    telefon: "+994 55 567 8901",
    unvan: "Nəsimi küçəsi 234, Bakı",
    qeydiyyat: "2024-02-14",
    sifarisler: 9,
    xercler: 390.80,
    status: "aktiv",
    avatar: null
  },
  {
    id: 6,
    ad: "Nigar Süleymanova",
    email: "nigar.suleymanova@email.com",
    telefon: "+994 55 678 9012",
    unvan: "Azadlıq prospekti 156, Bakı",
    qeydiyyat: "2024-03-05",
    sifarisler: 3,
    xercler: 125.40,
    status: "yeni",
    avatar: null
  }
];

export default function Musteriler() {
  const [axtar, setAxtar] = useState("");
  
  const filteredMusteriler = musteriler.filter(musteri =>
    musteri.ad.toLowerCase().includes(axtar.toLowerCase()) ||
    musteri.email.toLowerCase().includes(axtar.toLowerCase()) ||
    musteri.telefon.includes(axtar)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktiv":
        return "bg-pharmacy-primary text-primary-foreground";
      case "passiv":
        return "bg-muted text-muted-foreground";
      case "yeni":
        return "bg-pharmacy-accent text-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Müştərilər</h1>
          <p className="text-muted-foreground mt-2">
            Qeydiyyatlı müştərilər və onların məlumatları
          </p>
        </div>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Müştəri
        </Button>
      </div>

      {/* Search and stats */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Müştəri adı, email və ya telefon üzrə axtarın..."
                className="pl-9"
                value={axtar}
                onChange={(e) => setAxtar(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-pharmacy-light text-pharmacy-dark">
                Ümumi: {musteriler.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Aktiv: {musteriler.filter(m => m.status === "aktiv").length}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Yeni: {musteriler.filter(m => m.status === "yeni").length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMusteriler.map((musteri) => (
          <Card key={musteri.id} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={musteri.avatar || ""} />
                  <AvatarFallback className="bg-pharmacy-light text-pharmacy-dark">
                    {musteri.ad.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">{musteri.ad}</CardTitle>
                  <p className="text-sm text-muted-foreground">{musteri.email}</p>
                </div>
                <Badge className={getStatusColor(musteri.status)}>
                  {musteri.status === "aktiv" ? "Aktiv" : 
                   musteri.status === "passiv" ? "Passiv" : "Yeni"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {musteri.telefon}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {musteri.unvan}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Qeydiyyat: {new Date(musteri.qeydiyyat).toLocaleDateString('az-AZ')}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-pharmacy-primary">{musteri.sifarisler}</div>
                  <div className="text-xs text-muted-foreground">Sifariş</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{musteri.xercler} ₼</div>
                  <div className="text-xs text-muted-foreground">Xərclər</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Redaktə et
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-pharmacy-primary">
                  Sifarişlər
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMusteriler.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Axtarış nəticəsində müştəri tapılmadı</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}