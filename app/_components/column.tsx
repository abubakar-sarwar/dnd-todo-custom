"use client";
import { CardType, ColumnProps } from "@/types";
import { DragEvent, useState } from "react";
import Card from "./card";
import DropIndicator from "./dropIndicator";
import AddCard from "./addCard";
import { useDispatch, useSelector } from "react-redux";
import { setCards, setDragType } from "@/lib/slices/Allslices";
import { RootState } from "@/lib";

const Column = ({ title, headingColor, columnType, column }: ColumnProps) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const cards = useSelector((state: RootState) => state.cards);
  const dragType = useSelector((state: RootState) => state.dragType);
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
    dispatch(setDragType(columnType));
  };

  const handleDragEnd = (e: DragEvent) => {
    if (dragType !== columnType) {
      return;
    }

    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    dispatch(setDragType(""));
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      dispatch(setCards(copy));
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    if (dragType === columnType) {
      setActive(true);
    }
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    if (dragType !== columnType) {
      return;
    }

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
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-full shrink grow">
      <div
        className={`flex items-center justify-between ${
          selectedProjectId ? "" : "opacity-40 select-none"
        }`}
      >
        <h3 className={`uppercase font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`area_height w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        {selectedProjectId && (
          <>
            <DropIndicator beforeId={null} column={column} />
            <AddCard column={column} />
          </>
        )}
      </div>
    </div>
  );
};

export default Column;
