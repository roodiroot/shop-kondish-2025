"use client";

import Link from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { marked } from "marked";

interface QAItemProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  value: string;
  answer?: string;
  link?: string;
}

const QAItem: React.FC<QAItemProps> = ({ question, answer, value, link }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await marked(answer ?? "");
      setHtmlContent(html);
    };

    convertMarkdownToHtml();
  }, [answer]);

  return (
    <AccordionItem
      className="border-0 bg-gray-100 px-4 rounded-lg"
      value={value}
    >
      <AccordionTrigger className="text-base font-bold hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent>
        <div
          className="text-sm markdown"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
        {link ? (
          <div className="mt-4">
            <Link className="text-primary" href={link}>
              Читать подробнее
            </Link>
          </div>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  );
};

export default QAItem;
