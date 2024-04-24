"use client";
import { RootState } from "@/lib";
import { setPrimary, setPriorityColor, setTheme } from "@/lib/slices/Allslices";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaLaptop } from "react-icons/fa";
import { FiMoon, FiSettings, FiSun, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CgColorPicker } from "react-icons/cg";
import PriorityColorSettings from "./priorityColorSettings";
import { hexToRgb } from "@/utils";
import { RxReset } from "react-icons/rx";

const Settings = () => {
  const dispatch = useDispatch();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentTheme = useSelector((state: RootState) => state.theme);
  const priorityColors = useSelector(
    (state: RootState) => state.priorityColors
  );
  const currentPrimary = useSelector((state: RootState) => state.primary);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    let current = currentTheme;
    if (
      current === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      current = "dark";
    }

    document.documentElement.style.setProperty(
      "--color-primary",
      currentPrimary
    );
    document.documentElement.style.setProperty(
      "--color-priority-medium",
      priorityColors.medium
    );
    document.documentElement.style.setProperty(
      "--color-priority-high",
      priorityColors.high
    );
    document.documentElement.setAttribute("class", current);
  }, []);

  const toggleTheme = (theme: "dark" | "system" | "light") => {
    dispatch(setTheme(theme));
  };

  const convertSetPrimary = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const color = hexToRgb(value);

    if (color) changePrimary(color);
  };

  const changePrimary = (color: string) => {
    document.documentElement.style.setProperty("--color-primary", color);
    dispatch(setPrimary(color));
  };

  const colors = [
    "167 139 250",
    "13 147 148",
    "255 171 29",
    "235 61 99",
    "32 146 236",
  ];

  const resetColors = () => {
    document.documentElement.style.setProperty(
      "--color-primary",
      "167 139 250"
    );
    document.documentElement.style.setProperty(
      "--color-priority-medium",
      "234 179 8"
    );
    document.documentElement.style.setProperty(
      "--color-priority-high",
      "239 68 68"
    );
    dispatch(setPrimary("167 139 250"));
    dispatch(setPriorityColor({ color: "234 179 8", type: "medium" }));
    dispatch(setPriorityColor({ color: "239 68 68", type: "high" }));
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 10">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center text-lg size-10 rounded-full bg-primary"
        >
          <FiSettings className="animate-spin-slow duration-700" />
        </button>
      </div>
      <div
        ref={menuRef}
        className={`w-[400px] duration-300 flex flex-col fixed top-0 bottom-0 z-20 bg-white dark:bg-neutral-800 ${
          isOpen ? "right-0" : "right-[-400px]"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div>
            <h3 className="uppercase font-medium">Theme Customizer</h3>
            <p className="text-sm">Customize & Preview in Real Time</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetColors}
              className="rounded text-2xl font-bold"
            >
              <RxReset />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded text-2xl font-bold"
            >
              <FiX />
            </button>
          </div>
        </div>
        <div className="px-4 h-full overflow-y-auto pt-5">
          <div>
            <h3 className="font-bold">Primary Color</h3>
            <div className="flex items-center gap-3 mt-2">
              {colors?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => changePrimary(item)}
                  className={`size-[40px] rounded-[10px] p-[6px] order border ${
                    currentPrimary === item
                      ? "border-primary"
                      : "dark:border-neutral-700"
                  }`}
                >
                  <div
                    className="size-full rounded-[6px]"
                    style={{ backgroundColor: `rgb(${item})` }}
                  />
                </button>
              ))}
              <label
                className={`relative block size-[40px] rounded-md p-1 order border ${
                  !colors.includes(currentPrimary)
                    ? "border-primary"
                    : "dark:border-neutral-700"
                }`}
              >
                <div
                  className={`size-full rounded-md flex items-center justify-center ${
                    !colors.includes(currentPrimary)
                      ? "bg-primary"
                      : "bg-black/30 dark:bg-white/20"
                  }`}
                >
                  <CgColorPicker />
                  <input
                    type="color"
                    className="opacity-0 invisible absolute bottom-3"
                    onChange={convertSetPrimary}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Mode</h3>
            <div className="flex items-center gap-2.5 mt-2">
              <button
                onClick={() => toggleTheme("light")}
                className={`grow shrink aspect-video border rounded-md text-[27px] flex items-center justify-center ${
                  currentTheme === "light"
                    ? "border-primary bg-primary/10 text-primary"
                    : "dark:border-neutral-700"
                }`}
              >
                <FiSun />
              </button>
              <button
                onClick={() => toggleTheme("dark")}
                className={`grow shrink aspect-video border rounded-md text-[27px] flex items-center justify-center ${
                  currentTheme === "dark"
                    ? "border-primary bg-primary/10 text-primary"
                    : "dark:border-neutral-700"
                }`}
              >
                <FiMoon />
              </button>
              <button
                onClick={() => toggleTheme("system")}
                className={`grow shrink aspect-video border rounded-md text-[27px] flex items-center justify-center ${
                  currentTheme === "system"
                    ? "border-primary bg-primary/10 text-primary"
                    : "dark:border-neutral-700"
                }`}
              >
                <FaLaptop />
              </button>
            </div>
          </div>
          <PriorityColorSettings />
        </div>
      </div>
    </>
  );
};

export default Settings;
