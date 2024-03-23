export default function SubTitle({ children, className }: React.ComponentProps<'div'>) {
  return (
    <div className={`text-2xl text-purple font-bold ${className}`}>{ children }</div>
  );
}