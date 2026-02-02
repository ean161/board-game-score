"use client";
import { CircleFadingArrowUp, CloudDownload, CloudUpload } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Field } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function MigratePopover({
    pushMigrate,
    getMigrate,
}: {
    pushMigrate: () => void;
    getMigrate: () => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"}>
                    <CircleFadingArrowUp />
                    Migrate
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <Field>
                    <ButtonGroup>
                        <Button
                            onClick={pushMigrate}
                            variant={"outline"}
                            size={"icon"}
                        >
                            <CloudUpload color="green" />
                        </Button>
                        <Button
                            onClick={getMigrate}
                            variant={"outline"}
                            size={"icon"}
                        >
                            <CloudDownload color="white" />
                        </Button>
                    </ButtonGroup>
                </Field>
            </PopoverContent>
        </Popover>
    );
}
