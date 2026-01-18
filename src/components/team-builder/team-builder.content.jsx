import Icon from "@mdi/react";
import { mdiPlus, mdiVolumeHigh } from "@mdi/js";
import { useSearchParams } from "react-router-dom";
import {
  pkmPreviewContainer,
  teamPreviewBoxContainer,
} from "./team-builder.styled";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { CustomButton, Modal } from "../base";
import { useRef } from "react";

const BASE_ASSETS_URL = "https://raw.githubusercontent.com/PokeAPI";

export const PokemonPreview = ({ details }) => {
  const { id, name } = details;

  const audioRef = useRef(null);

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(
      `${BASE_ASSETS_URL}/cries/main/cries/pokemon/legacy/${id}.ogg`,
    );
    audioRef.current.play();
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
          className="h-10 xl:h-14 object-contain drop-shadow-sm"
          src={`${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/${id}.png`}
          onError={(e) => {
            e.currentTarget.src = `${BASE_ASSETS_URL}/sprites/master/sprites/pokemon/0.png`;
          }}
        />
        <span className="text-sm xl:text-base 2xl:text-[17px] first-letter:uppercase">
          {name}
        </span>
      </div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          playSound();
        }}
      >
        <Icon path={mdiVolumeHigh} className="h-4.5 xl:h-6" />
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
    <div className="flex flex-row lg:flex-col gap-3 h-full overflow-y-auto p-1">
      <div
        className={teamPreviewBoxContainer}
        onClick={() => handleTeamIdParam({ teamId: null })}
      >
        <Icon path={mdiPlus} className="size-3 xl:size-4" />
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
            <span className="text-[10px] xl:text-xs truncate w-full text-center px-1">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const DraftModal = ({ draft, onLoad, handleClose }) => {
  const { t } = useTranslation();
  const basePath = "TeamBuilder.Draft";

  const handleLoadDraft = () => {
    onLoad(draft);
    handleClose();
  };

  return (
    <Modal
      width="600px"
      handleClose={handleClose}
      title={t(`${basePath}.Title`)}
      footer={
        <div className="flex flex-row justify-end gap-4">
          <CustomButton variant="secondary" handleClick={handleClose}>
            {t("Base.Discard")}
          </CustomButton>
          <CustomButton handleClick={() => handleLoadDraft(draft)}>
            {t(`${basePath}.Load`)}
          </CustomButton>
        </div>
      }
    >
      <div className="flex flex-col gap-6 py-4">
        <p className="text-gray-600">{t(`${basePath}.Description`)}</p>
        <div className="flex flex-col gap-1 bg-gray-50 px-4 py-3 rounded-lg shadow-md">
          <span className="font-bold text-sm text-gray-500 mb-2">
            {draft.name || "Untitled"} ({draft.team.length} Pokémon)
          </span>
          <div className="flex gap-2 overflow-hidden">
            {draft.team.slice(0, 6).map((pkm) => (
              <img
                key={pkm.id}
                alt={pkm.name}
                className="size-12"
                src={pkm.staticSprite}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
