import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import GroupIcon from "@mui/icons-material/Group"
import CommentIcon from "@mui/icons-material/Comment"
import AttachmentIcon from "@mui/icons-material/Attachment"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
export const CardItem = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card?._id, data: { ...card } })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #1976d2" : undefined,
    // touchAction: "none",
  }
  return (
    <>
      <Card
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
          opacity: card?.Fe_PlaceholderCard ? "0" : "1",
          border: "1px solid transparent",
          "&:hover": { borderColor: "primary.secondary" },
        }}
      >
        {card?.cover && (
          <CardMedia
            sx={{ height: 140 }}
            image="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
            title="green iguana"
          />
        )}
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>
        {card?.comments?.length > 0 && (
          <CardActions sx={{ p: "0 4px 8px 4px" }}>
            <Button size="small" startIcon={<GroupIcon />}>
              20
            </Button>
            <Button size="small" startIcon={<CommentIcon />}>
              15
            </Button>
            <Button size="small" startIcon={<AttachmentIcon />}>
              10
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  )
}
