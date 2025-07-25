import { useLocalStorage } from "usehooks-ts";
import {
  ComponentShapeKey,
  ComponentShapes,
  type ComponentShapeSwitcherProps,
} from "./types";
import { useEffect } from "react";
import {
  type ToggleButtonGroupItem,
  ColorTheme,
  ToggleButtonGroup,
} from "@adgytec/adgytec-web-ui-components";
import { type Key } from "react-aria-components";

export const ComponentShapeSwitcher = ({
  ui = true,
}: ComponentShapeSwitcherProps) => {
  const [selectedShape, setShape, _] = useLocalStorage(
    ComponentShapeKey,
    ComponentShapes.sharp,
  );

  const shapeItems: ToggleButtonGroupItem[] = [
    {
      id: ComponentShapes.sharp,
      value: "Shape",
    },
    {
      id: ComponentShapes.round,
      value: "Round",
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-shape", selectedShape);
  }, [selectedShape]);

  const handleShapeChange = (keys: Set<Key>) => {
    const shape = Array.from(keys)[0] as ComponentShapes;
    if (!shape) return;

    setShape(shape);
  };

  if (!ui) return <></>;

  return (
    <ToggleButtonGroup
      items={shapeItems}
      selectionMode="single"
      selectedKeys={[selectedShape]}
      onSelectionChange={handleShapeChange}
      theme={ColorTheme.primaryVariant}
    />
  );
};
