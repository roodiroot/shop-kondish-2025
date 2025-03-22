"use client";

import { cn } from "@/lib/utils";
import { marked } from "marked";
import { useEffect, useState } from "react";

interface BlogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content, className }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await marked(content ?? "");
      setHtmlContent(html);
    };

    convertMarkdownToHtml();
  }, [content]);

  return (
    <div
      className={cn("markdown", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default BlogContent;
