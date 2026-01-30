"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonGroup } from "./ui/button-group";

export default function ResetPopover({
    reset,
    resetHistories,
}: {
    reset: () => void;
    resetHistories: () => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="destructive">Reset</Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <ButtonGroup>
                    <Button onClick={reset} variant={"destructive"}>
                        Reset hết
                    </Button>
                    <Button onClick={resetHistories}>Xoá lịch sử</Button>
                </ButtonGroup>
            </PopoverContent>
        </Popover>
    );
}
