import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { ListColumns } from "~/pages/Boards/BoardConent/ListColumns/ListColumns";
import theme from "~/theme";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board;

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

  function mapOrder(list, order, key) {
    const map = new Map(list.map((item) => [item[key], item]));
    return order.map((id) => map.get(id));
  }
  const orderedColumns = useMemo(() => {
    if (!columns || !columnOrderIds) return [];

    return mapOrder(columns, columnOrderIds, "_id");
  }, [columns, columnOrderIds]);

  const [orderedColumnsState, setOrderedColumnsState] =
    useState(orderedColumns);

  const handleDragEnd = (event) => {
    console.log("🚀 ~ handleDragEnd ~ event:", event);
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(
        (c) => c._id === active.id
      );
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id);
      const newOrderedColumns = arrayMove(
        orderedColumnsState,
        oldIndex,
        newIndex
      );
      // const newColumnOrderIds = newOrderedColumns.map((c) => c._id);
      // console.log("🚀 ~ handleDragEnd ~ newColumnOrderIds:", newColumnOrderIds);
      setOrderedColumnsState(newOrderedColumns);
    }
    console.log("Drag Ended:", event);
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            width: "100%",
            height: theme.trello.boardContentHeight,
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            p: "10px 0  ",
          }}
        >
          <ListColumns columns={orderedColumnsState} />
        </Box>
      </DndContext>
    </div>
  );
}

export default BoardContent;
