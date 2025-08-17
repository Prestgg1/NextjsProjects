import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  UserCheck, 
  Store, 
  Menu, 
  X,
  LayoutDashboard,
  Users,
  ShoppingCart,
  LogOut,
  Stethoscope
} from "lucide-react";

const sidebarItems = [
  {
    title: "İdarə Paneli",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Klinikalar",
    href: "/klinikalar",
    icon: Building2,
  },
  {
    title: "Həkimlər", 
    href: "/hekimler",
    icon: UserCheck,
  },
  {
    title: "İxtisaslar",
    href: "/ixtisaslar", 
    icon: Stethoscope,
  },
  {
    title: "Apteklər",
    href: "/aptekler",
    icon: Store,
  },
  {
    title: "Müştərilər",
    href: "/musteriler", 
    icon: Users,
  },
  {
    title: "Şifarişlər",
    href: "/sifarisler",
    icon: ShoppingCart,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const AdminLayout = ({ children, onLogout }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 transform bg-card border-r shadow-pharmacy transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 bg-gradient-pharmacy">
            <h1 className="text-xl font-bold text-primary-foreground">
              SefatApp Admin
            </h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary-foreground hover:bg-white/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-pharmacy-accent" />
              <span>ŞəfaTapp İdarə sistemi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 shadow-card">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Salam, Administrator
            </div>
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıxış
              </Button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};