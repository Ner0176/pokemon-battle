import Icon from "@mdi/react";
import { capitalize } from "../../utils";
import { mdiVolumeHigh } from "@mdi/js";

const BASE_ASSETS_URL = "https://raw.githubusercontent.com/PokeAPI";

export const PokemonPreview = ({ details }) => {
  const { id, name } = details;

  const playSound = () => {
    const audio = new Audio(
      `${BASE_ASSETS_URL}/cries/main/cries/pokemon/legacy/${id}.ogg`
    );
    audio.play();
  };

  return (
    <div
      key={name}
      className="flex flex-row items-center justify-between px-6 border border-neutral-200 rounded-2xl py-3 hover:bg-neutral-50 cursor-pointer"
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-16"
          src={`${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/${id}.png`}
          onError={(e) => {
            e.currentTarget.src = `${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/0.png`;
          }}
        />
        {capitalize(name)}
      </div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          playSound();
        }}
      >
        <Icon path={mdiVolumeHigh} className="h-6" />
      </div>
    </div>
  );
};
