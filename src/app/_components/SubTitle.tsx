export default function SubTitle({ children, className }: React.ComponentProps<'div'>) {
  return (
    <div className={`text-xl text-default font-bold md:text-2xl ${className}`}>{ children }</div>
  );
}