import Icon from "@mdi/react";
import { mdiPlus, mdiVolumeHigh } from "@mdi/js";
import { useSearchParams } from "react-router-dom";
import {
  pkmPreviewContainer,
  teamPreviewBoxContainer,
} from "./team-builder.styled";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const BASE_ASSETS_URL = "https://raw.githubusercontent.com/PokeAPI";

export const PokemonPreview = ({ details }) => {
  const { id, name } = details;

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const playSound = () => {
    const audio = new Audio(
      `${BASE_ASSETS_URL}/cries/main/cries/pokemon/legacy/${id}.ogg`
    );
    audio.play();
  };

  return (
    <div className={pkmPreviewContainer}>
      <div className="flex flex-row items-center gap-2">
        {!isImgLoaded && (
          <Skeleton style={{ width: 32, height: 32, borderRadius: 8 }} />
        )}
        <img
          loading="lazy"
          onLoad={() => setIsImgLoaded(true)}
          className="h-14 aspect-square object-contain"
          src={`${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/${id}.png`}
          onError={(e) => {
            e.currentTarget.src = `${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/0.png`;
          }}
        />
        <span className="first-letter:uppercase">{name}</span>
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

  const handleTeamIdParam = ({ teamId }) => {
    setSearchParams((params) => {
      teamId ? params.set("id", teamId) : params.delete("id");
      return params;
    });
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto p-1">
      <div onClick={handleTeamIdParam} className={teamPreviewBoxContainer}>
        <Icon path={mdiPlus} className="size-4" />
      </div>
      {pokemonTeams.map((item) => {
        const isSelected =
          item.id === selectedTeamId
            ? { borderColor: "#00bc7d", backgroundColor: "#ecfdf5" }
            : {};
        return (
          <div
            key={item.id}
            style={isSelected}
            onClick={() => handleTeamIdParam({ teamId: item.id })}
            className={`${teamPreviewBoxContainer} px-2 shrink-0`}
          >
            <div className="h-1/2 w-full flex items-center justify-center mb-1">
              <img
                alt={item.name}
                src={item.team[0].staticSprite}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-sm truncate w-full text-center px-1">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
