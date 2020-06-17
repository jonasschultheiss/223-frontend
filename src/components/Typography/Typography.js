import React from 'react';

export default function (props) {
  const { size, shouldBeBold, shouldBeItalic, shouldBeCentered, shouldBeLight, isLink, isError } = props;

  let styles = 'font-sans';

  if (size === 's') {
    styles += ' text-sm';
  } else if (size === 'm') {
    styles += ' text-base';
  } else if (size === 'l') {
    styles += ' text-lg';
  } else if (size === 'xl') {
    styles += ' text-4xl';
  }

  if (shouldBeBold) {
    styles += ' font-bold';
  } else {
    styles += ' font-medium';
  }
  if (shouldBeItalic) {
    styles += ' italic';
  } else {
    styles += ' not-italic';
  }
  if (shouldBeCentered) {
    styles += ' text-center block';
  }

  if (shouldBeLight) {
    styles += ' text-gray-300';
  } else if (isError) {
    styles += ' text-red-700';
  } else {
    styles += ' text-blue-700';
  }

  if (isLink && shouldBeLight) {
    styles += ' hover:text-gray-400';
  } else if (isLink) {
    styles += ' hover:text-blue-900';
  }

  return <span className={styles}>{props.children}</span>;
}
