import { capitalize } from "../../utils";

export const BASE_TYPE_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield";
export const BASE_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export function getIdFromUrl(url) {
  const match = url.match(/\/(\d+)\//);
  return match ? match[1] : null;
}

export function formatPokemonInfo(info) {
  const statsMap = Object.fromEntries(
    info.stats.map(({ base_stat, stat }) => [stat.name, base_stat])
  );

  const stats = [
    {
      name: "ATK",
      score: Math.max(statsMap.attack, statsMap["special-attack"]),
    },
    {
      name: "DEF",
      score: Math.max(statsMap.defense, statsMap["special-defense"]),
    },
    { name: "SPE", score: statsMap.speed },
  ];

  return {
    stats,
    id: info.id,
    name: capitalize(info.name),
    types: info.types.map(({ type }) => {
      const typeId = getIdFromUrl(type.url);
      return {
        name: type.name,
        sprite: `${BASE_TYPE_SPRITE_URL}/${typeId}.png`,
      };
    }),
    staticSprite: `${BASE_SPRITE_URL}/${info.id}.png`,
    movingSprite: `${BASE_SPRITE_URL}/other/showdown/${info.id}.gif`,
  };
}
