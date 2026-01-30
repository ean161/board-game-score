"use client";
import { Trash, UsersRound } from "lucide-react";
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
import { AddPlayer, Player, RemovePlayer } from "@/types/Player";
import { ButtonGroup } from "./ui/button-group";

export default function AddPlayerPopover({
    players,
    addPlayer,
    removePlayer,
}: {
    players: Player[];
    addPlayer: ({ name }: AddPlayer) => void;
    removePlayer: ({ name }: RemovePlayer) => void;
}) {
    const [name, setName] = useState("");

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
                    <Button
                        onClick={() => {
                            addPlayer({ name });
                            setName("");
                        }}
                    >
                        Thêm
                    </Button>
                    {players.map((p) => (
                        <ButtonGroup key={p.name}>
                            <Input defaultValue={p.name} disabled />
                            <Button
                                onClick={() => removePlayer({ name: p.name })}
                                variant={"destructive"}
                                size={"icon"}
                            >
                                <Trash />
                            </Button>
                        </ButtonGroup>
                    ))}
                </FieldGroup>
            </PopoverContent>
        </Popover>
    );
}
