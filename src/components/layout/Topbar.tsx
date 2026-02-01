import { Menu, X, Instagram } from 'lucide-react';
import { Button } from '../ui/button';

const Topbar = ({
  name,
  isSidebarOpen,
  toggleSidebar,
}: {
  name: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between">
      <div className="flex items-center gap-3">
        <Button variant={'ghost'} onClick={toggleSidebar}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
        <h2 className="font-semibold text-slate-800">{name}</h2>
      </div>

      <div className="flex px-3 items-center gap-x-3">
        <h3 className="font-semibold">@snpmb_id</h3>
        <a
          href="https://www.instagram.com/snpmb_id/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
      </div>
    </header>
  );
};

export default Topbar;
