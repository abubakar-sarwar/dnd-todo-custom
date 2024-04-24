"use client";
import { Column, ColumnProjects } from "@/app/_components";
import { useSelector } from "react-redux";
import { RootState } from "@/lib";

const TodoAppPage = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <div className="h-screen w-full bg-[#f0f0f0] dark:bg-neutral-900 dark:text-neutral-50">
      <div className="fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-neutral-800">
        <ColumnProjects projects={projects} columnType="projects" />
      </div>
      <section className="ml-[260px]">
        <div className="flex h-full min-h-[95vh] w-full gap-5 px-4 py-5">
          <Column
            title="Backlog"
            column="backlog"
            headingColor="text-neutral-800 dark:text-neutral-500"
            columnType="todo"
            cards={cards}
          />
          <Column
            title="TODO"
            column="todo"
            headingColor="text-yellow-500 dark:text-yellow-200"
            columnType="todo"
            cards={cards}
          />
          <Column
            title="In progress"
            column="doing"
            headingColor="text-blue-500 dark:text-blue-200"
            columnType="todo"
            cards={cards}
          />
          <Column
            title="Complete"
            column="done"
            headingColor="text-emerald-500 dark:text-emerald-200"
            columnType="todo"
            cards={cards}
          />
        </div>
      </section>
    </div>
  );
};

export default TodoAppPage;
