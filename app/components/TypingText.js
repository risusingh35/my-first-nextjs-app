import React, { useState, useEffect } from 'react';

const TypingText = ({ words, delay }) => {
  const [currentChar, setCurrentChar] = useState(0);
  const [text, setText] = useState('');
console.log('words---------',words, typeof words);
  useEffect(() => {
    const typeWriter = async () => {
      const chars = words[0].split('');

      for (let i = 0; i < chars.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setText((prevText) => prevText + chars[i]);
      }
    };

    typeWriter(); // Call the typing function on component mount
  }, [words, delay]);

  return (
    <span>
      {text}
    </span>
  );
};

export default TypingText;
