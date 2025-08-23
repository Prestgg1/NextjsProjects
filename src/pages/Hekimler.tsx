import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MapPin, Phone, Star, Calendar, UserCheck, Upload } from "lucide-react";
import api, { DoctorCategory } from "@/lib/api";

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
  const [modalAciq, setModalAciq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState <DoctorCategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.GET('/api/admin/doctor_categories/', {})
        setCategories(response.data);
      } catch (error) {
        console.error("Kategoriyaları yükləmək mümkün deyil:", error);
      }
    };
    fetchCategories();
  }, []);
 
  const [yeniHekim, setYeniHekim] = useState({
    name: "",
    email: "",
    password: "",
    clinic: "",
    about: "",
    phone: "",
    image: null as File | null,
    finCode: "",
    gender: "",
    birthday: "",
    city: "",
    state: "",
    country: "",
    address: "",
    doctor_category_id: "",
  });
  const handleSubmit = async () => {
    try {
      setLoading(true);
   
      const formData = new FormData();
    formData.append("file", yeniHekim.image);  // File obyekti
    formData.append("upload_preset", "learnteach"); // Cloudinary dashboard-dakı preset adı

      const response = await fetch('https://api.cloudinary.com/v1_1/djfeqtwjx/image/upload', {
        method: 'POST',
        body: formData,
    });
    
    /* error: Object { message: "Upload preset must be specified when using unsigned upload" } */
    const data = await response.json();
    setYeniHekim({ ...yeniHekim, image: data.secure_url });
    console.log(data);
  } catch (error) {
    console.error("Şəkil yükləmək mümkün deyil:", error);
  }
  try {

       await api.POST("/api/admin/doctor/register",{
        body: {
          name: yeniHekim.name,
          email: yeniHekim.email,
          password: yeniHekim.password,
          clinic: yeniHekim.clinic,
          about: yeniHekim.about,
          phone: yeniHekim.phone,
          image: yeniHekim.image?.toString(),
          finCode: yeniHekim.finCode,
          gender: yeniHekim.gender as "male" | "female",
          birthday: yeniHekim.birthday,
          city: yeniHekim.city,
          state: yeniHekim.state,
          country: yeniHekim.country,
          address: yeniHekim.address,
          doctor_category_id: Number(yeniHekim.doctor_category_id),
        },
       
      });

      console.log("Yeni həkim əlavə edildi:", yeniHekim);
      setModalAciq(false);
      setYeniHekim({
        name: "",
        email: "",
        password: "",
        clinic: "",
        about: "",
        phone: "",
        image: null,
        finCode: "",
        gender: "",
        birthday: "",
        city: "",
        state: "",
        country: "",
        address: "",
        doctor_category_id: "",
      });
    } catch (error) {
      console.error("Həkim əlavə edilə bilmədi:", error);
    } finally {
      setLoading(false);
    }
  };
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
        <Dialog open={modalAciq} onOpenChange={setModalAciq}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Həkim
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Həkim Əlavə Et</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Ad Soyad */}
          <div className="grid gap-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              value={yeniHekim.name}
              onChange={(e) => setYeniHekim({ ...yeniHekim, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={yeniHekim.email}
              onChange={(e) => setYeniHekim({ ...yeniHekim, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Şifrə</Label>
            <Input
              id="password"
              type="password"
              value={yeniHekim.password}
              onChange={(e) => setYeniHekim({ ...yeniHekim, password: e.target.value })}
            />
          </div>

          {/* Telefon */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={yeniHekim.phone}
              onChange={(e) => setYeniHekim({ ...yeniHekim, phone: e.target.value })}
            />
          </div>

          {/* Şəkil */}
          <div className="grid gap-2">
            <Label htmlFor="image">Şəkil</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setYeniHekim({ ...yeniHekim, image: e.target.files?.[0] || null })
              }
            />
          </div>

          {/* FİN kod */}
          <div className="grid gap-2">
            <Label htmlFor="finCode">FİN Kodu</Label>
            <Input
              id="finCode"
              value={yeniHekim.finCode}
              onChange={(e) => setYeniHekim({ ...yeniHekim, finCode: e.target.value })}
            />
          </div>

          {/* Gender */}
          <div className="grid gap-2">
            <Label>Cinsiyyət</Label>
            <Select
              value={yeniHekim.gender}
              onValueChange={(val) => setYeniHekim({ ...yeniHekim, gender: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Kişi</SelectItem>
                <SelectItem value="female">Qadın</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Birthday */}
          <div className="grid gap-2">
            <Label htmlFor="birthday">Doğum tarixi</Label>
            <Input
              id="birthday"
              type="date"
              value={yeniHekim.birthday}
              onChange={(e) => setYeniHekim({ ...yeniHekim, birthday: e.target.value })}
            />
          </div>

          {/* Clinic */}
          <div className="grid gap-2">
            <Label htmlFor="clinic">Klinika</Label>
            <Input
              id="clinic"
              value={yeniHekim.clinic}
              onChange={(e) => setYeniHekim({ ...yeniHekim, clinic: e.target.value })}
            />
          </div>

          {/* About */}
          <div className="grid gap-2">
            <Label htmlFor="about">Haqqında</Label>
            <Input
              id="about"
              value={yeniHekim.about}
              onChange={(e) => setYeniHekim({ ...yeniHekim, about: e.target.value })}
            />
          </div>

          {/* Adres */}
          <div className="grid gap-2">
            <Label htmlFor="address">Ünvan</Label>
            <Input
              id="address"
              value={yeniHekim.address}
              onChange={(e) => setYeniHekim({ ...yeniHekim, address: e.target.value })}
            />
          </div>

          {/* City / State / Country */}
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Şəhər"
              value={yeniHekim.city}
              onChange={(e) => setYeniHekim({ ...yeniHekim, city: e.target.value })}
            />
            <Input
              placeholder="Rayon"
              value={yeniHekim.state}
              onChange={(e) => setYeniHekim({ ...yeniHekim, state: e.target.value })}
            />
            <Input
              placeholder="Ölkə"
              value={yeniHekim.country}
              onChange={(e) => setYeniHekim({ ...yeniHekim, country: e.target.value })}
            />
          </div>

          {/* İxtisas (category select) */}
          <div className="grid gap-2">
            <Label htmlFor="doctor_category_id">İxtisas</Label>
            <Select
              value={yeniHekim.doctor_category_id}
              onValueChange={(val) => setYeniHekim({ ...yeniHekim, doctor_category_id: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModalAciq(false)}>Ləğv et</Button>
          <Button 
            className="bg-gradient-pharmacy hover:opacity-90 text-primary-foreground"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Yüklənir..." : "Əlavə et"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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