import BaseContainer from "@/components/general/containers/base-container";
import ContentMarkdown from "@/components/general/content-markdown";

interface AboutSectionProps {
  content?: string;
}
const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  return (
    <BaseContainer className="mt-10 mb-20">
      <h2 className="text-2xl sm:text-3xl font-bold">О Kondish.ru</h2>
      <ContentMarkdown className="flex-1 max-w-2xl text-sm" content={content} />
    </BaseContainer>
  );
};

export default AboutSection;
