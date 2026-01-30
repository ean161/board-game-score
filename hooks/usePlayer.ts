"use client";

import {
    AddPlayer,
    GetBetHistory,
    Player,
    RemovePlayer,
    SetBetHistory,
} from "@/types/Player";
import { useEffect, useState } from "react";

export default function usePlayer({
    betId,
    setBetId,
}: {
    betId: number;
    setBetId: (betId: number) => void;
}) {
    const [players, setPlayers] = useState<Player[]>([]);

    const addPlayer = ({ name }: AddPlayer) => {
        if (!name) {
            return;
        }

        setPlayers((prev) => [
            ...prev,
            {
                name,
                histories: [],
            },
        ]);
    };

    const removePlayer = ({ name }: RemovePlayer) => {
        setPlayers(players.filter((p) => p.name != name));
    };

    const resetPlayer = () => {
        setPlayers([]);
    };

    const resetHistories = () => {
        setPlayers((prev) =>
            prev.map((p) => ({
                ...p,
                histories: [],
            })),
        );

        setBetId(1);
    };

    const getBetHistory = ({ name, id }: GetBetHistory) => {
        const player = players.findLast((p) => p.name == name);
        return player?.histories?.findLast((h) => h.id == id);
    };

    const setBetHistory = ({ name, id, rank }: SetBetHistory) => {
        if (id >= betId) {
            setBetId(betId + 1);
        }

        if (name == "*") {
            setPlayers((prev) =>
                prev.map((p) => {
                    let found = false;

                    const histories = p.histories.map((h) => {
                        if (h.id === id) {
                            found = true;
                            return { ...h, rank };
                        }
                        return h;
                    });

                    return {
                        ...p,
                        histories: found
                            ? histories
                            : [...histories, { id, rank }],
                    };
                }),
            );
            return;
        }

        setPlayers((prev) =>
            prev.map((p) => {
                if (p.name !== name) return p;

                let found = false;

                const histories = p.histories.map((h) => {
                    if (h.id === id) {
                        found = true;
                        return { ...h, rank };
                    }
                    return h;
                });

                return {
                    ...p,
                    histories: found ? histories : [...histories, { id, rank }],
                };
            }),
        );
    };

    useEffect(() => {
        const cache = window.localStorage.getItem("players");

        if (cache) {
            setPlayers(JSON.parse(cache));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("players", JSON.stringify(players));
    }, [players]);

    return {
        players,
        addPlayer,
        removePlayer,
        resetPlayer,
        resetHistories,
        getBetHistory,
        setBetHistory,
    };
}
