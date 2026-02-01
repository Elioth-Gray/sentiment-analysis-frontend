/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, LogOut } from 'lucide-react';
import UserAvatar from './Avatar';
import { Button } from '../ui/button';
import LogoTutWuri from '@/assets/logo-tut-removebg.png';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const user = {
    username: 'reyy1234',
    email: 'rheinaldy@protescope.go.id',
    avatar: null,
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-full bg-slate-900 text-slate-100 transition-all ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3 justify-center">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 p-1">
          <img
            className="w-auto max-h-12"
            src={LogoTutWuri}
            alt="Tut Wuri Logo"
          />
        </div>
        {isOpen && (
          <div>
            <h1 className="font-bold">SNPMB</h1>
            <p className="text-xs text-slate-400">Monitoring System</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="p-3 space-y-2">
        <NavItem to="/dashboard" icon={LayoutDashboard} isOpen={isOpen}>
          Dashboard
        </NavItem>
        <NavItem to="/posts" icon={MessageSquare} isOpen={isOpen}>
          Posts
        </NavItem>
      </nav>

      {/* User */}
      <div className="absolute bottom-0 w-full p-3 border-t border-white/10">
        <div className="flex items-center justify-center gap-3">
          <UserAvatar name={user.username} size={isOpen ? 'md' : 'sm'} />

          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-100 truncate">
                {user.username}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          )}
        </div>

        <Button
          variant={'ghost'}
          className="mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="font-medium">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon: Icon, children, isOpen }: any) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group flex items-center gap-3 px-3 py-3 rounded-lg
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
        }
        `
      }
    >
      <Icon
        className="
          w-5 h-5 shrink-0
          transition-transform duration-200
          group-hover:scale-110
        "
      />

      {isOpen && (
        <span
          className="
            transition-all duration-200
            group-hover:translate-x-0.5
          "
        >
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;
