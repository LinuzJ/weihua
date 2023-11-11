import { createContext } from "react";

export const defaultPageContext = "home";

export const PageContext = createContext<string>(defaultPageContext);
