import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import { History } from 'history';
import { createGlobalStyle } from 'styled-components';

import { AuthPagePath } from 'src/pages/auth';

import { Carousel } from 'react-responsive-carousel';
import { GuideContainer } from 'src/components/guide-container'

const CAROUSEL_PROPS = {
  showArrows: false,
  showStatus: false,
  showThumbs: false,
  showIndicators: false,
  emulateTouch: true,
  useKeyboardArrows: true
};
const SLIDES = [
  {
    img: 'guide-1.svg',
    text: 'slide 1'
  },
  {
    img: 'guide-2.svg',
    text: 'slide 2'
  }
];

const CarouselStyle = createGlobalStyle`
  .carousel .slide {
    background: transparent;
  }
`;

type Prop = {
  history: History;
}

export const GuidePagePath = '/guide';
export const GuidePage: React.SFC<Prop> = ({
  history
}) => {
  const [selectedItem, setSelectedItem] = React.useState<number>(0);

  const handeNextSlide = React.useCallback((index: number) => {
    if (index < SLIDES.length) {
      setSelectedItem(index);

      return null;
    }

    history.push(AuthPagePath);
  }, [setSelectedItem, history]);

  return (
    <React.Fragment>
      <Carousel
        {...CAROUSEL_PROPS}
        selectedItem={selectedItem}
        onChange={setSelectedItem}
      >
        {SLIDES.map((sldie, index) => (
          <GuideContainer
            key={index}
            imgSrc={`/imgs/${sldie.img}`}
            text={sldie.text}
            onNext={() => handeNextSlide(index + 1)}
          />
        ))}
      </Carousel>
      <CarouselStyle />
    </React.Fragment>
  );
}

export default GuidePage;