"use client";
import { Settings, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "./ui/popover";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { AddRank, Rank, RemoveRank } from "@/types/Rank";
import { Badge } from "./ui/badge";
import { colors } from "@/data/colors";

export default function AddRankPopover({
    ranks,
    addRank,
    removeRank,
}: {
    ranks: Rank[];
    addRank: ({ title, score, color }: AddRank) => void;
    removeRank: ({ title }: RemoveRank) => void;
}) {
    const [title, setTitle] = useState("");
    const [score, setScore] = useState("");
    const [selectedColor, setColor] = useState("");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Go Back">
                    <Settings />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Thêm rank</PopoverTitle>
                    <PopoverDescription>Thêm rank xét điểm</PopoverDescription>
                </PopoverHeader>
                <FieldGroup className="mt-4">
                    <Field orientation="horizontal">
                        <FieldLabel className="w-1/3">Hạng</FieldLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <FieldLabel className="w-1/3">Điểm</FieldLabel>
                        <Input
                            value={score}
                            onChange={(e) => setScore(e.target.value ?? "0")}
                        />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                        {colors.map((color, idx) => (
                            <Field
                                key={idx}
                                orientation="horizontal"
                                className="w-fit"
                            >
                                <FieldLabel htmlFor={`color-${color}`}>
                                    <Badge
                                        className={`bg-${color}-950 text-red`}
                                    >
                                        {color}
                                    </Badge>
                                </FieldLabel>
                                <Checkbox
                                    checked={selectedColor == color}
                                    onCheckedChange={(e) => setColor(color)}
                                    id={`color-${color}`}
                                    name="color"
                                />
                            </Field>
                        ))}
                    </div>
                    <Button
                        onClick={() => {
                            try {
                                const scoreNum = Number(score) ?? 0;

                                if (Number.isNaN(scoreNum)) {
                                    setScore("");
                                    return;
                                }

                                addRank({
                                    title,
                                    score: scoreNum,
                                    color: selectedColor,
                                });
                                setTitle("");
                                setScore("");
                                setColor("");
                            } catch (err: any) {}
                        }}
                    >
                        Thêm
                    </Button>
                    {[...ranks]
                        .sort((a, b) => b.score - a.score)
                        .map((r) => (
                            <div
                                className="flex justify-between items-center"
                                key={r.title}
                            >
                                <div className="items-center">
                                    <Badge
                                        className={`bg-${r.color}-950 text-white`}
                                    >
                                        {r.title} ({r.score} điểm)
                                    </Badge>
                                </div>
                                <Button
                                    onClick={() =>
                                        removeRank({ title: r.title })
                                    }
                                    variant={"destructive"}
                                    size={"icon"}
                                >
                                    <Trash />
                                </Button>
                            </div>
                        ))}
                </FieldGroup>
            </PopoverContent>
        </Popover>
    );
}
