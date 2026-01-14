import { useTranslation } from "react-i18next";

export const CustomInput = ({ value, handleChange, placeholder }) => {
  const { t } = useTranslation();

  return (
    <input
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      placeholder={placeholder ?? t("Base.Search")}
      className="w-full py-2 px-4 rounded-2xl focus:outline-none bg-white"
    />
  );
};
