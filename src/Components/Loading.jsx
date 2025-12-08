import { Skeleton, useTheme } from "@mui/material";
import React from "react";

const Loading = () => {
  const theme = useTheme();
  return (
    <div className="p-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        sx={{ bgcolor: theme.palette.mode === "dark" ? "#374151" : "#e5e7eb" }}
      />

      <div className="flex gap-9 mt-8">
        <Skeleton
          variant="rectangular"
          width="70%"
          height={400}
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#374151" : "#e5e7eb",
          }}
        />
        <div className="flex flex-1 flex-col gap-5">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={190}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#374151" : "#e5e7eb",
            }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={190}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#374151" : "#e5e7eb",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
