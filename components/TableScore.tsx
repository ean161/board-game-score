"use client";
import { GetBetHistory, Player, SetBetHistory } from "@/types/Player";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { PhoneCall, Plus } from "lucide-react";
import { History } from "@/types/History";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Rank } from "@/types/Rank";
import { Button } from "./ui/button";
import SetCustomBetHis from "./SetCustomBetHis";

export default function TableScore({
    betId,
    players,
    ranks,
    getBetHistory,
    setBetHistory,
}: {
    betId: number;
    players: Player[];
    ranks: Rank[];
    getBetHistory: ({ name, id }: GetBetHistory) => History | undefined;
    setBetHistory: ({ name, id, rank }: SetBetHistory) => void;
}) {
    return (
        <Table>
            <TableCaption>
                <div className="flex space-x-1 items-center justify-center">
                    <PhoneCall size={16} />
                    <span>113</span>
                </div>
            </TableCaption>
            <TableHeader>
                <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
                    <TableHead className="w-10 text-muted">#</TableHead>
                    {players.map((p) => {
                        return (
                            <TableHead key={p.name}>
                                <p className="text-center cursor-pointer">
                                    {p.name}
                                </p>
                            </TableHead>
                        );
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: betId + 1 }, (_, idx) => {
                    const i = betId - idx;

                    if (i == 0) {
                        return;
                    }
                    return (
                        <TableRow
                            key={i}
                            className="*:border-border [&>:not(:last-child)]:border-r"
                        >
                            <TableCell className="text-muted">{i}</TableCell>
                            {players.map((p) => {
                                const history = getBetHistory({
                                    name: p.name,
                                    id: i,
                                });

                                return (
                                    <TableCell
                                        key={p.name}
                                        className="text-center cursor-pointer"
                                    >
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                {history ? (
                                                    <Badge
                                                        className={`bg-${history.rank.color}-950 text-white`}
                                                    >
                                                        {history.rank.title}
                                                    </Badge>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <Plus
                                                            size={16}
                                                            color="gray"
                                                        />
                                                    </div>
                                                )}
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit">
                                                <div className="flex flex-wrap gap-2">
                                                    {[...ranks]
                                                        .sort(
                                                            (a, b) =>
                                                                b.score -
                                                                a.score,
                                                        )
                                                        .map((r) => {
                                                            return (
                                                                <Button
                                                                    key={
                                                                        r.title
                                                                    }
                                                                    onClick={() =>
                                                                        setBetHistory(
                                                                            {
                                                                                name: p.name,
                                                                                id: i,
                                                                                rank: r,
                                                                            },
                                                                        )
                                                                    }
                                                                    className={`bg-${r.color}-950 text-white cursor-pointer rounded-full`}
                                                                >
                                                                    {r.title}
                                                                </Button>
                                                            );
                                                        })}
                                                </div>
                                                <SetCustomBetHis
                                                    name={p.name}
                                                    id={i}
                                                    setBetHistory={
                                                        setBetHistory
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
                    <TableCell className="text-muted">#</TableCell>
                    {players.map((p) => {
                        var hisTotal = 0;
                        p.histories.map((h) => (hisTotal += h.rank.score));

                        return <TableCell key={p.name}>{hisTotal}</TableCell>;
                    })}
                </TableRow>
            </TableFooter>
        </Table>
    );
}
