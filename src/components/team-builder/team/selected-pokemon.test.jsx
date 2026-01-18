import { SelectedPokemon } from "./team.content";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  stats: { ATK: 65 },
  movingSprite: "url-gif",
  staticSprite: "url-png",
  types: [{ name: "grass", sprite: "url-grass" }],
};

describe("Componente UI <SelectedPokemon />", () => {
  it("Renderiza correctamente el nombre y las estadísticas", () => {
    render(<SelectedPokemon pokemon={mockPokemon} handleDelete={() => {}} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();

    expect(screen.getByText("ATK:")).toBeInTheDocument();
    expect(screen.getByText("65")).toBeInTheDocument();

    const imagen = screen.getByRole("img", { name: /bulbasaur/i });
    expect(imagen).toHaveAttribute("src", expect.stringContaining("url"));
  });

  it("Llama a la función handleDelete al hacer clic en el botón", () => {
    const spyFn = vi.fn();

    render(<SelectedPokemon pokemon={mockPokemon} handleDelete={spyFn} />);

    const tarjeta = screen.getByText("bulbasaur").closest("div");
    fireEvent.mouseEnter(tarjeta);

    const boton = screen.getByRole("button", {
      name: /delete pokemon from team/i,
    });

    fireEvent.click(boton);

    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith(1);
  });
});
