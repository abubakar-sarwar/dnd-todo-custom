"use client";
import { RootState } from "@/lib";
import {
  setCardEditingId,
  setCards,
  setDropDown,
  setDropDownClose,
} from "@/lib/slices/Allslices";
import { CardActionProps, CardType, PriorityType } from "@/types";
import { useEffect, useRef } from "react";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { FiEdit3, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const ActionsCard = ({ id }: CardActionProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const cards = useSelector((state: RootState) => state.cards);
  const dropdownOpenId = useSelector((state: RootState) => state.dropDown);
  const isDropDownOpen = dropdownOpenId === id;
  const cardEditingId = useSelector((state: RootState) => state.cardEditingId);
  const isEditing = cardEditingId === id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        dispatch(setDropDownClose());
      }
    };

    if (isDropDownOpen) document.addEventListener("click", handleClickOutside);
    else document.removeEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropDownOpen]);

  const setEditing = () => {
    dispatch(setDropDownClose());
    dispatch(setCardEditingId(id));
  };

  const openDropdown = () => {
    dispatch(setDropDown(id));
  };

  const setPriority = (priority: PriorityType) => {
    const newCards: CardType[] = cards.map((item) => {
      if (item?.id === id) {
        return { ...item, priority: priority };
      } else return item;
    });

    dispatch(setCards(newCards));
    dispatch(setDropDownClose());
  };

  const deleteCard = () => {
    const newCards: CardType[] = cards.filter((item) => item?.id !== id);

    dispatch(setCards(newCards));
    dispatch(setDropDownClose());
  };

  return (
    <div
      className={`absolute top-3 right-2 duration-150 group-hover:opacity-100 group-hover:visible ${
        isEditing ? "hidden" : ""
      } ${isDropDownOpen ? "" : "opacity-0 invisible"}`}
    >
      <button ref={btnRef} className="px-1" onClick={openDropdown}>
        <FiMoreVertical />
      </button>
      <div
        className={`absolute top-full right-0 z-30 ${
          isDropDownOpen ? "" : "opacity-0 invisible"
        }`}
      >
        <ul
          ref={menuRef}
          className="text-sm whitespace-nowrap py-1.5 rounded-md border border-neutral-700 bg-neutral-800"
        >
          <li>
            <button
              onClick={() => setPriority("low")}
              className="pl-3 pr-7 w-full py-1 flex items-center space-x-2 duration-100 hover:bg-neutral-900"
            >
              <FcLowPriority />
              <span>Priority Low</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPriority("medium")}
              className="pl-3 pr-7 w-full py-1 flex items-center space-x-2 duration-100 hover:bg-neutral-900"
            >
              <FcMediumPriority />
              <span>Priority Medium</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPriority("high")}
              className="pl-3 pr-7 w-full py-1 flex items-center space-x-2 duration-100 hover:bg-neutral-900"
            >
              <FcHighPriority />
              <span>Priority High</span>
            </button>
          </li>
          <li>
            <hr className="w-full my-1 border-neutral-700" />
          </li>
          <li>
            <button
              onClick={setEditing}
              className="pl-3 pr-7 w-full py-1 flex items-center space-x-2 duration-100 hover:bg-neutral-900"
            >
              <FiEdit3 />
              <span>Edit</span>
            </button>
          </li>
          <li>
            <button
              onClick={deleteCard}
              className="pl-3 pr-7 w-full py-1 flex items-center space-x-2 duration-100 hover:bg-neutral-900"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionsCard;
