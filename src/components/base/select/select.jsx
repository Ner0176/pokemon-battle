export const CustomSelect = ({
  title,
  value,
  options,
  handleChange,
  customStyles,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full" style={{ ...customStyles }}>
      {title && <span className="text-xs font-bold">{title}</span>}
      <select
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="p-2 border border-neutral-200 bg-white rounded-xl text-sm"
      >
        <option value={""}>{defaultValue || "-"}</option>
        {options}
      </select>
    </div>
  );
};
