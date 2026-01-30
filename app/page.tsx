"use client";
import AddPlayerPopover from "@/components/AddPlayerPopover";
import AddRankPopover from "@/components/AddRankPopover";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import useHome from "@/hooks/useHome";

export default function Home() {
    const { ranks, addRank, resetRank, players, addPlayer } = useHome();

    return (
        <div className="p-6 space-y-8">
            <ButtonGroup>
                <ButtonGroup>
                    <AddRankPopover addRank={addRank} />
                </ButtonGroup>
                <ButtonGroup>
                    <AddPlayerPopover addPlayer={addPlayer} />
                    <Button variant="outline">Report</Button>
                    <Button variant="outline">Report</Button>
                </ButtonGroup>
            </ButtonGroup>
            <p>Ranks: {JSON.stringify(ranks)}</p>
            <p>Players: {JSON.stringify(players)}</p>
            <div className="hidden">
                <span className="text-red-950"></span>
                <span className="text-red-800"></span>
                <span className="text-red-600"></span>
                <span className="text-green-950"></span>
                <span className="text-green-800"></span>
                <span className="text-green-600"></span>

                <span className="bg-red-950"></span>
                <span className="bg-red-800"></span>
                <span className="bg-red-600"></span>
                <span className="bg-green-950"></span>
                <span className="bg-green-800"></span>
                <span className="bg-green-600"></span>
            </div>
        </div>
    );
}
