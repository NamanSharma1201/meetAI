"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentsDialog from "./new-agent-dialog";
import { UseAgentFilter } from "../../hooks/use-agent-filters";
import { AgentSearchFilters } from "./agent-search-filter";
import { DEFAULT_PAGE } from "@/contant";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = UseAgentFilter();
  const isAnyFilterModified = !!filters.search;
  const onClearFilter = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex py-4 px-4 md:px-8 flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <AgentSearchFilters />
            {isAnyFilterModified && (
              <Button value={"outline"} size="sm" onClick={onClearFilter}>
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
