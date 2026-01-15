export const FightingPokemon = ({ variant = "left", pokemon }) => {
  const { name, types, movingSprite, movingBackSprite } = pokemon;

  const variants = {
    left: "bottom-10 left-50",
    right: "top-10 right-50",
  };

  return (
    <div
      className={`absolute flex flex-row justify-between gap-5 ${
        variants[variant] || variants.left
      } `}
    >
      <div className="flex flex-col gap-2 bg-white/90 px-4 py-2 rounded-lg h-fit">
        <div className="flex flex-row items-center gap-3 ">
          <span>{name}</span>
          <span className="flex gap-1.5">
            {types.map((type) => (
              <div className="w-fit h-3 border">
                <img src={type.sprite} className="size-full object-contain" />
              </div>
            ))}
          </span>
        </div>
        <div className="rounded-full h-2 border border-white bg-emerald-600"></div>
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
