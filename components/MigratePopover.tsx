"use client";

import { CheckCheck, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

export default function MigratePopover({
    getData,
    setData,
}: {
    getData: () => string;
    setData: (data: string) => void;
}) {
    const [dataIp, setDataIp] = useState("");

    const copyText = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err: any) {}
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"}>Migrate</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Field>
                    <ButtonGroup>
                        <Input
                            value={dataIp}
                            onChange={(e) => setDataIp(e.target.value)}
                        />
                        <Button
                            onClick={() => {
                                setData(dataIp);
                                setDataIp("");
                            }}
                            variant={"outline"}
                            size={"icon"}
                        >
                            <CheckCheck color="green" />
                        </Button>
                        <Button
                            onClick={() => {
                                setDataIp(getData());
                                copyText(getData());
                            }}
                            variant={"outline"}
                            size={"icon"}
                        >
                            <Copy color="white" />
                        </Button>
                    </ButtonGroup>
                </Field>
            </PopoverContent>
        </Popover>
    );
}
