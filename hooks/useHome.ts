"use client";
import { useState } from "react";
import usePlayer from "./usePlayer";
import useRank from "./useRank";

export default function useHome() {
    const [betId, setBetId] = useState<number>(1);
    const { players, addPlayer, removePlayer, resetPlayer } = usePlayer();
    const { ranks, addRank, removeRank, resetRank } = useRank();

    return { players, ranks, addRank, resetRank, addPlayer };
}
