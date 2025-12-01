import { toast } from 'sonner';

type PositionProps =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type SonnerProps<T extends string> = {
  [K in T]: (msg: string, description?: string, pos?: PositionProps) => void;
};

const toastTypes = ['success', 'error', 'info', 'warning'] as const;

const sonner: SonnerProps<(typeof toastTypes)[number]> = {} as any;

toastTypes.forEach((type) => {
  sonner[type] = (msg: string, description?: string, pos: PositionProps = 'top-right') => {
    (
      toast[type as keyof typeof toast] as (
        msg: string,
        options?: { description?: string; position?: PositionProps }
      ) => void
    )(msg, {
      description,
      position: pos,
    });
  };
});

export default sonner;
