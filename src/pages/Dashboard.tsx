import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, UserCheck, Store, Activity } from "lucide-react";

const stats = [
  {
    title: "Ümumi Klinikalar",
    value: "24",
    change: "+2.5%",
    icon: Building2,
    color: "text-pharmacy-primary"
  },
  {
    title: "Aktiv Həkimlər", 
    value: "156",
    change: "+5.2%",
    icon: UserCheck,
    color: "text-pharmacy-secondary"
  },
  {
    title: "Qeydiyyatlı Apteklər",
    value: "89",
    change: "+1.8%", 
    icon: Store,
    color: "text-pharmacy-accent"
  },
  {
    title: "Günlük Fəaliyyət",
    value: "1,234",
    change: "+12.3%",
    icon: Activity,
    color: "text-pharmacy-dark"
  }
];

const recentActivities = [
  { action: "Yeni həkim qeydiyyatı", user: "Dr. Əli Məmmədov", time: "5 dəqiqə əvvəl" },
  { action: "Klinika məlumatları yeniləndi", user: "Mərkəzi Klinika", time: "15 dəqiqə əvvəl" },
  { action: "Apteka statusu yeniləndi", user: "Sağlamlıq Apteki", time: "30 dəqiqə əvvəl" },
  { action: "Yeni eczaçı qeydiyyatı", user: "Günay Həsənova", time: "1 saat əvvəl" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">İdarə Paneli</h1>
        <p className="text-muted-foreground mt-2">
          SefatApp sistem statistikaları və ümumi məlumatlar
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-pharmacy transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-pharmacy-accent">
                {stat.change} son aydan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Son Fəaliyyətlər</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Tez Əməliyyatlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left hover:bg-accent transition-colors">
                <Building2 className="h-5 w-5 text-pharmacy-primary" />
                <div>
                  <p className="font-medium text-foreground">Yeni Klinika</p>
                  <p className="text-sm text-muted-foreground">Klinika əlavə et</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left hover:bg-accent transition-colors">
                <UserCheck className="h-5 w-5 text-pharmacy-secondary" />
                <div>
                  <p className="font-medium text-foreground">Həkim Qeydiyyatı</p>
                  <p className="text-sm text-muted-foreground">Yeni həkim əlavə et</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left hover:bg-accent transition-colors">
                <Store className="h-5 w-5 text-pharmacy-accent" />
                <div>
                  <p className="font-medium text-foreground">Apteka Qeydiyyatı</p>
                  <p className="text-sm text-muted-foreground">Yeni apteka əlavə et</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}