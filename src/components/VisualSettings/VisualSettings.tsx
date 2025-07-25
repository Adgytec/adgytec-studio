import {
  ButtonShape,
  ColorTheme,
  PopoverDialog,
  TextButton,
} from "@adgytec/adgytec-web-ui-components";
import { ComponentShapeSwitcher } from "../ComponentShapeSwitcher/ComponentShapeSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Settings } from "lucide-react";
import styles from "./visual-settings.module.css";

export const VisualSettings = ({ ui = true }: { ui?: boolean }) => {
  if (!ui) {
    return (
      <>
        <ThemeSwitcher ui={false} />
        <ComponentShapeSwitcher ui={false} />
      </>
    );
  }

  const visualSettingsItems = [
    {
      Component: ThemeSwitcher,
      heading: "Personalize Color Theme",
      description: "Adjust the app's overall color scheme.",
    },
    {
      Component: ComponentShapeSwitcher,
      heading: "Edge Style",
      description: "Toggle between rounded and sharp component edges.",
    },
  ];

  const itemTheme = ColorTheme.inverseSurface;

  return (
    <PopoverDialog
      trigger={
        <TextButton
          shape={ButtonShape.square}
          description="Visual Settings"
          theme={itemTheme}
        >
          <Settings />
        </TextButton>
      }
    >
      <div className={styles["visual-settings"]}>
        {visualSettingsItems.map((visualItem) => {
          return (
            <div className={styles["settings-item"]} key={visualItem.heading}>
              <div>
                <h3 data-heading="true">{visualItem.heading}</h3>
                <p>{visualItem.description}</p>
              </div>
              <visualItem.Component theme={itemTheme} />
            </div>
          );
        })}
      </div>
    </PopoverDialog>
  );
};
