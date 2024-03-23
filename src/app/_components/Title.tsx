export default function Title({ children, className }: React.ComponentProps<'div'>) {
  return (
    <div className={`text-3xl text-purple font-bold ${className}`}>{ children }</div>
  );
}