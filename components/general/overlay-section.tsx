import { Suspense } from "react";

import AuthSheet from "./auth/sheet";
import FeedBackSheet from "./forms/feedback-sheet/feedback-sheet";
import SortSheet from "./sort-and-filters.tsx/sort-sheet";

const OverlaySection = () => {
  return (
    <>
      <AuthSheet />
      <SortSheet />
      <Suspense>
        <FeedBackSheet />
      </Suspense>
    </>
  );
};

export default OverlaySection;
