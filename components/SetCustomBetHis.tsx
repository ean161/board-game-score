import { CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { SetBetHistory } from "@/types/Player";
import { useState } from "react";

export default function SetCustomBetHis({
    name,
    id,
    setBetHistory,
}: {
    name: string;
    id: number;
    setBetHistory: ({ name, id, rank }: SetBetHistory) => void;
}) {
    const [cusScore, setCusScore] = useState("");

    const handleScore = () => {
        try {
            const score = Number(cusScore ?? "0") ?? 0;
            if (Number.isNaN(score)) {
                setCusScore("");
                return;
            }

            setBetHistory({
                name: name,
                id: id,
                rank: {
                    title: `${score > 0 ? `+` : ``}${score}`,
                    score,
                    color: "",
                },
            });
            setCusScore("");
        } catch (err: any) {}
    };

    return (
        <Field className="mt-4">
            <ButtonGroup>
                <Input
                    value={cusScore}
                    onChange={(e) => setCusScore(e.target.value)}
                    className="w-20"
                />
                <Button onClick={handleScore} size={"icon"} variant={"outline"}>
                    <CheckCheck color="green" />
                </Button>
            </ButtonGroup>
        </Field>
    );
}
