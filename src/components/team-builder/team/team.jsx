import { SelectedPokemon } from "./team.content";
import {
  useCreatePkmTeam,
  useDeletePkmTeam,
  useUpdatePkmTeam,
} from "../../../stores";
import { CustomButton, CustomInput, DragDrop, showToast } from "../../base";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { mdiFilterVariant } from "@mdi/js";
import { mdiSword } from "@mdi/js";

export const TeamSection = ({
  pkmTeam,
  teamName,
  setPkmTeam,
  setTeamName,
  selectedTeamId,
}) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const createTeam = useCreatePkmTeam();
  const updateTeam = useUpdatePkmTeam();
  const deleteTeam = useDeletePkmTeam();

  const handleSort = () => {
    setPkmTeam((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleSortByAttack = () => {
    setPkmTeam((prev) => {
      return [...prev].sort((a, b) => {
        const attackA = a.stats["ATK"] || 0;
        const attackB = b.stats["ATK"] || 0;
        return attackB - attackA;
      });
    });
  };

  const handleCreateTeam = () => {
    if (verifyTeamRequirements()) {
      createTeam({ name: teamName, pokemon: pkmTeam });
    }
  };

  const handleUpdateTeam = () => {
    if (verifyTeamRequirements()) {
      updateTeam({
        team: pkmTeam,
        name: teamName,
        id: selectedTeamId,
      });
      showToast({
        type: "success",
        text: t("TeamBuilder.Success.Update", { value: teamName }),
      });
    }
  };

  const handleDeleteTeam = () => {
    setSearchParams((params) => {
      params.delete("id");
      setPkmTeam([]);
      return params;
    });
    deleteTeam(selectedTeamId);
    showToast({
      type: "success",
      text: t("TeamBuilder.Success.Delete", { value: teamName }),
    });
  };

  const verifyTeamRequirements = () => {
    if (pkmTeam.length < 6) {
      showToast({
        type: "error",
        text: t("TeamBuilder.Errors.TeamNotFull", {
          value: 6 - pkmTeam.length,
        }),
      });
      return false;
    }

    if (!teamName) {
      showToast({ type: "error", text: t("TeamBuilder.Errors.EmptyTeamName") });
      return false;
    }

    return true;
  };

  const deleteFromTeam = (id) => {
    setPkmTeam((prev) => prev.filter((pkm) => pkm.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <div className="flex flex-row gap-6 w-full">
        <CustomInput
          value={teamName}
          customStyles={{ fontSize: 14 }}
          placeholder={t("TeamBuilder.TeamName")}
          handleChange={(value) => setTeamName(value)}
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
