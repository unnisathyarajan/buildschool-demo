import React from 'react';
import { marked } from 'marked';

interface ResumePreviewProps {
  content: string;
  format: 'plain' | 'json' | 'html' | 'docx';
}

export default function ResumePreview({ content, format }: ResumePreviewProps) {
  const getFormattedContent = () => {
    switch (format) {
      case 'json':
        try {
          // Convert markdown to JSON structure
          const sections = marked.lexer(content);
          return JSON.stringify(sections, null, 2);
        } catch (err) {
          console.error('Error formatting JSON:', err);
          return content;
        }
      case 'html':
        // Convert markdown to HTML with styling classes
        return marked(content, {
          gfm: true,
          breaks: true,
          headerIds: false
        });
      case 'docx':
        // Show markdown preview for DOCX format
        return marked(content, {
          gfm: true,
          breaks: true,
          headerIds: false
        });
      default:
        return content;
    }
  };

  const previewClasses = {
    plain: 'font-mono whitespace-pre-wrap',
    json: 'font-mono',
    html: 'prose max-w-none',
    docx: 'prose max-w-none'
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 overflow-x-auto ${previewClasses[format]}`}>
      {format === 'html' || format === 'docx' ? (
        <div dangerouslySetInnerHTML={{ __html: getFormattedContent() }} />
      ) : (
        <pre className="whitespace-pre-wrap">{getFormattedContent()}</pre>
      )}
    </div>
  );
}