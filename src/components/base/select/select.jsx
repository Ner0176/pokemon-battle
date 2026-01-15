export const CustomSelect = ({ title, value, options, handleChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {title && <span className="text-xs font-bold">{title}</span>}
      <select
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="p-2 border border-neutral-200 rounded-xl text-sm"
      >
        <option value={"-"}>-</option>
        {options}
      </select>
    </div>
  );
};
