import { toast } from 'sonner';

type PositionProps =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const toastTypes = ['success', 'error', 'info', 'warning'] as const;

type ToastType = (typeof toastTypes)[number];

type Sonner = {
  [K in ToastType]: (msg: string, description?: string, pos?: PositionProps) => void;
};

const sonner = {} as Sonner;

toastTypes.forEach((type) => {
  sonner[type] = (msg, description, pos = 'top-right') => {
    toast[type](msg, {
      description,
      position: pos,
    });
  };
});

export default sonner;
