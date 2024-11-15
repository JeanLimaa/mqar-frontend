'use client'

import React from 'react';
import Link from 'next/link';
import { IconLinkProps } from './IconLink.interface';
import { usePathname } from 'next/navigation';

const IconLink: React.FC<IconLinkProps> = ({ href, icon: Icon }) => {
  const pathname: string = usePathname();
  const isActive: boolean = pathname.includes(href);
  
  return (
    <Link href={href}>
      <Icon fontSize='large' className={isActive ? "fill-slate-400" : "fill-white"} />
    </Link>
  );
};

export default IconLink;