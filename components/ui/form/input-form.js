export default function InputForm({
  id,
  name,
  placeholder = '',
  type = 'text',
  onChange = '',
  value = '',
  className = '',
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`input-solid ${className}`}
    />
  );
}
