export default function SelectForm({
  id,
  name,
  defaultValue = '',
  onChange = '',
  className = '',
  textOptionDefault = '',
  children
}) {
  return (
    <select
      onChange={onChange}
      defaultValue=""
      name={name}
      id={id}
      className={`select-solid ${className}`}
    >
      <option value="" disabled>
        {textOptionDefault}
      </option>

      {children}
    </select>
  );
}
