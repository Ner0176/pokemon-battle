import Icon from "@mdi/react";
import { useState } from "react";
import { mdiTrashCanOutline } from "@mdi/js";

export const SelectedPokemon = ({ pokemon, handleDelete }) => {
  const { id, name, types, stats, movingSprite } = pokemon;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-row items-center justify-between px-6 border border-neutral-200 rounded-2xl py-4 bg-white hover:bg-neutral-50 cursor-pointer shadow-sm"
    >
      <div className="flex flex-row items-center gap-2">
        <img className="h-14 aspect-square object-contain" src={movingSprite} />
        <div className="flex flex-col gap-3 first-letter:uppercase">
          {name}
          <div className="flex flex-row gap-1">
            {types.map((type) => (
              <div key={type.name} className="w-fit h-3.75 border">
                <img src={type.sprite} className="size-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {stats.map((item) => (
          <span key={item.name} className="text-xs">
            <span className="font-bold">{item.name}:</span> {item.score}
          </span>
        ))}
      </div>
      {isHovered && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          className="absolute top-2 left-2 z-30 cursor-pointer"
        >
          <Icon path={mdiTrashCanOutline} className="size-4 text-red-500" />
        </div>
      )}
    </div>
  );
};
