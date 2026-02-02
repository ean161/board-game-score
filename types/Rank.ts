export type Rank = {
    title: string;
    score: number;
    color: string;
    isBulk: boolean;
};

export type AddRank = {
    title: string;
    score: number;
    color: string;
    isBulk: boolean;
};

export type RemoveRank = {
    title: string;
};
