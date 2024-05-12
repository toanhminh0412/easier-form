import DOMPurify from "isomorphic-dompurify";

export default function SafeHtml({ htmlContent, className }) {
    const safeHTML = DOMPurify.sanitize(htmlContent);
    return <div className={className} dangerouslySetInnerHTML={{ __html: safeHTML }} />;
}