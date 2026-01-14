import { useState } from "react";
import { SelectedPokemon } from "./team.content";
import { useCreatePkmTeam, useDeletePkmTeam } from "../../stores";
import { CustomButton, CustomInput, DragDrop } from "../../base";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TeamSection = ({ pkmTeam, setPkmTeam, selectedTeamId }) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const createTeam = useCreatePkmTeam();
  const deleteTeam = useDeletePkmTeam();

  const [action, setAction] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleClick = (id) => {
    if (action === "delete") {
      setPkmTeam((prev) => prev.filter((pkm) => pkm.id !== id));
    } else if (action === "random-order") {
      setPkmTeam((prev) => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  const handleSort = () => {
    setPkmTeam((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleSortByAttack = () => {
    setPkmTeam((prev) => {
      return [...prev].sort((a, b) => {
        const attackA = a.stats.find((s) => s.name === "attack")?.score || 0;
        const attackB = b.stats.find((s) => s.name === "attack")?.score || 0;
        return attackB - attackA;
      });
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <div className="flex flex-row gap-2 justify-between w-full">
        <div className="w-fit border border-neutral-200 rounded-xl ">
          <CustomInput
            value={teamName}
            placeholder={t("TeamBuilder.TeamName")}
            onChange={(value) => setTeamName(value)}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <CustomButton handleClick={handleSort}>
            Ordenar aleatorio
          </CustomButton>
          <CustomButton handleClick={handleSortByAttack}>
            Ordenar por ataque
          </CustomButton>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <DragDrop
          list={pkmTeam}
          setList={setPkmTeam}
          renderItem={(item) => {
            return (
              <div onClick={() => handleClick(item.id)}>
                <SelectedPokemon action={action} pokemon={item} />
              </div>
            );
          }}
        />
        {[...Array(6 - pkmTeam.length)].map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="border-2 border-neutral-200 bg-white rounded-xl w-full h-20 shadow-inner"
          ></div>
        ))}
      </div>
      <div className="flex flex-row items-center gap-3">
        {selectedTeamId ? (
          <>
            <CustomButton
              handleClick={() =>
                setAction((prev) => (prev === "delete" ? "" : "delete"))
              }
            >
              {t("Base.Delete")}
            </CustomButton>
            <CustomButton
              handleClick={() => {
                setSearchParams((params) => {
                  params.delete("id");
                  setPkmTeam([]);
                  return params;
                });
                deleteTeam(selectedTeamId);
              }}
            >
              Eliminar equipo
            </CustomButton>
            <CustomButton handleClick={() => {}}>
              Actualizar equipo
            </CustomButton>
          </>
        ) : (
          <CustomButton
            handleClick={() =>
              createTeam({ name: teamName ?? "Equipo X", pokemon: pkmTeam })
            }
          >
            {t("Base.CreateTeam")}
          </CustomButton>
        )}
      </div>
    </div>
  );
};
