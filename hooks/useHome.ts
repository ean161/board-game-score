"use client";
import { useEffect, useState } from "react";
import usePlayer from "./usePlayer";
import useRank from "./useRank";

export default function useHome() {
    const [betId, setBetId] = useState<number>(1);
    const {
        players,
        setPlayers,
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
    const { ranks, setRanks, addRank, removeRank, resetRank } = useRank();

    const getData = () => {
        return `${betId}|||${JSON.stringify(ranks)}|||${JSON.stringify(players)}`;
    };

    const setData = (data: string) => {
        try {
            const args = data.trim().split("|||");
            setBetId(Number(args[0]));
            setRanks(JSON.parse(args[1]));
            setPlayers(JSON.parse(args[2]));
        } catch (err: any) {}
    };

    const pushMigrate = () => {
        const fetchPushMigrate = async () => {
            await fetch("https://bot.ean.vn/board-game-score.php", {
                method: "POST",
                body: JSON.stringify({
                    data: getData(),
                }),
            });
        };

        fetchPushMigrate();
        console.log("Pushed migrate", players);
    };

    const getMigrate = () => {
        const fetchGetMigrate = async () => {
            try {
                const req = await fetch(
                    "https://bot.ean.vn/board-game-score.php",
                );
                const res = await req.text();
                setData(res);
            } catch (err: any) {}
        };

        fetchGetMigrate();
    };

    useEffect(() => {
        pushMigrate();
    }, [players]);

    const reset = () => {
        window.localStorage.clear();

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
        pushMigrate,
        getMigrate,
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
