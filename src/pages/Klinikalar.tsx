import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MapPin, Phone, Users, Building2 } from "lucide-react";

const klinikalar = [
  {
    id: 1,
    ad: "Mərkəzi Tibb Mərkəzi",
    unvan: "Nizami küçəsi 15, Bakı",
    telefon: "+994 12 555 0123",
    hekimSayi: 25,
    status: "aktiv",
    xidmetler: ["Kardialogiya", "Nevrologiya", "Pediatriya"]
  },
  {
    id: 2,
    ad: "Sağlamlıq Klinikası",
    unvan: "28 May küçəsi 45, Bakı", 
    telefon: "+994 12 555 0456",
    hekimSayi: 18,
    status: "aktiv",
    xidmetler: ["Ümumi təbabət", "Ginekologiya", "Dermatologiya"]
  },
  {
    id: 3,
    ad: "Aile Həkimliği Mərkəzi",
    unvan: "Həzi Aslanov prospekti 23, Bakı",
    telefon: "+994 12 555 0789", 
    hekimSayi: 12,
    status: "yoxlanır",
    xidmetler: ["Aile həkimliği", "Laboratoriya", "Rentgen"]
  },
  {
    id: 4,
    ad: "Müasir Diaqnostika",
    unvan: "Fikrət Əmirov küçəsi 8, Bakı",
    telefon: "+994 12 555 0321",
    hekimSayi: 30,
    status: "aktiv", 
    xidmetler: ["MRT", "KT", "USM", "EKQ"]
  }
];

export default function Klinikalar() {
  const [axtar, setAxtar] = useState("");
  
  const filteredKlinikalar = klinikalar.filter(klinika =>
    klinika.ad.toLowerCase().includes(axtar.toLowerCase()) ||
    klinika.unvan.toLowerCase().includes(axtar.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Klinikalar</h1>
          <p className="text-muted-foreground mt-2">
            Qeydiyyatlı klinikalar və tibb mərkəzləri
          </p>
        </div>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Klinika
        </Button>
      </div>

      {/* Search and filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Klinika adı və ya ünvan üzrə axtarın..."
                className="pl-9"
                value={axtar}
                onChange={(e) => setAxtar(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-pharmacy-light text-pharmacy-dark">
                Ümumi: {klinikalar.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Aktiv: {klinikalar.filter(k => k.status === "aktiv").length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinics grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredKlinikalar.map((klinika) => (
          <Card key={klinika.id} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-foreground">{klinika.ad}</CardTitle>
                <Badge 
                  variant={klinika.status === "aktiv" ? "default" : "secondary"}
                  className={klinika.status === "aktiv" ? "bg-pharmacy-primary" : ""}
                >
                  {klinika.status === "aktiv" ? "Aktiv" : "Yoxlanır"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {klinika.unvan}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {klinika.telefon}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {klinika.hekimSayi} həkim
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Xidmətlər:</p>
                <div className="flex flex-wrap gap-1">
                  {klinika.xidmetler.map((xidmet) => (
                    <Badge key={xidmet} variant="outline" className="text-xs">
                      {xidmet}
                    </Badge>
                  ))}
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

      {filteredKlinikalar.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Axtarış nəticəsində klinika tapılmadı</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}