import { capitalize } from "../../../utils";

export const SelectedPokemon = ({ action, pokemon }) => {
  const { name, types, stats, movingSprite } = pokemon;

  return (
    <div
      key={name}
      style={{
        backgroundColor: action === "delete" && "#fef2f2",
        borderColor: action === "delete" ? "#fb2c36" : "#e5e5e5",
      }}
      className="relative flex flex-row items-center justify-between px-6 border rounded-2xl py-3 bg-white hover:bg-neutral-50 cursor-pointer shadow-sm"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="h-14 w-fit">
          <img className="size-full object-contain" src={movingSprite} />
        </div>
        <div className="flex flex-col gap-3">
          {capitalize(name)}
          <div className="flex flex-row gap-1">
            {types.map((type) => (
              <div className="w-fit h-[15px] border">
                <img src={type.sprite} className="size-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {stats.map((item) => (
          <span key={item.name} className="text-xs">
            <span className="font-bold">{item.name}:</span> {item.score}
          </span>
        ))}
      </div>
    </div>
  );
};
