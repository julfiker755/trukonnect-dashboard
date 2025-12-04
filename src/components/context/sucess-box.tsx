'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CloseBtn } from '../reuseable/btn';
import sucessImg from '@/assets/sucess.gif';
import { ImgBox } from '../reuseable/Img-box';

/* =======================
   ✅ Types
======================= */
interface SuccessModalState {
  open: boolean;
  title: string;
  subTitle?: string;
  description: string;
  className?: string;
  titleStyle?: string;
  descriptionStyle?: string;
}

type SuccessModalOptions = Partial<Omit<SuccessModalState, 'open'>>;

interface SuccessModalContextType {
  openSucc: (options?: SuccessModalOptions) => Promise<{ close: () => void }>;
}

interface SuccessModalProviderProps {
  children: ReactNode;
}

/* =======================
   ✅ Default Modal State
======================= */
const initialModalState: SuccessModalState = {
  open: false,
  title: 'Successfull!',
  description: 'Operation completed successfully.',
  className: '',
  titleStyle: '',
  descriptionStyle: '',
};

/* =======================
   ✅ Context
======================= */
const SuccessModalContext = createContext<SuccessModalContextType | undefined>(undefined);

/* =======================
   ✅ Provider
======================= */
export const SuccessModalProvider = ({ children }: SuccessModalProviderProps) => {
  const [modalState, setModalState] = useState<SuccessModalState>(initialModalState);

  const close = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  const openSucc = (options: SuccessModalOptions = {}): Promise<{ close: () => void }> => {
    return new Promise((resolve) => {
      setModalState({
        ...initialModalState,
        ...options,
        open: true,
      });

      resolve({ close });
    });
  };

  return (
    <SuccessModalContext.Provider value={{ openSucc }}>
      {children}

      <Dialog open={modalState.open} onOpenChange={close}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            'sm:max-w-xs p-4 gap-0 bg-background modal-shadow1 rounded-2xl overflow-hidden border-none',
            modalState.className
          )}
        >
          <DialogHeader className="hidden">
            <DialogTitle>{modalState.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="hidden">{modalState.description}</DialogDescription>

          <div className="space-y-2">
            <ImgBox src={sucessImg} alt="sucessImg" className="w-[110px] h-[100px] mx-auto" />

            <h1 className={cn('text-2xl font-medium text-center', modalState.titleStyle)}>
              {modalState.title}
            </h1>

            <h2 className={cn('text-figma-gray text-center', modalState.descriptionStyle)}>
              {modalState.description}
            </h2>

            <CloseBtn onClose={close} />
          </div>
        </DialogContent>
      </Dialog>
    </SuccessModalContext.Provider>
  );
};

/* =======================
   ✅ Hook
======================= */
export default function useSuccessModal(): SuccessModalContextType {
  const context = useContext(SuccessModalContext);
  if (!context) {
    throw new Error('useSuccessModal must be used within a SuccessModalProvider');
  }
  return context;
}
