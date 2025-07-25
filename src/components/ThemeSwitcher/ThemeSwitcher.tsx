import { useTernaryDarkMode, type TernaryDarkMode } from "usehooks-ts";
import {
  ColorTheme,
  ToggleButtonGroup,
  type ToggleButtonGroupItem,
} from "@adgytec/adgytec-web-ui-components";
import type { Key } from "react-aria-components";
import { useEffect } from "react";
import type { ThemeSwitcherProps } from "./types";

export const ThemeSwitcher = ({
  ui = true,
  theme = ColorTheme.primary,
}: ThemeSwitcherProps) => {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode();

  const themeItems: ToggleButtonGroupItem[] = [
    {
      id: "system",
      value: "System",
    },
    {
      id: "light",
      value: "Light",
    },
    {
      id: "dark",
      value: "Dark",
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const handleThemeChange = (keys: Set<Key>) => {
    const theme = Array.from(keys)[0] as TernaryDarkMode;
    if (!theme) return;

    setTernaryDarkMode(theme);
  };

  if (!ui) {
    return <></>;
  }

  return (
    <ToggleButtonGroup
      items={themeItems}
      selectionMode="single"
      selectedKeys={[ternaryDarkMode]}
      onSelectionChange={handleThemeChange}
      theme={theme}
    />
  );
};
