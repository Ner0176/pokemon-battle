export const FightingPokemon = ({ pokemon, isLoser, variant = "left" }) => {
  const { name, types, movingSprite, movingBackSprite } = pokemon;

  const variants = {
    left: "bottom-10 left-50",
    right: "top-10 right-50",
  };

  const exitClass = isLoser
    ? "opacity-0 transition-opacity duration-1000 scale-50"
    : "opacity-100";
  const entryClass = "animate-in slide-in-from-bottom duration-500";

  return (
    <div
      className={`absolute flex flex-row justify-between gap-5 transition-all duration-700  
        ${variants[variant] || variants.left} ${exitClass} ${entryClass} `}
    >
      <div className="flex flex-col gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-lg h-fit">
        <div className="flex flex-row items-center gap-3">
          <span className="font-bold uppercase text-xs">{name}</span>
          <div className="flex gap-1">
            {types.map(({ name, sprite }) => (
              <img key={name} src={sprite} className="h-3" alt="Pokemon type" />
            ))}
          </div>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-emerald-500 transition-all duration-1000 ${
              isLoser ? "w-0" : "w-full"
            }`}
          />
        </div>
      </div>
      <div className="h-20 w-fit">
        <img
          className="size-full object-contain"
          src={variant === "left" ? movingBackSprite : movingSprite}
        />
      </div>
    </div>
  );
};

export const BattleTeamInfo = ({ variant = "left", teamDetails }) => {
  const { name, team } = teamDetails;

  const variants = {
    left: "left-0 justify-end",
    right: "right-0 justify-start",
  };

  return (
    <div
      className={`absolute top-0 z-20 h-full bg-white/80 flex flex-col gap-2 items-center px-4 py-3 ${
        variants[variant] || variants.left
      }`}
    >
      <span className="text-sm text-center">{name}</span>
      <div className="grid grid-cols-3 gap-1">
        {team.map(({ staticSprite }) => (
          <div className="h-10 w-fit">
            <img src={staticSprite} className="size-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};
