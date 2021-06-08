import React, { useEffect, useState } from 'react';
import StylesRow from './StylesRow';

const StyleSelector = (props) => {
  const {
    styles,
    currentStyle,
    setCurrentStyle,
  } = props;

  const [styleList, setStyleList] = useState([]);

  const transformStyleArr = () => {
    const transformedArr = [];

    for (let i = 0; i < styles.length; i += 4) {
      const rowArr = [];

      for (let j = 0; j < 4; j++) {
        if (!styles[i + j]) {
          break;
        }
        rowArr.push(styles[i + j]);
      }

      transformedArr.push(rowArr);
    }

    // console.log(transformedArr);
    setStyleList(transformedArr);
  };

  useEffect(() => {
    transformStyleArr();
  }, [styles]);

  return (
    <div className="style-selector">
      <div>
        <span>STYLE</span>
        <span> &gt; </span>
        <span>{currentStyle.name}</span>
      </div>
      {
        styleList.length > 0 && styleList.map((row, index) => (
          <StylesRow
            row={row}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
            key={index}
          />
        ))
      }
    </div>
  );
};

export default StyleSelector;
