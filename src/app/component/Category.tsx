import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

export default function Category() {
  return (
    <ScrollArea className="w-96 mt-5">
      <div className="flex space-x-2">
        <Card className="w-1/3 h-[12vh] rounded-sm flex justify-center items-center p-4">
          <div className="w-[87px] h-[87px] border-2 border-black rounded-full"></div>
        </Card>
        <Card className="w-1/3 h-[12vh] rounded-sm flex justify-center items-center p-4">
          <div className="w-[87px] h-[87px] border-2 border-black rounded-full"></div>
        </Card>
        <Card className="w-1/3 h-[12vh] rounded-sm flex justify-center items-center p-4">
          <div className="w-[87px] h-[87px] border-2 border-black rounded-full"></div>
        </Card>
        <Card className="w-1/3 h-[12vh] rounded-sm flex justify-center items-center p-4">
          <div className="w-[87px] h-[87px] border-2 border-black rounded-full"></div>
        </Card>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
