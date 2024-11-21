import * as React from 'react';

import { cn } from '@/lib/utils';
import useScrollLock from '@/hooks/useScrollLock';

const Modal = ({
  className,
  children,
  visible,
}: {
  className?: string;
  children: React.ReactNode;
  visible: boolean;
}) => {
  useScrollLock(visible);
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-black/80 flex justify-center items-center overflow-auto',
        !visible && 'hidden',
        className
      )}>
      {children}
    </div>
  );
};

export default Modal;
