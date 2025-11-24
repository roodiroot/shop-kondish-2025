import AuthSheet from "./auth/sheet";
import FloatingContacts from "./fab/fab";
import FeedBackSheet from "./forms/feedback-sheet/feedback-sheet";
import SortSheet from "./sort-and-filters.tsx/sort-sheet";

const OverlaySection = () => {
  return (
    <>
      <FloatingContacts />
      <AuthSheet />
      <SortSheet />
      <FeedBackSheet />
    </>
  );
};

export default OverlaySection;
