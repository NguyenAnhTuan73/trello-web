import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Box } from "@mui/material"
import { cloneDeep, isEmpty } from "lodash"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  MouseSensor,
  PointerSensor,
  TouchSensor,
} from "~/customLibraries/DndKitSensor"
import Columns from "~/pages/Boards/BoardConent/ListColumns/Columns/Columns"
import { CardItem } from "~/pages/Boards/BoardConent/ListColumns/Columns/ListCards/Card/CardItem"
import { ListColumns } from "~/pages/Boards/BoardConent/ListColumns/ListColumns"
import theme from "~/theme"

import { generatePlaceholderCard, mapOrder } from "~/utils/sorts"

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
}

function BoardContent({ board, createNewColumn, createNewCard, moveColumns }) {
  const { columns, columnOrderIds } = board

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  })
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null)
  const lastOverId = useRef(null)

  const initialOrderedColumns = useMemo(() => {
    if (!columns || !columnOrderIds) return []
    return mapOrder(columns, columnOrderIds, "_id")
  }, [columns, columnOrderIds])

  const [orderedColumns, setOrderedColumns] = useState(initialOrderedColumns)

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards?.map((card) => card._id)?.includes(cardId),
    )
  }
  // useEffect(() => {
  //   setOrderedColumns(initialOrderedColumns)
  // }, [initialOrderedColumns])

  const handleDragStart = (event) => {
    const { active } = event
    // console.log("🚀 ~ handleDragStart ~ event:", event);

    setActiveDragItemId(active?.id)
    setActiveDragItemType(
      active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    )
    setActiveDragItemData(active?.data?.current)
    if (active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(active?.id))
    }
  }

  const moveCardBetweenDiffrentColumns = (
    overColumn,
    overDraggingId,
    active,
    over,
    activeColumn,
    activeDraggingId,
    activeDraggingCardData,
  ) => {
    setOrderedColumns((prevOrderedColumns) => {
      // Tìm vị trí (index) của overCard trong column đích (nơi sắp được thả vào)
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overDraggingId,
      )
      // logic tinh newCardIndex
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const mofifyIndex = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + mofifyIndex
          : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevOrderedColumns)
      const nextActiveColumn = nextColumns.find(
        (col) => col._id === activeColumn._id,
      )
      const nextOverColumn = nextColumns.find(
        (col) => col._id === overColumn._id,
      )
      // nextActiveColmun la column cu
      if (nextActiveColumn) {
        // Xóa card khỏi cột ban đầu activeColumn
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingId,
        )
        // Thêm placeholder card nếu card rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cập nhật lại cardOrderIds của cột activeColumn
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id,
        )
      }
      if (nextOverColumn) {
        // kiem tra xem card dang keo da ton tai trong overColumn chua
        nextOverColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id === activeDraggingId,
        )
        // Thêm card vào cột đích overColumn tại vị trí newCardIndex
        nextOverColumn.cards.splice(newCardIndex, 0, activeDraggingCardData)
        // nextOverColumn.cards = nextOverColumn.cards.filter(
        //   (card) => !card.Fe_PlaceholderCard,
        // );
      }

      return nextColumns
    })
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log("🚀 ~ handleDragOver ~ event:", event);

    if (!active || !over) return
    // card dang keo
    const {
      id: activeDraggingId,
      data: { current: activeDraggingCardData },
    } = active
    // over card la card dang tuong tac
    const { id: overDraggingId } = over

    const activeColumn = findColumnByCardId(activeDraggingId)

    const overColumn = findColumnByCardId(overDraggingId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffrentColumns(
        overColumn,
        overDraggingId,
        active,
        over,
        activeColumn,
        activeDraggingId,
        activeDraggingCardData,
      )
    } else {
      //
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || !active) return
    // Xu ly drag card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingId,
        data: { current: activeDraggingCardData },
      } = active
      // over card la card dang tuong tac
      const { id: overDraggingId } = over
      const activeColumn = findColumnByCardId(activeDraggingId)
      const overColumn = findColumnByCardId(overDraggingId)

      if (!activeColumn || !overColumn) return

      if (oldColumnDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiffrentColumns(
          overColumn,
          overDraggingId,
          active,
          over,
          activeColumn,
          activeDraggingId,
          activeDraggingCardData,
        )
      } else {
        // Xử lý khi kéo card trong cùng một cột
        // Lay index tu oldColumnDraggingCard

        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId,
        )
        const newCardIndex = orderedColumns?.findIndex(
          (c) => c._id === overDraggingId,
        )

        // Di chuyển thẻ trong cùng một cột
        const newOrderedCards = arrayMove(
          oldColumnDraggingCard.cards,
          oldCardIndex,
          newCardIndex,
        )

        setOrderedColumns((prevOrderedColumns) => {
          const nextColumns = cloneDeep(prevOrderedColumns)
          const targetColumn = nextColumns.find(
            (col) => col._id === overColumn._id,
          )

          // Cập nhật danh sách card va cardOrderIds
          targetColumn.cards = newOrderedCards
          targetColumn.cardOrderIds = newOrderedCards.map((card) => card._id)
          return nextColumns
        })
      }
    }
    // Xu ly drag column
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (c) => c._id === active.id,
      )
      const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const newOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex,
      )
      // const newColumnOrderIds = newOrderedColumns.map((c) => c._id);
      // console.log("🚀 ~ handleDragEnd ~ newColumnOrderIds:", newColumnOrderIds);
      moveColumns(newOrderedColumns)
      setOrderedColumns(newOrderedColumns)
    }
    // Reset state
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.5" },
      },
    }),
  }
  // collisionDetectionStrategy >>> custom xử lý thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa các columns
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Trường hợp kéo column thì dùng thuật toán closestCorners
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return

      // const intersections =
      //   pointerIntersections.length > 0
      //     ? // If there are droppables intersecting with the pointer, return those
      //       pointerIntersections
      //     : rectIntersection(args);
      let overId = getFirstCollision(pointerIntersections, "id")
      if (overId) {
        // closestCorners dùng mượt mà hơn closestCenter
        const checkColumn = orderedColumns.find((col) => col?._id === overId)
        // console.log(
        //   "🚀 ~ collisionDetectionStrategy ~ checkColumn:",
        //   checkColumn,
        // )
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                )
              },
            )[0]?.id,
          })
        }
        lastOverId.current = overId

        return [{ id: overId }]
      }
      // nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns],
  )

  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={collisionDetectionStrategy}
        sensors={sensors}
      >
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
          <ListColumns
            columns={orderedColumns}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
          />
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}{" "}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Columns column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <CardItem card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </div>
  )
}

export default BoardContent
