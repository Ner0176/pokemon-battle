import { capitalize } from "../../../utils";

export const SelectedPokemon = ({ action, pokemon }) => {
  const { name, types, stats, movingSprite } = pokemon;

  const statAbbreviations = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPE",
  };

  return (
    <div
      key={name}
      style={{
        backgroundColor: action === "delete" && "#fef2f2",
        borderColor: action === "delete" ? "#fb2c36" : "#e5e5e5",
      }}
      className="relative flex flex-row items-center justify-between px-6 border rounded-2xl py-3 hover:bg-neutral-50 cursor-pointer shadow-sm"
    >
      <div className="flex flex-row items-center gap-2">
        <img className="size-full" src={movingSprite} />
        <div className="flex flex-col gap-3">
          {capitalize(name)}
          <div>{types[0]}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((item) => (
          <span key={item.name} className="text-xs">
            {statAbbreviations[item.name]}: {item.score}
          </span>
        ))}
      </div>
    </div>
  );
};
