"use client";
import AddRankPopover from "@/components/AddRankPopover";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import useHome from "@/hooks/useHome";

export default function Home() {
    const { ranks, addRank, resetRank } = useHome();

    return (
        <div className="p-6 space-y-8">
            <ButtonGroup>
                <ButtonGroup>
                    <AddRankPopover addRank={addRank} resetRank={resetRank} />
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="outline">Archive</Button>
                    <Button variant="outline">Report</Button>
                    <Button variant="outline">Report</Button>
                </ButtonGroup>
            </ButtonGroup>
            <p>Ranks: {JSON.stringify(ranks)}</p>
        </div>
    );
}
