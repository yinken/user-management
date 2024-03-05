import * as React from "react";
import { Widget } from "./WidgetTable";
import { Assigner } from "@/components/assigner/Assigner";

export interface WidgetAssignerProps {
  assignedWidgets: Widget[];
  availableWidgets: Widget[];
}

export const WidgetAssigner: React.FC<WidgetAssignerProps> = ({
  assignedWidgets,
  availableWidgets,
}) => {
  return <Assigner assigned={assignedWidgets} total={availableWidgets} placeholder="Look for a widget..."/>;
};
