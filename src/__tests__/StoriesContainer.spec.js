import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Stories } from '../components/Stories';
import { storyIds, singularStory } from '../utils/fixtures';
import { getStory, getStoryIds } from '../utils/hackerNewsAPI';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../utils/constants';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../utils/hackerNewsAPI', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test('renders the story container with a story', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<Stories />);
  await waitForElement(() => [
    expect(getByText('Hacker News Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
  ]);
});
