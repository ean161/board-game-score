import { AddRank, Rank, RemoveRank } from "@/types/Rank";
import { useEffect, useState } from "react";

export default function useRank() {
    const [ranks, setRanks] = useState<Rank[]>([]);

    const addRank = ({ title, score, color, isBulk }: AddRank) => {
        if (!title || score == 0 || !color) {
            return;
        }

        setRanks((prev) => [
            ...prev,
            {
                title,
                score,
                color,
                isBulk,
            },
        ]);
    };

    const removeRank = ({ title }: RemoveRank) => {
        setRanks(ranks.filter((r) => r.title != title));
    };

    const resetRank = () => {
        setRanks([]);
    };

    useEffect(() => {
        const cache = window.localStorage.getItem("ranks");

        if (cache) {
            setRanks(JSON.parse(cache));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("ranks", JSON.stringify(ranks));
    }, [ranks]);

    return { ranks, setRanks, addRank, removeRank, resetRank };
}
