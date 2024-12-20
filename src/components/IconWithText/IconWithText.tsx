import React from 'react';
import { IconWithTextProps } from './IconWithText.interface';

const IconWithText: React.FC<IconWithTextProps> = ({ icon: Icon, title, value, unit }) => {
  return (
    <div className="flex gap-1">
      <Icon />
      <div>
        <h3 className='text-base'>{title}</h3>
        <p className="text-gray-300 text-sm max-sm:text-xs max-[490px]:text-sm">{value || "Não está recebendo dados."} {value && unit}</p>
      </div>
    </div>
  );
};

export default IconWithText;