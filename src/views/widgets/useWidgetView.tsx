import * as React from "react";
import { Widget } from "./WidgetTable";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { User } from "../users/UserTable";
import { ICON, useIcon } from "@/components/icon/useIcon";
import { Button, Variant } from "@/components/button/Button";

type Params = {
  user: User;
};

export const useWidgetView = (params: Params) => {
  const { i } = useIcon();
  const widgets = params.user.widgets;
  const openModal = useStore.use.setOpen();
  const setActiveModal = useStore.use.setActiveModal();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedWidgetIds, setSelectedWidgetIds] = React.useState<string[]>(
    []
  );

  const [currentWidgets, setCurrentWidgets] = React.useState<Widget[]>([]);

  const selectedWidgets = React.useMemo(() => {
    return currentWidgets?.filter((widget) =>
      selectedWidgetIds.includes(widget.id)
    );
  }, [currentWidgets, selectedWidgetIds]);

  React.useEffect(() => {
    setCurrentWidgets(widgets);
    setSelectedWidgetIds([]);
  }, [widgets]);

  const handleSelectAll = React.useCallback(() => {
    if (selectedWidgetIds.length === currentWidgets.length) {
      setSelectedWidgetIds([]);
      return;
    }
    setSelectedWidgetIds(currentWidgets.map((widget) => widget.id));
  }, [currentWidgets, selectedWidgetIds.length]);

  const handleSelect = React.useCallback((widgetId: string) => {
    setSelectedWidgetIds((prev) => {
      if (prev.includes(widgetId)) {
        return prev.filter((id) => id !== widgetId);
      }
      return [...prev, widgetId];
    });
  }, []);

  const handleChange = React.useCallback(
    (widgetId: string, change: { key: string; value: string }) => {
      const { key, value } = change;
      setCurrentWidgets((prevState) =>
        prevState.map((widget) => {
          if (widget.id === widgetId) {
            return {
              ...widget,
              [key]: value,
            };
          }
          return widget;
        })
      );
    },
    []
  );

  const openBulkEdit = React.useCallback(
    (user: User) => {
      setActiveModal(MODAL_TYPES.BULK_EDIT_WIDGET, {
        widgets: selectedWidgets,
        user,
      });
      openModal();
    },
    [setActiveModal, openModal, selectedWidgets]
  );

  const handleAddWidgets = React.useCallback(
    (user: User) => {
      setActiveModal(MODAL_TYPES.ADD_WIDGETS, {
        user,
      });
      openModal();
    },
    [setActiveModal, openModal]
  );

  const actions = React.useCallback(() => {
    const actions = [
      {
        name: "delete",
        label: "Delete",
        onClick: console.log,
        icon: ICON.DELETE,
        variant: "danger",
      },
    ];

    return actions.map((action) => {
      return (
        <Button
          key={action.name}
          onClick={action.onClick}
          title={action.label}
          variant={action.variant as Variant}
        >
          {i(action.icon)}
        </Button>
      );
    });
  }, [i]);

  return {
    searchTerm,
    setSearchTerm,
    currentWidgets,
    handleChange,
    openBulkEdit,
    handleSelect,
    handleAddWidgets,
    selectedWidgetIds,
    handleSelectAll,
    actions,
  };
};
