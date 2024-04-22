"use client";
import { Column, ColumnProjects } from "@/app/_components";
import { useSelector } from "react-redux";
import { RootState } from "@/lib";

const TodoAppPage = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <div className="flex h-full w-full gap-5 px-5 py-10">
        <ColumnProjects projects={projects} columnType="projects" />
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          columnType="todo"
          cards={cards}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          columnType="todo"
          cards={cards}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          columnType="todo"
          cards={cards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          columnType="todo"
          cards={cards}
        />
      </div>
    </div>
  );
};

export default TodoAppPage;
