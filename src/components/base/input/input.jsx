import { useTranslation } from "react-i18next";

export const CustomInput = ({
  value,
  placeholder,
  customStyles,
  handleChange,
}) => {
  const { t } = useTranslation();

  return (
    <input
      value={value}
      style={{ ...customStyles }}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      placeholder={placeholder ?? t("Base.Search")}
      className="w-full py-2 px-4 rounded-[10px] focus:outline-none bg-white"
    />
  );
};
