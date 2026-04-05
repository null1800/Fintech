import DOMPurify from "dompurify";

export const SafeText = ({ html }: { html: string }) => {
  const cleanHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};
