"use client";
import AddPlayerPopover from "@/components/AddPlayerPopover";
import AddRankPopover from "@/components/AddRankPopover";
import MigratePopover from "@/components/MigratePopover";
import ResetPopover from "@/components/ResetPopover";
import TableScore from "@/components/TableScore";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import useHome from "@/hooks/useHome";
import { genColorBasedOnName } from "@/lib/utils";
import { ChartNoAxesCombined } from "lucide-react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export default function Home() {
    const {
        betId,
        chartConfig,
        chart,
        pushMigrate,
        getMigrate,
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

    const [isAutoGetMigrate, setAutoGetMigrate] = useState<boolean>(false);
    const [isChartHidden, setChartHidden] = useState<boolean>(true);

    useEffect(() => {
        if (!isAutoGetMigrate) return;

        const id = setInterval(getMigrate, 3000);
        return () => clearInterval(id);
    }, [isAutoGetMigrate, getMigrate]);

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
                    <Button asChild variant={"destructive"}>
                        <Checkbox
                            checked={isAutoGetMigrate}
                            onCheckedChange={() => {
                                setAutoGetMigrate(!isAutoGetMigrate);
                            }}
                        />
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <MigratePopover
                        pushMigrate={pushMigrate}
                        getMigrate={getMigrate}
                    />
                    <ResetPopover
                        reset={reset}
                        resetHistories={resetHistories}
                    />
                    <Button
                        variant={"outline"}
                        onClick={() => setChartHidden(!isChartHidden)}
                    >
                        <ChartNoAxesCombined />
                        Chart
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
            <ChartContainer
                config={chartConfig}
                className="w-full"
                hidden={isChartHidden}
            >
                <LineChart accessibilityLayer data={chart}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="id" tickLine={false} axisLine={false} />
                    <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent />}
                    />
                    {players.map((p) => (
                        <Line
                            dataKey={p.name}
                            type="natural"
                            stroke={genColorBasedOnName(p.name)}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ChartContainer>
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
                <span className="border-red-500"></span>
                <span className="border-orange-500"></span>
                <span className="border-amber-500"></span>
                <span className="border-yellow-500"></span>

                <span className="border-lime-500"></span>
                <span className="border-green-500"></span>
                <span className="border-emerald-500"></span>
                <span className="border-teal-500"></span>

                <span className="border-blue-500"></span>
                <span className="border-purple-500"></span>
            </div>
        </div>
    );
}
