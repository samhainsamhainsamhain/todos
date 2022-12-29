import React, { useRef, useEffect } from 'react';

interface ITextarea {
  classname?: string | string[];
  isReadOnly?: boolean;
  spellCheck?: boolean;
  value?: string;
  placeholder?: string;
  onChangeCallback: (e: string) => void;
  onClickCallback?: () => void;
  onBlurCallback?: () => void;
}

const Textarea = ({
  isReadOnly = true,
  spellCheck = false,
  classname,
  value,
  placeholder,
  onChangeCallback,
  onClickCallback,
  onBlurCallback,
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

    e.currentTarget.style.height = '24px';
    e.currentTarget.style.height = `${target.scrollHeight}px`;
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    resizeTextarea(event);
    onChangeCallback(event.currentTarget.value);
  }

  function onClickHandler() {
    onClickCallback && onClickCallback();
  }

  function onBlurHandler() {
    onBlurCallback && onBlurCallback();
  }

  return (
    <textarea
      className={`${classname} textarea ${!isReadOnly ? 'editable' : ''}`}
      ref={textareaRef}
      value={value}
      spellCheck={spellCheck}
      placeholder={!isReadOnly ? placeholder : ''}
      onChange={onChangeHandler}
      onClick={onClickHandler}
      onBlur={onBlurHandler}
      readOnly={isReadOnly}
    />
  );
};

export default Textarea;
