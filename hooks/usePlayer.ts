import { Player } from "@/types/Player";
import { useState } from "react";

export default function usePlayer() {
    const [players, setPlayers] = useState<Player[]>([]);

    const addPlayer = () => {};

    const removePlayer = () => {};

    const resetPlayer = () => {};

    return { players, addPlayer, removePlayer, resetPlayer };
}
