import { Input } from "@/components/ui/input";
import * as React from "react";

export interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClickIcon?: () => void;
}

export default function InputIcon({ icon, onClickIcon, ...props }: InputIconProps) {
  return (
    <div className="relative flex items-center w-full">
      <Input 
        {...props} 
        className={icon ? "pr-10" : ""} // Ajuste de padding se houver ícone à direita
      />
      {icon && (
        <button 
          type="button" 
          onClick={onClickIcon} 
          className="absolute right-3 text-neutral-700 focus:outline-none"
        >
          {icon}
        </button>
      )}
    </div>
  );
}
