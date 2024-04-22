"use client";
import { FormEvent, useState } from "react";
import { CardProjectProps, CardType } from "@/types";
import DropIndicator from "./dropIndicator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib";
import {
  setCardEditingId,
  setCards,
  setSelectedProjectId,
} from "@/lib/slices/Allslices";
import { FiEdit3 } from "react-icons/fi";
import ActionsCard from "./actionsCard";

const CardProject = ({
  id,
  project,
  createdAt,
  handleDragStart,
}: CardProjectProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(project);
  const [isdragging, setIsdragging] = useState<boolean>(false);

  const cards = useSelector((state: RootState) => state.cards);
  const cardEditingId = useSelector((state: RootState) => state.cardEditingId);
  const isEditing = cardEditingId === id;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCards: CardType[] = cards.map((item) => {
      if (item?.id === id) {
        return { ...item, project: text };
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
      <DropIndicator beforeId={id} column="projects" />
      <div
        draggable="true"
        onDragStart={(e) => {
          setIsdragging(true);
          handleDragStart(e, { project, id, column: "projects" });
        }}
        onDragEnd={() => setIsdragging(false)}
        onClick={() => dispatch(setSelectedProjectId(id))}
        className={`relative cursor-grab rounded border border-neutral-700 bg-neutral-800 group active:cursor-grabbing ${
          isEditing ? "" : "p-3"
        }`}
      >
        {!isdragging && <ActionsCard id={id} />}
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
          <p className="text-sm text-neutral-100">{project}</p>
        )}
      </div>
    </>
  );
};

export default CardProject;
