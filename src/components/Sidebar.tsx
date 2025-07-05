import React from 'react';
import { HomeIcon, LayoutDashboardIcon, FileIcon, FileTextIcon, MessageSquareIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
const Sidebar = () => {
  return <div className="w-80 bg-blue-500 text-white flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold">WeCount</h1>
      </div>
      <div className="flex flex-col items-center mt-4 mb-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <div className="w-18 h-18 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon size={40} className="text-gray-400" />
          </div>
        </div>
        <p className="mt-3 font-medium">Eric Bruyndonckx</p>
        <div className="mt-2 border border-white/30 rounded-md p-2 flex items-center w-4/5">
          <span>WeCount SA</span>
          <ChevronDownIcon size={16} className="ml-auto" />
        </div>
      </div>
      <nav className="flex-1">
        <NavItem icon={<HomeIcon size={20} />} label="Launchpad" active={false} />
        <NavItem icon={<LayoutDashboardIcon size={20} />} label="Dashboard" active={false} />
        <NavItem icon={<FileIcon size={20} />} label="Files" active={true} />
        <NavItem icon={<FileTextIcon size={20} />} label="Statements" active={false} />
        <NavItem icon={<MessageSquareIcon size={20} />} label="Messages" active={false} badge="4" />
        <NavItem icon={<SettingsIcon size={20} />} label="Settings" active={false} />
        <NavItem icon={<HelpCircleIcon size={20} />} label="Help" active={false} />
      </nav>
      <div className="p-4 mt-auto">
        <button className="flex items-center text-white opacity-80 hover:opacity-100">
          <LogOutIcon size={20} className="mr-2" />
          <span>Log Out</span>
        </button>
      </div>
    </div>;
};
const NavItem = ({
  icon,
  label,
  active,
  badge
}) => {
  return <div className={`flex items-center p-4 ${active ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
      {badge && <div className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {badge}
        </div>}
    </div>;
};
const UserIcon = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>;
export default Sidebar;