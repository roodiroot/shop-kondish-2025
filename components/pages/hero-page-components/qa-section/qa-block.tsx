import { QA } from "@/types/catalog";
import QAItem from "./qa-item";
import { Accordion } from "@/components/ui/accordion";

interface QABlockProps {
  qaes?: QA[];
}

const QABlock: React.FC<QABlockProps> = ({ qaes }) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-1">
      {qaes
        ? qaes.map((qa) => (
            <QAItem
              key={qa.documentId}
              value={qa.documentId}
              question={qa.question}
              answer={qa?.answer}
              link={qa?.link}
            />
          ))
        : null}
    </Accordion>
  );
};

export default QABlock;
