"use client";
import { Settings } from "lucide-react";
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

const colors: string[] = [
    "red-950",
    "red-800",
    "red-600",
    "green-600",
    "green-800",
    "green-950",
];

export default function AddRankPopover({
    addRank,
}: {
    addRank: (title: string, score: number, color: string) => void;
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
                        <FieldLabel className="w-1/3">Tên</FieldLabel>
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
                    <div className="flex flex-wrap gap-4">
                        {colors.map((color, idx) => (
                            <Field
                                key={idx}
                                orientation="horizontal"
                                className="w-fit"
                            >
                                <FieldLabel htmlFor={`color-${color}`}>
                                    <span className={`text-${color}`}>
                                        {color.toUpperCase()}
                                    </span>
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
                            addRank(title, Number(score) ?? 0, selectedColor);
                            setTitle("");
                            setScore("");
                            setColor("");
                        }}
                    >
                        Thêm
                    </Button>
                </FieldGroup>
            </PopoverContent>
        </Popover>
    );
}
