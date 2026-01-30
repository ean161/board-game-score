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
import { Badge } from "./ui/badge";
import { Rank } from "@/types/Rank";
import { Avatar, AvatarImage } from "./ui/avatar";
import SetRankPopover from "./SetRankPopover";
import ShinyText from "@/components/ShinyText";

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
                    <TableHead className="text-muted">#</TableHead>
                    {players.map((p) => {
                        return (
                            <TableHead key={p.name}>
                                <div className="flex justify-center my-2">
                                    <Badge
                                        variant="outline"
                                        className="p-1 pr-2 space-x-1 cursor-pointer items-center"
                                    >
                                        <Avatar className="size-6 rounded-full items-center bg-gray-100/10">
                                            <AvatarImage
                                                src={`https://robohash.org/${encodeURI(p.name)}`}
                                            />
                                        </Avatar>
                                        <span>{p.name}</span>
                                    </Badge>
                                </div>
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
                            <TableCell className="text-muted">
                                <SetRankPopover
                                    trigger={
                                        <span className="cursor-pointer">
                                            {i}
                                        </span>
                                    }
                                    betId={i}
                                    player={{
                                        name: "*",
                                        histories: [],
                                    }}
                                    ranks={ranks}
                                    setBetHistory={setBetHistory}
                                />
                            </TableCell>
                            {players.map((p) => {
                                const history = getBetHistory({
                                    name: p.name,
                                    id: i,
                                });

                                return (
                                    <TableCell
                                        key={p.name}
                                        className={`text-center cursor-pointer bg-${history?.rank.color}-950`}
                                    >
                                        <SetRankPopover
                                            trigger={
                                                history ? (
                                                    <Badge
                                                        className={`bg-zinc-950 text-white`}
                                                    >
                                                        <ShinyText
                                                            text={`${history.rank.title}`}
                                                            speed={1}
                                                            delay={30}
                                                            color="gray"
                                                            shineColor={
                                                                history.rank
                                                                    .color
                                                            }
                                                            spread={120}
                                                            direction="left"
                                                            yoyo={false}
                                                            pauseOnHover={true}
                                                            disabled={false}
                                                        />
                                                    </Badge>
                                                ) : (
                                                    <div className="flex justify-center w-full">
                                                        <Plus
                                                            size={16}
                                                            color="gray"
                                                        />
                                                    </div>
                                                )
                                            }
                                            betId={i}
                                            player={p}
                                            ranks={ranks}
                                            setBetHistory={setBetHistory}
                                        />
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
