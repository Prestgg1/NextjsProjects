import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MapPin, Phone, Clock, Package, Store } from "lucide-react";

const aptekler = [
  {
    id: 1,
    ad: "Sağlamlıq Apteki",
    unvan: "Nizami küçəsi 125, Bakı",
    telefon: "+994 12 555 1234",
    saat: "24 saat",
    lisenziya: "APT001234",
    eczaci: "Günay Həsənova",
    status: "aktiv",
    depo: 2500,
    gunlukSatis: 150
  },
  {
    id: 2,
    ad: "Mərkəzi Eczaxana",
    unvan: "28 May küçəsi 78, Bakı",
    telefon: "+994 12 555 2345", 
    saat: "08:00-22:00",
    lisenziya: "APT002345",
    eczaci: "Elxan Bayramov",
    status: "aktiv",
    depo: 1800,
    gunlukSatis: 120
  },
  {
    id: 3,
    ad: "Dərman Dünyası",
    unvan: "Fikrət Əmirov küçəsi 45, Bakı",
    telefon: "+994 12 555 3456",
    saat: "09:00-21:00", 
    lisenziya: "APT003456",
    eczaci: "Səbinə Əliyeva",
    status: "yoxlanır",
    depo: 1200,
    gunlukSatis: 80
  },
  {
    id: 4,
    ad: "Aile Apteki",
    unvan: "Həzi Aslanov prospekti 156, Bakı",
    telefon: "+994 12 555 4567",
    saat: "24 saat",
    lisenziya: "APT004567", 
    eczaci: "Rəşad Qəribov",
    status: "aktiv",
    depo: 3200,
    gunlukSatis: 200
  },
  {
    id: 5,
    ad: "Express Eczaxana",
    unvan: "Nəsimi küçəsi 89, Bakı",
    telefon: "+994 12 555 5678",
    saat: "08:00-20:00",
    lisenziya: "APT005678",
    eczaci: "Nigar Süleymanova", 
    status: "aktiv",
    depo: 1600,
    gunlukSatis: 90
  },
  {
    id: 6,
    ad: "Vita Apteki",
    unvan: "Azadlıq prospekti 234, Bakı",
    telefon: "+994 12 555 6789",
    saat: "24 saat",
    lisenziya: "APT006789",
    eczaci: "Əli Məmmədov",
    status: "aktiv",
    depo: 2800,
    gunlukSatis: 180
  }
];

export default function Aptekler() {
  const [axtar, setAxtar] = useState("");
  
  const filteredAptekler = aptekler.filter(apteka =>
    apteka.ad.toLowerCase().includes(axtar.toLowerCase()) ||
    apteka.unvan.toLowerCase().includes(axtar.toLowerCase()) ||
    apteka.eczaci.toLowerCase().includes(axtar.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apteklər</h1>
          <p className="text-muted-foreground mt-2">
            Qeydiyyatlı apteklər və eczaxanalar
          </p>
        </div>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Apteka
        </Button>
      </div>

      {/* Search and stats */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Apteka adı, ünvan və ya eczaçı üzrə axtarın..."
                className="pl-9"
                value={axtar}
                onChange={(e) => setAxtar(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-pharmacy-light text-pharmacy-dark">
                Ümumi: {aptekler.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Aktiv: {aptekler.filter(a => a.status === "aktiv").length}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                24 saat: {aptekler.filter(a => a.saat === "24 saat").length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pharmacies grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAptekler.map((apteka) => (
          <Card key={apteka.id} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-foreground">{apteka.ad}</CardTitle>
                <div className="flex gap-1">
                  <Badge 
                    variant={apteka.status === "aktiv" ? "default" : "secondary"}
                    className={apteka.status === "aktiv" ? "bg-pharmacy-primary" : ""}
                  >
                    {apteka.status === "aktiv" ? "Aktiv" : "Yoxlanır"}
                  </Badge>
                  {apteka.saat === "24 saat" && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      24/7
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {apteka.unvan}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {apteka.telefon}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {apteka.saat}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Məsul eczaçı:</span>
                  <span className="font-medium text-foreground">{apteka.eczaci}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lisenziya:</span>
                  <span className="font-medium text-foreground">{apteka.lisenziya}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Package className="h-4 w-4 text-pharmacy-primary" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{apteka.depo}</div>
                  <div className="text-xs text-muted-foreground">Məhsul sayı</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-pharmacy-primary">{apteka.gunlukSatis}</div>
                  <div className="text-xs text-muted-foreground">Günlük satış</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Redaktə et
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-pharmacy-primary">
                  Təfərrüatlar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAptekler.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Axtarış nəticəsində apteka tapılmadı</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}