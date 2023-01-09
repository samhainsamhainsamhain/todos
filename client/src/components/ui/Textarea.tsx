import React, { useRef, useEffect } from 'react';

interface ITextarea {
  className?: string | string[];
  isReadOnly?: boolean;
  spellCheck?: boolean;
  value?: string;
  placeholder?: string;
  onChange: (e: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
}

// TODO wait for data download completion before resizing textareas

const Textarea = ({
  isReadOnly = true,
  spellCheck = false,
  className,
  value,
  placeholder,
  onChange,
  onClick,
  onBlur,
}: ITextarea) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (
      textareaRef.current &&
      textareaRef.current.scrollHeight > textareaRef.current.clientHeight
    ) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const resizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    e.currentTarget.style.height = '0px';
    e.currentTarget.style.height = `${target.scrollHeight}px`;
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    resizeTextarea(event);
    onChange(event.currentTarget.value);
  }

  return (
    <textarea
      className={`${className} textarea ${!isReadOnly ? 'editable' : ''}`}
      ref={textareaRef}
      value={value}
      spellCheck={spellCheck}
      placeholder={!isReadOnly ? placeholder : ''}
      onChange={onChangeHandler}
      onClick={onClick}
      onBlur={onBlur}
      readOnly={isReadOnly}
    />
  );
};

export default Textarea;
