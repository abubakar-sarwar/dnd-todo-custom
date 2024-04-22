"use client";
import { FormEvent, useState } from "react";
import { CardProps, CardType } from "@/types";
import DropIndicator from "./dropIndicator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib";
import {
  setCardEditingId,
  setCards,
  setDropDown,
} from "@/lib/slices/Allslices";
import { FiEdit3 } from "react-icons/fi";
import ActionsCard from "./actionsCard";

const Card = ({
  title,
  priority,
  createdAt,
  id,
  column,
  handleDragStart,
}: CardProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(title);

  const cards = useSelector((state: RootState) => state.cards);
  const cardEditingId = useSelector((state: RootState) => state.cardEditingId);
  const isEditing = cardEditingId === id;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCards: CardType[] = cards.map((item) => {
      if (item?.id === id) {
        return { ...item, title: text };
      } else return item;
    });

    dispatch(setCards(newCards));

    dispatch(setCardEditingId(""));
  };

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit", // Numeric, 2-digit
    month: "short", // Short month name
    year: "numeric", // Numeric, 4-digit year
    hour: "numeric", // Numeric hour
    minute: "2-digit", // Numeric, 2-digit minute
    hour12: true, // Use 12-hour time with AM/PM
  });

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className={`relative cursor-grab rounded border border-neutral-700 group active:cursor-grabbing ${
          isEditing ? "" : "p-3"
        } ${
          priority === "high"
            ? "bg-red-500"
            : priority === "medium"
            ? "bg-yellow-500"
            : "bg-neutral-800"
        }`}
      >
        <ActionsCard id={id} />
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="p-3 border-violet-400 bg-violet-400/20"
          >
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              value={text}
              placeholder="Add new task..."
              className="min-h-20 w-full rounded text-sm bg-transparent text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => dispatch(setCardEditingId(""))}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Update</span>
                <FiEdit3 />
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-neutral-100">{title}</p>
        )}
      </div>
      <span className="flex justify-end mt-[2px] text-[10px] text-neutral-600">
        {formattedDate}
      </span>
    </>
  );
};

export default Card;
