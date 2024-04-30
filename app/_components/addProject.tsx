"use client";
import { RootState } from "@/lib";
import { setProjects } from "@/lib/slices/Allslices";
import { ProjectType } from "@/types";
import { FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const AddProject = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const projects = useSelector((state: RootState) => state.projects);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const date = new Date();
    const dateString = date.toISOString();

    const newProject: ProjectType = {
      id: `${projects?.length + 1}`,
      project: text.trim(),
      todo: [],
      createdAt: dateString,
    };

    const newProjects = [...projects, newProject];

    dispatch(setProjects(newProjects));

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new project..."
            className="w-full rounded border border-primary bg-primary/20 p-3 text-sm placeholder-primary focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-800 transition-colors dark:hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-600 hover:bg-neutral-800 dark:bg-neutral-50 px-3 py-1.5 text-xs text-neutral-50 dark:text-neutral-950 transition-colors dark:hover:bg-neutral-300"
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
          <span>Add project</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};

export default AddProject;
