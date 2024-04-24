"use client";
import { RootState } from "@/lib";
import { setCards } from "@/lib/slices/Allslices";
import { AddCardProps, CardType } from "@/types";
import { FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const AddCard = ({ column }: AddCardProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const cards = useSelector((state: RootState) => state.cards);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const date = new Date();
    const dateString = date.toISOString();

    const newCard: CardType = {
      id: Math.random().toString(),
      title: text.trim(),
      priority: "low",
      column,
      createdAt: dateString,
    };

    console.log(dateString);

    const newCards = [...cards, newCard];

    dispatch(setCards(newCards));

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-primary bg-primary/20 p-3 text-sm placeholder-primary focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs transition-colors text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs bg-neutral-50 hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full justify-end items-center gap-1.5 py-1.5 text-xs transition-colors text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};

export default AddCard;
