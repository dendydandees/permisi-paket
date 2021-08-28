export default function Label({ text, htmlFor, className = 'sr-only' }) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
}
