import ToolbarButton from './ToolbarButton';
import { CubeIcon, PencilIcon, UserCircleIcon, AdjustmentsHorizontalIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Toolbar = () => {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm">
      <ToolbarButton icon={<CubeIcon className="w-6 h-6 text-green-600" />} /> {/* Icone Logo */}
      <ToolbarButton icon={<PencilIcon className="w-6 h-6 text-gray-800" />} /> {/* Icone Edit */}
      <ToolbarButton icon={<UserCircleIcon className="w-6 h-6 text-gray-800" />} /> {/* Icone Profile */}
      <div className="w-[1px] h-6 bg-gray-300" /> {/* Ligne de séparation */}
      <ToolbarButton icon={<AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-800" />} /> {/* Icone Filter */}
      <ToolbarButton icon={<ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-800" />} /> {/* Icone Logout */}
    </div>
  );
};

export default Toolbar;
