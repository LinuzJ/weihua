import { RecordAuthResponse, RecordModel } from "pocketbase";
import { createContext } from "react";

export const defaultAuthContext = {
  record: {
    avatar: "",
    collectionId: "",
    collectionName: "",
    created: "",
    email: "",
    emailVisibility: false,
    friends: [],
    id: "",
    name: "",
    updated: "",
    username: "",
    verified: false,
  },
  token: "",
};

export const AuthContext =
  createContext<RecordAuthResponse<RecordModel>>(defaultAuthContext);
