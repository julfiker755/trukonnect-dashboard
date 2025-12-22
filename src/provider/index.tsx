'use client';
import { ConfirmDialogProvider } from '@/components/context/delete-modal';
import { SuccessModalProvider } from '@/components/context/sucess-box';
import { Provider as ReduxProvider } from 'react-redux';
import { childrenProps } from '@/types';
import React from 'react';
import { Toaster } from 'sonner';
import { store } from '@/redux/store';
import { AuthRole } from '@/components/context/auth';

export default function Provider({ children }: childrenProps) {

  return (
    <ReduxProvider store={store}>
      <AuthRole>
        <SuccessModalProvider>
          <ConfirmDialogProvider>
            {children}
            <Toaster
              toastOptions={{
                style: {
                  background: 'rgba(29, 29, 29, 0.20)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(48px)',
                },
                classNames: {
                  description: '!text-white',
                  icon: '!text-green-300',
                },
              }}
              position="top-right"
            />
          </ConfirmDialogProvider>
        </SuccessModalProvider>
      </AuthRole>

    </ReduxProvider>
  );
}
