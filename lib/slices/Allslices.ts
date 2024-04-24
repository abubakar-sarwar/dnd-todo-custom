"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib";
import { CardType, ProjectType } from "@/types";

type priorityColors = {
  medium: string;
  high: string;
};

type SetPriorityColorTypes = {
  color: string;
  type: string;
};

interface AuthState {
  projects: ProjectType[];
  selectedProjectId: string;
  cards: CardType[];
  dropDown: string;
  cardEditingId: string;
  dragType: string;
  theme: string;
  primary: string;
  priorityColors: priorityColors;
}

const initialState: AuthState = {
  projects: [],
  selectedProjectId: "",
  cards: [],
  dropDown: "",
  cardEditingId: "",
  dragType: "",
  theme: "",
  primary: "",
  priorityColors: {
    medium: "",
    high: "",
  },
};

export const Allslice = createSlice({
  name: "Allslice",
  initialState,
  reducers: {
    setDropDown: (state, action: PayloadAction<string>) => {
      if (state.dropDown === action.payload) {
        state.dropDown = "";
      } else {
        state.dropDown = action.payload;
      }
    },
    setDropDownClose: (state) => {
      state.dropDown = "";
    },
    setCardEditingId: (state, action: PayloadAction<string>) => {
      state.cardEditingId = action.payload;
    },
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload;
      state.projects = state.projects.map((pro) => {
        if (pro.id === state.selectedProjectId) {
          return { ...pro, todo: action.payload };
        } else {
          return pro;
        }
      });
    },
    setSelectedProjectId: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
      const project = state.projects.find((pro) => pro?.id === action.payload);

      if (project) {
        state.cards = project.todo;
      }
    },
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.projects = action.payload;
    },
    setDragType: (state, action: PayloadAction<string>) => {
      state.dragType = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;

      if (
        action.payload === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        action.payload = "dark";
      }
      document.documentElement.setAttribute("class", action.payload);
    },
    setPrimary: (state, action: PayloadAction<string>) => {
      state.primary = action.payload;
    },
    setPriorityColor: (state, action: PayloadAction<SetPriorityColorTypes>) => {
      const { type, color } = action.payload;
      state.priorityColors = { ...state.priorityColors, [type]: color };
    },
  },
});

export const selectAuth = (state: RootState) => state._persist;

export const {
  setDropDown,
  setDropDownClose,
  setCardEditingId,
  setCards,
  setSelectedProjectId,
  setProjects,
  setDragType,
  setTheme,
  setPrimary,
  setPriorityColor,
} = Allslice.actions;

export default Allslice.reducer;
