import Icon from "@mdi/react";
import { useState } from "react";
import { mdiTrashCanOutline } from "@mdi/js";
import { selectedPkmContainer } from "./team.styled";
import Skeleton from "react-loading-skeleton";
import { useWindowWidth } from "../../../hooks";

export const DisplayStats = ({ stats, fontSize = 10 }) => {
  const width = useWindowWidth();

  return Object.entries(stats).map(([key, value]) => (
    <span
      key={key}
      style={{ fontSize: width < 1280 ? fontSize - 2 : fontSize }}
    >
      <span className="font-bold">{key}:</span> {value}
    </span>
  ));
};

export const SelectedPokemon = ({ pokemon, handleDelete }) => {
  const { id, name, types, stats, movingSprite } = pokemon;

  const [isLoadingGif, setIsLoadingGif] = useState(true);

  return (
    <div key={name} className={selectedPkmContainer}>
      <div className="flex flex-row items-center gap-2">
        <div className="relative size-16 xl:size-20 flex items-center justify-center shrink-0 bg-gray-50 rounded-full border border-gray-100 p-2">
          {isLoadingGif && (
            <Skeleton style={{ width: 35, height: 35, borderRadius: 12 }} />
          )}
          <img
            alt={name}
            loading="lazy"
            src={movingSprite}
            onLoad={() => setIsLoadingGif(false)}
            style={{ imageRendering: "pixelated" }}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 xl:gap-3 first-letter:uppercase">
          <span className="text-sm xl:text-base">{name}</span>
          <div className="flex flex-col xl:flex-row gap-1">
            {types.map((type) => (
              <div
                key={type.name}
                className="w-fit h-2.5 xl:h-3 2xl:h-3.75 border"
              >
                <img src={type.sprite} className="size-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <DisplayStats stats={stats} fontSize={12} />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
        aria-label="delete pokemon from team"
        className="absolute top-2 left-2 z-30 cursor-pointer hidden group-hover:block"
      >
        <Icon
          path={mdiTrashCanOutline}
          className="size-3 xl:size-4 text-red-500"
        />
      </button>
    </div>
  );
};
