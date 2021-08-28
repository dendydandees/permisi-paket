export default function Link({
  href = '/',
  target = '',
  className = '',
  text = '',
}) {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`no-underline hover:underline ${className}`}
    >
      {text}
    </a>
  );
}
