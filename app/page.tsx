"use client";
import AddPlayerPopover from "@/components/AddPlayerPopover";
import AddRankPopover from "@/components/AddRankPopover";
import ResetPopover from "@/components/ResetPopover";
import TableScore from "@/components/TableScore";
import { ButtonGroup } from "@/components/ui/button-group";
import useHome from "@/hooks/useHome";

export default function Home() {
    const {
        betId,
        reset,
        resetHistories,
        ranks,
        addRank,
        removeRank,
        resetRank,
        players,
        addPlayer,
        removePlayer,
        getBetHistory,
        setBetHistory,
    } = useHome();

    return (
        <div className="p-6 space-y-8">
            <ButtonGroup>
                <ButtonGroup>
                    <AddRankPopover
                        ranks={ranks}
                        addRank={addRank}
                        removeRank={removeRank}
                    />
                </ButtonGroup>
                <ButtonGroup>
                    <AddPlayerPopover
                        players={players}
                        addPlayer={addPlayer}
                        removePlayer={removePlayer}
                    />
                    <ResetPopover
                        reset={reset}
                        resetHistories={resetHistories}
                    />
                </ButtonGroup>
            </ButtonGroup>
            <TableScore
                betId={betId}
                players={players}
                ranks={ranks}
                getBetHistory={getBetHistory}
                setBetHistory={setBetHistory}
            />
            <div className="">
                <span className="bg-red-950"></span>
                <span className="bg-orange-950"></span>
                <span className="bg-amber-950"></span>
                <span className="bg-yellow-950"></span>

                <span className="bg-lime-950"></span>
                <span className="bg-green-950"></span>
                <span className="bg-emerald-950"></span>
                <span className="bg-teal-950"></span>

                <span className="bg-blue-950"></span>
                <span className="bg-purple-950"></span>
            </div>
        </div>
    );
}
