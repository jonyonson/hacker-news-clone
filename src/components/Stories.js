import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../utils/hackerNewsAPI';
import { Story } from '../components/Story';
import { GlobalStyle, StoriesWrapper } from '../styles/StoriesStyles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesWrapper data-test-id="stories=container">
        <h1>Hacker News Stories</h1>
        {storyIds.slice(0, count).map((storyId) => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesWrapper>
    </>
  );
};
