export default function ReviewFormInput({ className, type, placeholder, disabled }: React.ComponentProps<'input'>) {
  return (
    <input
      className={`w-full border-b-[1.5px] border-gray p-3 outline-none ${className}`}
      type={type ? type : "text"}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}