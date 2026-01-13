import Icon from "@mdi/react";
import { capitalize } from "../../utils";
import { mdiVolumeHigh } from "@mdi/js";

export const PokemonPreview = ({ details }) => {
  const { id, name } = details;

  const playSound = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        {capitalize(name)}
      </div>
      <div className="cursor-pointer" onClick={playSound}>
        <Icon path={mdiVolumeHigh} className="h-6" />
      </div>
    </div>
  );
};

export const SelectedPokemon = ({ action, pokemon }) => {
  const { id, name, types, stats } = pokemon;

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
        <img
          className="size-full"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
        />
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
