export default function ErrorFieldForm({ className = '', text = '' }) {
  return (
    <small className={`w-full mt-1 text-red-700 ${className}`}>
      {text}
    </small>
  );
};
