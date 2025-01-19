import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType, UnderlineType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { marked } from 'marked';

interface DocxSection {
  type: string;
  text: string;
  depth?: number;
}

function parseMarkdown(markdown: string): DocxSection[] {
  const tokens = marked.lexer(markdown);
  const sections: DocxSection[] = [];

  tokens.forEach(token => {
    if (token.type === 'heading') {
      sections.push({
        type: 'heading',
        text: token.text,
        depth: token.depth
      });
    } else if (token.type === 'paragraph') {
      sections.push({
        type: 'paragraph',
        text: token.text
      });
    } else if (token.type === 'list') {
      token.items.forEach(item => {
        sections.push({
          type: 'listItem',
          text: item.text
        });
      });
    }
  });

  return sections;
}

function createHeading(text: string, level: number) {
  return new Paragraph({
    text,
    heading: HeadingLevel[`HEADING_${level}`],
    spacing: {
      before: 400,
      after: 200
    },
    border: {
      bottom: {
        color: "999999",
        size: 1,
        style: BorderStyle.SINGLE,
      },
    },
  });
}

function createParagraph(text: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 24,
      }),
    ],
    spacing: {
      before: 200,
      after: 200,
    },
  });
}

function createListItem(text: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text: "• " + text,
        size: 24,
      }),
    ],
    spacing: {
      before: 100,
      after: 100,
    },
    indent: {
      left: 720, // 0.5 inch
    },
  });
}

export async function exportToDocx(content: string, filename: string = 'updated-resume.docx') {
  const sections = parseMarkdown(content);
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections.map(section => {
        switch (section.type) {
          case 'heading':
            return createHeading(section.text, section.depth || 1);
          case 'listItem':
            return createListItem(section.text);
          default:
            return createParagraph(section.text);
        }
      }),
    }],
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, filename);
}