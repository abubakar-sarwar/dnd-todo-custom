"use client";
import { CardType, ColumnProjectProps, ProjectType } from "@/types";
import { DragEvent, useState } from "react";
import DropIndicator from "./dropIndicator";
import { useDispatch } from "react-redux";
import { setDragType, setProjects } from "@/lib/slices/Allslices";
import AddProject from "./addProject";
import CardProject from "./cardProject";

const ColumnProjects = ({ columnType, projects }: ColumnProjectProps) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: ProjectType) => {
    e.dataTransfer.setData("cardId", card.id);
    dispatch(setDragType(columnType));
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    dispatch(setDragType(""));
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...projects];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      dispatch(setProjects(copy));
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="projects"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2 flex items-center justify-between">
        <h3 className="uppercase font-medium text-violet-400">Projects</h3>
        <span className="rounded text-sm font-bold text-violet-400">
          {projects.length}
        </span>
      </div>
      <div className="px-4 h-full overflow-y-auto">
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors m-auto ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
          {projects.map((c) => {
            return (
              <CardProject
                key={c.id}
                {...c}
                handleDragStart={handleDragStart}
              />
            );
          })}
          <DropIndicator beforeId={null} column="projects" />
          <AddProject />
        </div>
      </div>
    </div>
  );
};

export default ColumnProjects;
