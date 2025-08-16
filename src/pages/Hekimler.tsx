import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, MapPin, Phone, Star, Calendar, UserCheck } from "lucide-react";

const hekimler = [
  {
    id: 1,
    ad: "Dr. Əli Məmmədov",
    ixtisas: "Kardiologiya",
    klinika: "Mərkəzi Tibb Mərkəzi",
    telefon: "+994 55 123 4567",
    tecrube: "15 il",
    reytinq: 4.8,
    hastalSayi: 1250,
    status: "aktiv",
    avatar: null
  },
  {
    id: 2,
    ad: "Dr. Günay Həsənova",
    ixtisas: "Ginekologiya",
    klinika: "Sağlamlıq Klinikası", 
    telefon: "+994 55 234 5678",
    tecrube: "12 il",
    reytinq: 4.9,
    hastalSayi: 980,
    status: "aktiv",
    avatar: null
  },
  {
    id: 3,
    ad: "Dr. Rəşad Qəribov",
    ixtisas: "Nevrologiya",
    klinika: "Mərkəzi Tibb Mərkəzi",
    telefon: "+994 55 345 6789",
    tecrube: "8 il", 
    reytinq: 4.7,
    hastalSayi: 756,
    status: "məzuniyyətdə",
    avatar: null
  },
  {
    id: 4,
    ad: "Dr. Səbinə Əliyeva",
    ixtisas: "Pediatriya",
    klinika: "Aile Həkimliği Mərkəzi",
    telefon: "+994 55 456 7890",
    tecrube: "10 il",
    reytinq: 4.8,
    hastalSayi: 1100,
    status: "aktiv",
    avatar: null
  },
  {
    id: 5,
    ad: "Dr. Elxan Bayramov",
    ixtisas: "Ümumi təbabət",
    klinika: "Sağlamlıq Klinikası",
    telefon: "+994 55 567 8901",
    tecrube: "6 il",
    reytinq: 4.6,
    hastalSayi: 650,
    status: "aktiv",
    avatar: null
  },
  {
    id: 6,
    ad: "Dr. Nigar Süleymanova",
    ixtisas: "Dermatologiya",
    klinika: "Müasir Diaqnostika",
    telefon: "+994 55 678 9012",
    tecrube: "14 il",
    reytinq: 4.9,
    hastalSayi: 890,
    status: "aktiv", 
    avatar: null
  }
];

export default function Hekimler() {
  const [axtar, setAxtar] = useState("");
  
  const filteredHekimler = hekimler.filter(hekim =>
    hekim.ad.toLowerCase().includes(axtar.toLowerCase()) ||
    hekim.ixtisas.toLowerCase().includes(axtar.toLowerCase()) ||
    hekim.klinika.toLowerCase().includes(axtar.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Həkimlər</h1>
          <p className="text-muted-foreground mt-2">
            Qeydiyyatlı həkimlər və mütəxəssislər
          </p>
        </div>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Həkim
        </Button>
      </div>

      {/* Search and stats */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Həkim adı, ixtisas və ya klinika üzrə axtarın..."
                className="pl-9"
                value={axtar}
                onChange={(e) => setAxtar(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-pharmacy-light text-pharmacy-dark">
                Ümumi: {hekimler.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Aktiv: {hekimler.filter(h => h.status === "aktiv").length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHekimler.map((hekim) => (
          <Card key={hekim.id} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={hekim.avatar || ""} />
                  <AvatarFallback className="bg-pharmacy-light text-pharmacy-dark">
                    {hekim.ad.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">{hekim.ad}</CardTitle>
                  <p className="text-sm text-pharmacy-primary font-medium">{hekim.ixtisas}</p>
                </div>
                <Badge 
                  variant={hekim.status === "aktiv" ? "default" : "secondary"}
                  className={hekim.status === "aktiv" ? "bg-pharmacy-primary" : ""}
                >
                  {hekim.status === "aktiv" ? "Aktiv" : "Məzuniyyət"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {hekim.klinika}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {hekim.telefon}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {hekim.tecrube} təcrübə
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{hekim.reytinq}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {hekim.hastalSayi} xəstə
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Redaktə et
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-pharmacy-primary">
                  Profil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHekimler.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Axtarış nəticəsində həkim tapılmadı</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}