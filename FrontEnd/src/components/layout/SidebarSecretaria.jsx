import React, { useState } from "react";
import {
  Home,
  FileText,
  CreditCard,
  Menu,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SettingsMenu from "@/components/common/SettingsMenu";

export default function SidebarSecretaria() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: Home, label: "Home", path: "/secretaria" },
    { icon: FileText, label: "Médicos", path: "/secretaria/medicos" },
    { icon: CreditCard, label: "Facturación", path: "/secretaria/facturacion" },
  ];

  return (
    <div
      className={`relative bg-gradient-to-b from-white via-[#2e3192] to-[#03aced]
        flex flex-col items-center transition-all duration-300
        ${isOpen ? "w-[200px]" : "w-[80px]"} h-screen`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="text-black mt-4 mb-6">
        <Menu className="h-6 w-6" />
      </button>

      <nav className="flex flex-col gap-4 w-full">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isOpen={isOpen}
            isActive={
              item.path === "/secretaria"
                ? location.pathname === "/secretaria"
                : location.pathname.startsWith(item.path)
            }
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      <div className="mt-auto mb-6 w-full flex justify-center">
        <button onClick={() => setShowSettings(!showSettings)}>
          <Settings className="w-7 h-7 text-black" />
        </button>
      </div>

      <SettingsMenu visible={showSettings} />
    </div>
  );
}