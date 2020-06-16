import React from 'react';

import Typography from '../Typography';

export default function (props) {
  const { inputChangedHandler, value, label, type = 'text', shouldBeDisabled } = props;

  const id = `inp${label.replace(/\s/g, '')}`;
  let inputStyles = 'w-48 rounded-md border shadow-sm outline-none focus:shadow-outline focus:border-blue-300 focus:bg-blue-100 p-1';
  if (shouldBeDisabled) inputStyles += ' bg-gray-300 cursor-not-allowed';

  return (
    <div className="flex flex-col mx-auto mb-2">
      <label htmlFor={id} className="">
        <Typography size="l" shouldBeBold>
          {label}
        </Typography>
      </label>
      <input type={type} id={id} onChange={(e) => inputChangedHandler(e)} value={value} disabled={shouldBeDisabled} className={inputStyles} />
    </div>
  );
}
