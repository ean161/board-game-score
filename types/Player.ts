import { History } from "./History";
import { Rank } from "./Rank";

export type Player = {
    name: string;
    histories: History[];
};

export type GetBetHistory = {
    name: string;
    id: number;
};

export type SetBetHistory = {
    name: string;
    id: number;
    rank: Rank;
};

export type AddPlayer = {
    name: string;
};

export type RemovePlayer = {
    name: string;
};
