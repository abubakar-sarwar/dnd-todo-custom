import { Dispatch, SetStateAction } from "react";

type ColumnType = "backlog" | "todo" | "doing" | "done";

export type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  columnType: string;
};

export type ColumnProjectProps = {
  projects: ProjectType[];
  columnType: string;
};

export type PriorityType = "low" | "medium" | "high";

export type CardType = {
  title: string;
  id: string;
  column: ColumnType;
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export type ProjectType = {
  id: string;
  project: string;
  createdAt: string;
  todo: CardType[];
};

export type CardProps = CardType & {
  handleDragStart: Function;
};

export type CardProjectProps = ProjectType & {
  handleDragStart: Function;
};

export type CardActionProps = {
  id: string;
};

export type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

export type AddCardProps = {
  column: ColumnType;
};
