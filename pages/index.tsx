import React from 'react';
import styled from 'styled-components';
import * as Effector from 'effector-react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import UserStore from 'store/user';
import TwitterStore from 'store/twitter';

import { Container } from 'components/container';
import { TopBar } from 'components/top-bar';
import { LeftBar } from 'components/left-bar';

const LINKS = [
  {
    img: '/icons/twitter.svg',
    name: 'Twittes'
  },
  {
    img: '/icons/setup.svg',
    name: 'Settings'
  }
];

const MainPageContainer = styled.main`
  display: grid;

  grid-template-columns: max-content;
  grid-template-rows: max-content;
  grid-template-areas: "left-bar header"
                       "left-bar container";
`;

export const MainPage: React.FC = () => {
  const userState = Effector.useStore(UserStore.store);
  const twitterState = Effector.useStore(TwitterStore.store);

  React.useEffect(() => {
    if (twitterState.tweets.length < 1 && !twitterState.error) {
      UserStore.update();

      TwitterStore.getTweets(null);
    }

    if (userState.jwtToken && twitterState.error) {
      TwitterStore.updateTweets(userState.jwtToken);
    }
  }, [twitterState, userState]);

  return (
    <MainPageContainer>
      <LeftBar
        items={LINKS}
        profileName={userState.screenName}
      />
      <TopBar
        zilAddress={userState.zilAddress}
        profileImg={userState.profileImageUrl}
        profileName={userState.screenName}
      />
      <Container area="container">
        {twitterState.tweets.map((tweet, index) => (
          <TwitterTweetEmbed
            key={index}
            screenName={userState.screenName}
            tweetId={tweet.id_str}
          />
        ))}
      </Container>
    </MainPageContainer>
  );
};

export default MainPage;