"use client";
import { setPriorityColor } from "@/lib/slices/Allslices";
import { hexToRgb } from "@/utils";
import { ChangeEvent } from "react";
import { CgColorPicker } from "react-icons/cg";
import { useDispatch } from "react-redux";

const PriorityColorSettings = () => {
  const dispatch = useDispatch();

  const convertSetPrimary = (
    e: ChangeEvent<HTMLInputElement>,
    type: "medium" | "high"
  ) => {
    const value = e.target.value;
    const color = hexToRgb(value);

    if (color) changePrimary(color, type);
  };

  const varNames = {
    medium: "--color-priority-medium",
    high: "--color-priority-high",
  };

  const changePrimary = (color: string, type: "medium" | "high") => {
    document.documentElement.style.setProperty(varNames[type], color);
    dispatch(setPriorityColor({ color, type }));
  };

  return (
    <div className="mt-5">
      <h3 className="font-bold">Priority Color</h3>
      <table>
        <tbody>
          <tr>
            <td className="pr-7 py-2">Medium Priority Color</td>
            <td className="py-1.5">
              <label className="relative block size-[35px] rounded-md p-1 order border border-priority-medium">
                <div className="size-full rounded-md flex items-center justify-center bg-priority-medium">
                  <CgColorPicker />
                  <input
                    type="color"
                    className="opacity-0 invisible absolute bottom-3"
                    onChange={(e) => convertSetPrimary(e, "medium")}
                  />
                </div>
              </label>
            </td>
          </tr>
          <tr>
            <td className="pr-7 py-2">High Priority Color</td>
            <td className="py-1.5">
              <label className="relative block size-[35px] rounded-md p-1 order border border-priority-high">
                <div className="size-full rounded-md flex items-center justify-center bg-priority-high">
                  <CgColorPicker />
                  <input
                    type="color"
                    className="opacity-0 invisible absolute bottom-3"
                    onChange={(e) => convertSetPrimary(e, "high")}
                  />
                </div>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriorityColorSettings;
