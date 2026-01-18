export const HomeSectionContainer = `
    flex flex-col gap-6 bg-white/90 p-6 rounded-2xl
     shadow-xl h-full min-h-0 border border-white/50
`;

export const EmptyTeamsContainer = `
    flex flex-col gap-4 items-center text-center p-8 bg-neutral-50
    rounded-xl border border-dashed border-neutral-300 w-full h-full justify-center
`;

export const TeamCoontainer = `
    group flex flex-col items-center gap-3 w-full bg-white border border-neutral-200
    shadow-sm rounded-xl py-3 px-4 cursor-pointer hover:shadow-md hover:border-emerald-400
    hover:bg-emerald-50 transition-all duration-200
`;

export const VersusTagStyle = `
    flex items-center justify-center font-black italic text-lg
    rounded-full w-10 h-10 shrink-0 bg-white border border-neutral-200 text-neutral-400 shadow-sm 
`;

export const BattleHistoryContainer = `
    group cursor-pointer group flex items-center justify-between p-3 bg-white
    hover:bg-red-50 border border-neutral-100 rounded-lg transition-colors
`;

export const HistorySeeTag = `
    text-xs font-bold text-neutral-300 bg-neutral-50
    group-hover:bg-red-100 group-hover:text-red-300 px-2 py-1 rounded border border-neutral-100
`;
