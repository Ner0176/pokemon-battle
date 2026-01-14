import Icon from "@mdi/react";
import { capitalize } from "../../utils";
import { mdiVolumeHigh } from "@mdi/js";
import { useSearchParams } from "react-router-dom";

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
      className="flex flex-row items-center justify-between px-6 border border-neutral-200 bg-white rounded-2xl py-3 hover:bg-neutral-50 cursor-pointer"
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

export const TeamsPreview = ({ selectedTeamId, pokemonTeams }) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col gap-3">
      {pokemonTeams.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              setSearchParams((params) => {
                params.set("id", item.id);
                return params;
              });
            }}
            style={{
              borderColor: item.id === selectedTeamId ? "purple" : undefined,
            }}
            className="flex flex-col items-center justify-center size-20 bg-white border border-neutral-200 rounded-lg cursor-pointer"
          >
            <img className="size-10" src={item.team[0].staticSprite} />
            <span className="text-sm">{item.name}</span>
          </div>
        );
      })}
      <div
        onClick={() => {
          setSearchParams((params) => {
            params.delete("id");
            return params;
          });
        }}
        className="flex items-center justify-center size-20 bg-white border border-neutral-200 rounded-lg cursor-pointer"
      >
        +
      </div>
    </div>
  );
};
