"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewMeetingsDialog from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilters } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { UseMeetingsFilter } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/contant";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilters] = UseMeetingsFilter();
  const isAnyFilterModified =
    !!filter.status || !!filter.search || !!filter.agentId;
  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewMeetingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex py-4 px-4 md:px-8 flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilters />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant={"outline"} onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
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
