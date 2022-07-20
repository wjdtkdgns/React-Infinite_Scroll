import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import ContextBox from "../component/ContextBox";
import { useInfiniteData } from "../hook/query/useInfiniteData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const MainPage = () => {
  const [selection, setSelection] = useState<boolean>(false);
  const query = useInfiniteData();

  let content = <div>asd</div>;

  if (query.isError) {
    content = <p>Error</p>;
  }

  if (query.isLoading) {
    content = <p>Loading</p>;
  }

  if (query.isSuccess) {
    content = (
      <Fragment>
        {query.data.pages.map(
          (
            el: { result: any; nextPage: number; isLast: boolean },
            index: number
          ) => (
            <ContextBox key={index} name={el.result.name} />
          )
        )}
      </Fragment>
    );
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && query.isSuccess) {
      query.fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '"></span>';
    },
  };

  const swiperParams = {
    spaceBetween: 0,
    centeredSlides: true,
    modules: [Pagination, Autoplay],
    pagination: pagination,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  };

  return selection ? (
    <Fragment>
      <div
        style={{ height: "700px", width: "300px", backgroundColor: "white" }}
      >
        <p>Infinite Scroll</p>
        <p>limit : 10</p>
        <button onClick={() => query.fetchNextPage()}>manual</button>
        <button onClick={() => setSelection((prev) => !prev)}>select</button>
      </div>
      {content}
    </Fragment>
  ) : (
    <Fragment>
      <button onClick={() => setSelection((prev) => !prev)}>select</button>
      <p style={{ fontSize: "20px" }}>
        horizontal scroll without 3rd party library
      </p>
      <Box>
        <Wrapper>
          <div>
            <h2>1</h2>
          </div>
          <div>
            <h2>2</h2>
          </div>
          <div>
            <h2>3</h2>
          </div>
          <div>
            <h2>4</h2>
          </div>
          <div>
            <h2>5</h2>
          </div>
          <div>
            <h2>6</h2>
          </div>
          <div>
            <h2>7</h2>
          </div>
          <div>
            <h2>8</h2>
          </div>
          <div>
            <h2>9</h2>
          </div>
        </Wrapper>
      </Box>
      <p style={{ fontSize: "20px" }}>
        horizontal scroll with 3rd party library
      </p>
      <Frame>
        <Swiper {...swiperParams}>
          <SwiperSlide>
            <Content>
              <p>Slide 1</p>
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content>
              <p>Slide 2</p>
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content>
              <p>Slide 3</p>
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content>
              <p>Slide 4</p>
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content>
              <p>Slide 5</p>
            </Content>
          </SwiperSlide>
          <SwiperSlide>
            <Content>
              <p>Slide 6</p>
            </Content>
          </SwiperSlide>
        </Swiper>
      </Frame>
    </Fragment>
  );
};

export default MainPage;

const Box = styled.div`
  width: 500px;
  margin: 20px auto;
  background-color: #fff;
`;

const Wrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  background-color: #000;

  & div {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 20px;
    background-color: #fff;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Frame = styled.div`
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  margin: 0 auto;

  .swiper {
    width: 80%;
    height: 300px;
    background-color: #fff;
    /* background-color: rgb(129, 129, 129); */
    border-radius: 20px;
  }

  .swiper-slide {
    /* Center slide text vertically */
    /* flex 호환성 해결 */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet-active {
    background: rgb(129, 129, 129);
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #3b3b3b;
  align-items: center;
  justify-content: center;
  text-align: center;

  & p {
    font-size: 30px;
  }
`;
