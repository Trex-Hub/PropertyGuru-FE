import React, { FC, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface HtmlContentProps {
  style?: React.CSSProperties;
  className?: string;
  children: string | TrustedHTML;
  stripeStype?: boolean;
}

const HtmlContent: FC<HtmlContentProps> = props => {
  const { className = '', style, children, stripeStype = false } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && typeof children === 'string') {
      const sanitizedContent = DOMPurify.sanitize(
        stripeStype ? children.replace(/style=".*?"/gm, '') : children
      );
      contentRef.current.innerHTML = sanitizedContent;
    }
  }, [children, stripeStype]);

  return <div ref={contentRef} style={style} className={className} />;
};

export default HtmlContent;
