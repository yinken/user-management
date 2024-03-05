import * as React from "react";

type Params = {
  total: { id: string; name: string }[];
  assigned: { id: string; name: string }[];
};

export const useAssigner = <T extends { id: string; name: string }>(
  params: Params
) => {
  const { total, assigned } = params;
  const searchbarRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [assignedIds, setAssignedIds] = React.useState<string[]>(
    assigned.map((item) => item.id)
  );

  const assignItem = (itemId: string) => {
    setAssignedIds((prevState) => [...prevState, itemId]);
  };

  const unassignItem = (currentId: string) => {
    setAssignedIds((prevState) => prevState.filter((id) => id !== currentId));
  };

  const assignAll = () => {
    setAssignedIds(total.map((item) => item.id));
  };

  const unassignAll = () => {
    setAssignedIds([]);
  };

  const assignRemaining = () => {
    setAssignedIds((prevState) => [
      ...prevState,
      ...total.map((item) => item.id).filter((id) => !prevState.includes(id)),
    ]);
  };

  const filtered = React.useMemo(() => {
    return total.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, total]);

  const currentlyAssigned = React.useMemo(() => {
    return filtered.filter((widget) => assignedIds.includes(widget.id));
  }, [filtered, assignedIds]);

  const remaining = React.useMemo(() => {
    return filtered.filter((item) => !assignedIds.includes(item.id));
  }, [filtered, assignedIds]);

  return {
    searchbarRef,
    searchTerm,
    setSearchTerm,
    assignedIds,
    assignItem,
    unassignItem,
    assignAll,
    unassignAll,
    assignRemaining,
    currentlyAssigned,
    remaining,
  };
};
