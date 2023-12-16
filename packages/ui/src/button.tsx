'use client';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  appName: string;
}

export function Button({ children, className }: ButtonProps): JSX.Element {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
