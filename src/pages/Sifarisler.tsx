import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, User, Package, ShoppingCart, Eye } from "lucide-react";

const sifarisler = [
  {
    id: "SIF001",
    musteri: "Əli Həsənov",
    mehsullar: [
      { ad: "Paracetamol 500mg", miqdar: 2, qiymet: 15.50 },
      { ad: "İbuprofen 400mg", miqdar: 1, qiymet: 12.30 }
    ],
    toplam: 43.30,
    tarix: "2024-03-15T10:30:00",
    apteka: "Sağlamlıq Apteki",
    status: "tamamlandı",
    ödəniş: "nağd"
  },
  {
    id: "SIF002", 
    musteri: "Günel Məmmədova",
    mehsullar: [
      { ad: "Aspirin 100mg", miqdar: 3, qiymet: 8.90 },
      { ad: "Vitamin D3", miqdar: 1, qiymet: 25.40 }
    ],
    toplam: 52.10,
    tarix: "2024-03-15T14:15:00",
    apteka: "Mərkəzi Eczaxana",
    status: "gözləyir",
    ödəniş: "kart"
  },
  {
    id: "SIF003",
    musteri: "Rəşad Əliyev", 
    mehsullar: [
      { ad: "Antibiotik krem", miqdar: 1, qiymet: 18.75 },
      { ad: "Termometr", miqdar: 1, qiymet: 35.00 }
    ],
    toplam: 53.75,
    tarix: "2024-03-14T16:45:00",
    apteka: "Dərman Dünyası",
    status: "ləğv edildi",
    ödəniş: "kart"
  },
  {
    id: "SIF004",
    musteri: "Səbinə Qurbanova",
    mehsullar: [
      { ad: "Qan təzyiqi ölçən", miqdar: 1, qiymet: 85.00 },
      { ad: "Qan şəkəri test lenti", miqdar: 1, qiymet: 22.50 }
    ],
    toplam: 107.50,
    tarix: "2024-03-14T11:20:00",
    apteka: "Aile Apteki",
    status: "tamamlandı",
    ödəniş: "nağd"
  },
  {
    id: "SIF005",
    musteri: "Elxan Bayramov",
    mehsullar: [
      { ad: "Öskürək şərbəti", miqdar: 2, qiymet: 16.20 },
      { ad: "Nazal spreyi", miqdar: 1, qiymet: 14.80 }
    ],
    toplam: 47.20,
    tarix: "2024-03-13T09:10:00",
    apteka: "Express Eczaxana",
    status: "hazırlanır",
    ödəniş: "kart"
  },
  {
    id: "SIF006",
    musteri: "Nigar Süleymanova",
    mehsullar: [
      { ad: "Multivitamin", miqdar: 1, qiymet: 45.60 },
      { ad: "Omega-3", miqdar: 1, qiymet: 38.90 }
    ],
    toplam: 84.50,
    tarix: "2024-03-13T13:30:00",
    apteka: "Vita Apteki",
    status: "tamamlandı",
    ödəniş: "nağd"
  }
];

export default function Sifarisler() {
  const [axtar, setAxtar] = useState("");
  
  const filteredSifarisler = sifarisler.filter(sifaris =>
    sifaris.id.toLowerCase().includes(axtar.toLowerCase()) ||
    sifaris.musteri.toLowerCase().includes(axtar.toLowerCase()) ||
    sifaris.apteka.toLowerCase().includes(axtar.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "tamamlandı":
        return "bg-green-100 text-green-800";
      case "gözləyir":
        return "bg-yellow-100 text-yellow-800";
      case "hazırlanır":
        return "bg-blue-100 text-blue-800";
      case "ləğv edildi":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentBadge = (odenis: string) => {
    return odenis === "nağd" ? 
      "bg-pharmacy-light text-pharmacy-dark" : 
      "bg-blue-50 text-blue-700";
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Şifarişlər</h1>
          <p className="text-muted-foreground mt-2">
            Müştəri sifarişləri və onların statusları
          </p>
        </div>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Sifariş
        </Button>
      </div>

      {/* Search and stats */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sifariş ID, müştəri və ya apteka üzrə axtarın..."
                className="pl-9"
                value={axtar}
                onChange={(e) => setAxtar(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-pharmacy-light text-pharmacy-dark">
                Ümumi: {sifarisler.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Tamamlandı: {sifarisler.filter(s => s.status === "tamamlandı").length}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Gözləyir: {sifarisler.filter(s => s.status === "gözləyir").length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders list */}
      <div className="space-y-4">
        {filteredSifarisler.map((sifaris) => (
          <Card key={sifaris.id} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-lg text-foreground">Sifariş #{sifaris.id}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <User className="h-4 w-4" />
                      {sifaris.musteri}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(sifaris.status)}>
                    {sifaris.status === "tamamlandı" ? "Tamamlandı" :
                     sifaris.status === "gözləyir" ? "Gözləyir" :
                     sifaris.status === "hazırlanır" ? "Hazırlanır" : "Ləğv edildi"}
                  </Badge>
                  <Badge variant="outline" className={getPaymentBadge(sifaris.ödəniş)}>
                    {sifaris.ödəniş === "nağd" ? "Nağd" : "Kart"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(sifaris.tarix).toLocaleString('az-AZ')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    {sifaris.apteka}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-pharmacy-primary">{sifaris.toplam} ₼</div>
                  <div className="text-sm text-muted-foreground">{sifaris.mehsullar.length} məhsul</div>
                </div>
              </div>

              {/* Products list */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-foreground mb-2">Sifarişdəki məhsullar:</h4>
                <div className="space-y-1">
                  {sifaris.mehsullar.map((mehsul, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {mehsul.ad} x{mehsul.miqdar}
                      </span>
                      <span className="font-medium">{mehsul.qiymet} ₼</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Təfərrüatlar
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-pharmacy-primary">
                  Status dəyiş
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSifarisler.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Axtarış nəticəsində sifariş tapılmadı</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}