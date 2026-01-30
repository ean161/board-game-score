"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import SetCustomBetHis from "./SetCustomBetHis";
import { ReactNode } from "react";
import { Rank } from "@/types/Rank";
import { Player, SetBetHistory } from "@/types/Player";

export default function SetRankPopover({
    trigger,
    betId,
    player,
    ranks,
    setBetHistory,
}: {
    trigger: ReactNode;
    betId: number;
    player: Player;
    ranks: Rank[];
    setBetHistory: ({ name, id, rank }: SetBetHistory) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent className="w-fit">
                <div className="flex flex-wrap gap-2">
                    {[...ranks]
                        .sort((a, b) => b.score - a.score)
                        .map((r) => {
                            return (
                                <Button
                                    key={r.title}
                                    onClick={() =>
                                        setBetHistory({
                                            name: player.name,
                                            id: betId,
                                            rank: r,
                                        })
                                    }
                                    className={`bg-${r.color}-950 text-white cursor-pointer rounded-full`}
                                >
                                    {r.title}
                                </Button>
                            );
                        })}
                </div>
                <SetCustomBetHis
                    name={player.name}
                    id={betId}
                    setBetHistory={setBetHistory}
                />
            </PopoverContent>
        </Popover>
    );
}
