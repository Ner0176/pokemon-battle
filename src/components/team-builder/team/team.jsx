import { useState } from "react";
import { SelectedPokemon } from "./team.content";
import {
  useCreatePkmTeam,
  useDeletePkmTeam,
  useUpdatePkmTeam,
} from "../../../stores";
import { CustomButton, CustomInput, DragDrop } from "../../base";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { mdiFilterVariant } from "@mdi/js";
import { mdiSword } from "@mdi/js";

export const TeamSection = ({ pkmTeam, setPkmTeam, selectedTeamId }) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const createTeam = useCreatePkmTeam();
  const updateTeam = useUpdatePkmTeam();
  const deleteTeam = useDeletePkmTeam();

  const [teamName, setTeamName] = useState("");

  const handleSort = () => {
    setPkmTeam((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleSortByAttack = () => {
    setPkmTeam((prev) => {
      return [...prev].sort((a, b) => {
        const attackA = a.stats.find((s) => s.name === "ATK")?.score || 0;
        const attackB = b.stats.find((s) => s.name === "ATK")?.score || 0;
        return attackB - attackA;
      });
    });
  };

  const handleCreateTeam = () => {
    createTeam({ name: teamName, pokemon: pkmTeam });
  };

  const handleUpdateTeam = () => {
    updateTeam({
      team: pkmTeam,
      name: teamName,
      id: selectedTeamId,
    });
  };

  const handleDeleteTeam = () => {
    setSearchParams((params) => {
      params.delete("id");
      setPkmTeam([]);
      return params;
    });
    deleteTeam(selectedTeamId);
  };

  const deleteFromTeam = (id) => {
    setPkmTeam((prev) => prev.filter((pkm) => pkm.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <div className="flex flex-row gap-6 w-full">
        <CustomInput
          value={teamName}
          placeholder={t("TeamBuilder.TeamName")}
          handleChange={(value) => setTeamName(value)}
          customStyles={{ fontSize: 14 }}
        />
        <div className="flex flex-row items-center gap-2">
          <CustomButton
            icon={mdiFilterVariant}
            handleClick={handleSort}
            color={{ bgColor: "#f5f5f5", textColor: "#404040" }}
          >
            {t("TeamBuilder.OrderBy.Random")}
          </CustomButton>
          <CustomButton
            icon={mdiSword}
            handleClick={handleSortByAttack}
            color={{ bgColor: "#f5f5f5", textColor: "#404040" }}
          >
            {t("TeamBuilder.OrderBy.Attack")}
          </CustomButton>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <DragDrop
          list={pkmTeam}
          setList={setPkmTeam}
          renderItem={(item) => {
            return (
              <SelectedPokemon pokemon={item} handleDelete={deleteFromTeam} />
            );
          }}
        />
        {[...Array(6 - pkmTeam.length)].map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="border-2 border-neutral-200 bg-white rounded-xl w-full h-23.5 shadow-inner"
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-end w-full gap-3">
        {selectedTeamId ? (
          <>
            <CustomButton
              variant="secondary"
              handleClick={handleDeleteTeam}
              customStyles={{ fontSize: 16 }}
            >
              {t("Base.DeleteTeam")}
            </CustomButton>
            <CustomButton
              handleClick={handleUpdateTeam}
              customStyles={{ fontSize: 16 }}
            >
              {t("Base.UpdateTeam")}
            </CustomButton>
          </>
        ) : (
          <CustomButton
            handleClick={handleCreateTeam}
            customStyles={{ fontSize: 16 }}
          >
            {t("Base.CreateTeam")}
          </CustomButton>
        )}
      </div>
    </div>
  );
};
