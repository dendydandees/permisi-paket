export default function ButtonPrimary({ text, type = 'button', className = '' }) {
  return (
    <button type={type} className={`btn-primary block ${className}`}>
      {text}
    </button>
  );
}
