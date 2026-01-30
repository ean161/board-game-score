"use client";
import { UsersRound } from "lucide-react";
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
import { useState } from "react";
import { AddPlayer } from "@/types/Player";

export default function AddPlayerPopover({
    addPlayer,
}: {
    addPlayer: ({ name, score }: AddPlayer) => void;
}) {
    const [name, setName] = useState("");
    const [score, setScore] = useState("0");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Go Back">
                    <UsersRound />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Thêm ghế</PopoverTitle>
                    <PopoverDescription>Thêm ghế</PopoverDescription>
                </PopoverHeader>
                <FieldGroup className="mt-4">
                    <Field orientation="horizontal">
                        <FieldLabel className="w-1/3">Tên</FieldLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <FieldLabel className="w-1/3">Điểm</FieldLabel>
                        <Input
                            value={score}
                            onChange={(e) => setScore(e.target.value ?? "0")}
                        />
                    </Field>
                    <Button
                        onClick={() => {
                            addPlayer({ name, score: Number(score) ?? 0 });
                            setName("");
                            setScore("0");
                        }}
                    >
                        Thêm
                    </Button>
                </FieldGroup>
            </PopoverContent>
        </Popover>
    );
}
