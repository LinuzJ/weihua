import { createContext } from "react";

export type Pages = "home" | "leaderboard";
export const defaultPageContext: Pages = "home";

export const PageContext = createContext<Pages>(defaultPageContext);
