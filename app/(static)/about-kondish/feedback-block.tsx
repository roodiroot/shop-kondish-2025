import BlockContainer from "@/components/general/containers/block-container";
import FeedbackFormBlock from "@/components/general/forms/feedback-form-block";

const FeedbackBlock = () => {
  return (
    <BlockContainer>
      <h3 className="text-xl font-bold">Напишите нам</h3>
      <div className="relative z-10 w-full mt-4">
        <FeedbackFormBlock />
      </div>
    </BlockContainer>
  );
};

export default FeedbackBlock;
