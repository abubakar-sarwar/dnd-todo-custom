"use client";
import { FormEvent, useState } from "react";
import { CardProjectProps, ProjectType } from "@/types";
import DropIndicator from "./dropIndicator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib";
import {
  setCardEditingId,
  setProjects,
  setSelectedProjectId,
} from "@/lib/slices/Allslices";
import { FiEdit3 } from "react-icons/fi";
import ActionsProjectCard from "./actionsProjectCard";

const CardProject = ({
  id,
  project,
  createdAt,
  handleDragStart,
}: CardProjectProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(project);
  const [isdragging, setIsdragging] = useState<boolean>(false);

  const projects = useSelector((state: RootState) => state.projects);
  const cardEditingId = useSelector((state: RootState) => state.cardEditingId);
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );
  const isEditing = cardEditingId === id;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newProjects: ProjectType[] = projects.map((item) => {
      if (item?.id === id) {
        return { ...item, project: text };
      } else return item;
    });

    dispatch(setProjects(newProjects));

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

  const dropdownOpenId = useSelector((state: RootState) => state.dropDown);
  const isDropDownOpen = dropdownOpenId === id;

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
        onClick={() => {
          if (!isDropDownOpen) {
            dispatch(setSelectedProjectId(id));
          }
        }}
        className={`relative cursor-pointer rounded border bg-white dark:bg-neutral-800 group active:cursor-grabbing ${
          isEditing ? "border-primary" : "p-3 dark:border-neutral-700"
        } ${selectedProjectId === id ? "border-primary" : ""}`}
      >
        {!isdragging && <ActionsProjectCard id={id} />}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-3 bg-primary/20">
            <input
              onChange={(e) => setText(e.target.value)}
              autoFocus
              value={text}
              placeholder="Add new task..."
              className="w-full rounded text-sm bg-transparent placeholder-primary focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => dispatch(setCardEditingId(""))}
                className="px-3 py-1.5 text-xs transition-colors text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-neutral-950 transition-colors bg-neutral-50 hover:bg-neutral-300"
              >
                <span>Update</span>
                <FiEdit3 />
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm">{project}</p>
        )}
      </div>
    </>
  );
};

export default CardProject;
