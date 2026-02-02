"use client";
import AddPlayerPopover from "@/components/AddPlayerPopover";
import AddRankPopover from "@/components/AddRankPopover";
import MigratePopover from "@/components/MigratePopover";
import ResetPopover from "@/components/ResetPopover";
import TableScore from "@/components/TableScore";
import { ButtonGroup } from "@/components/ui/button-group";
import useHome from "@/hooks/useHome";

export default function Home() {
    const {
        betId,
        getData,
        setData,
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
        <div className="py-6 px-4 space-y-8">
            <ButtonGroup>
                <ButtonGroup>
                    <AddRankPopover
                        ranks={ranks}
                        addRank={addRank}
                        removeRank={removeRank}
                    />
                    <AddPlayerPopover
                        players={players}
                        addPlayer={addPlayer}
                        removePlayer={removePlayer}
                    />
                </ButtonGroup>
                <ButtonGroup>
                    <MigratePopover getData={getData} setData={setData} />
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
                {Array.from({ length: 9 }, (_, idx) => (
                    <span
                        key={idx}
                        className={idx == 1 ? `bg-red-${idx * 100}` : ""}
                    >
                        {idx * 100}
                    </span>
                ))}
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
