"use client";
import { useEffect, useState } from "react";
import usePlayer from "./usePlayer";
import useRank from "./useRank";

export default function useHome() {
    const [betId, setBetId] = useState<number>(1);
    const {
        players,
        addPlayer,
        removePlayer,
        resetPlayer,
        getBetHistory,
        setBetHistory,
        resetHistories,
    } = usePlayer({
        betId,
        setBetId,
    });
    const { ranks, addRank, removeRank, resetRank } = useRank();

    const reset = () => {
        setBetId(1);
        resetPlayer();
        resetRank();
    };

    useEffect(() => {
        const cache = window.localStorage.getItem("betId");

        if (cache) {
            setBetId(Number(cache));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("betId", String(betId));
    }, [betId]);

    return {
        betId,
        setBetId,
        reset,
        resetHistories,
        players,
        ranks,
        addRank,
        removeRank,
        resetRank,
        addPlayer,
        removePlayer,
        getBetHistory,
        setBetHistory,
    };
}
