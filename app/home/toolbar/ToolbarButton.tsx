import { ReactNode } from 'react';

interface ToolbarButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-200 rounded-full transition-colors"
      aria-label="Toolbar button"
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;
