/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export const CarsCarousal: React.FC = () => {
  const [carsData, setCarsData] = useState<any[]>([]);
  const [carsFilter, setCarsFilter] = useState<any>({ bodyType: '' });
  const [showPagination, setShowPagination] = useState<boolean>(false);
  let carousalRef: any = null;

  useEffect(() => {
    fetch('api/cars.json')
      .then((res) => res.json())
      .then((data) => {
        setCarsData(data);
      });
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 975, itemsToShow: 2 },
    { width: 1360, itemsToShow: 3 },
    { width: 1750, itemsToShow: 4 },
  ];

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width;
  };

  useEffect(() => {
    function handleResize() {
      const currentDimensions: number = getWindowDimensions();

      currentDimensions <= 570 ? setShowPagination(true) : setShowPagination(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    carousalRef.slidePrev();
  };

  const handleNext = () => {
    carousalRef.slideNext();
  };

  const bodyTypes = ['suv', 'estate', 'sedan'];

  const handleCarsFilter = (e: any) => {
    const { value } = e.target;
    setCarsFilter({ bodyType: value });
  };

  return (
    <div>
      <div className="type-filter">
        <label>Select body type</label>
        <select onChange={handleCarsFilter}>
          <option value='' selected>
            All
          </option>
          {bodyTypes.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </div>
      <Carousel
        showArrows={false}
        pagination={showPagination}
        ref={(ref) => (carousalRef = ref)}
        isRTL={false}
        breakPoints={breakPoints}
      >
        {carsData &&
          carsData
            .filter((car) => (carsFilter.bodyType !== '' ? car.bodyType === carsFilter.bodyType : true))
            .map((e) => (
              <div className='cars-carousal' key={e.id}>
                <h4 className='body-title'>{e.bodyType}</h4>
                <div className='model-details'>
                  <h1 className='model-name'>{e.modelName}</h1>
                  <h1 className='model-type'>{e.modelType}</h1>
                </div>
                <div className='model-image'>
                  <img src={e.imageUrl} alt='' style={{ height: '300px' }} />
                </div>
                <div className='action-btns'>
                  <Link href={`/learn/${e.id}`} passHref>
                    <button>
                      LEARN <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </Link>
                  <Link href={`/shop/${e.id}`} passHref>
                    <button>
                      SHOP <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </Carousel>
      {!showPagination && (
        <div className='scroll-btns'>
          <button onClick={handlePrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button onClick={handleNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
    </div>
  );
};
