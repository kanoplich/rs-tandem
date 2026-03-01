type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FormItem = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};
