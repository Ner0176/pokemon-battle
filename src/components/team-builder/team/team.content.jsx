import Icon from "@mdi/react";
import { useState } from "react";
import { mdiTrashCanOutline } from "@mdi/js";
import { selectedPkmContainer } from "./team.styled";

export const DisplayStats = ({ stats, fontSize = 10 }) => {
  return Object.entries(stats).map(([key, value]) => (
    <span key={key} style={{ fontSize }}>
      <span className="font-bold">{key}:</span> {value}
    </span>
  ));
};

export const SelectedPokemon = ({ pokemon, handleDelete }) => {
  const { id, name, types, stats, movingSprite } = pokemon;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={name}
      className={selectedPkmContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <DisplayStats stats={stats} fontSize={12} />
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
