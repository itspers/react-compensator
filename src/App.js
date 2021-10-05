import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import lerp from 'lerp';

// export const lerp = (start, end, amt) => {
//   return (1 - amt) * start + amt * end;
// };

export default function App() {
  let initialHeight = 300;
  let collapsedHeight = 100;
  const heightDiff = initialHeight - collapsedHeight;
  let initialOffset = 0;

  const innerBody = useRef();
  const headerRef = useRef();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [compensation, setCompensation] = useState(0);
  const [elementHeight, setElementHeight] = useState(initialHeight);

  const onScroll = () => {
    const scrollTop = innerBody.current.scrollTop;

    const min = initialOffset;
    const max = initialOffset + heightDiff;
    let res = 0;
    let compensation = 0;
    if (scrollTop <= min) {
      res = 0;
      compensation = 0;
    } else if (scrollTop >= max) {
      res = 1;
      compensation = heightDiff;
    } else {
      res = (scrollTop - initialOffset) / (initialHeight - collapsedHeight);
      compensation = lerp(0, heightDiff, res);
    }

    let elementHeight = lerp(initialHeight, collapsedHeight, res);
    compensation = initialHeight - elementHeight;
    // elementHeight = Math.round(elementHeight);
    // compensation = Math.round(compensation);

    requestAnimationFrame(() => {
      setScrollProgress(res);
      setElementHeight(elementHeight);
      setCompensation(compensation);
    });
  };

  const calcInitialScrolls = () => {
    console.log('calcInitialScrolls2');
    // initialOffset = Math.abs(
    //   innerBody.current.offsetTop - headerRef.current.offsetTop
    // );
    initialOffset =
      headerRef.current.getBoundingClientRect().top -
      headerRef.current.offsetParent.getBoundingClientRect().top;
    console.log('initialOffset', initialOffset);
  };

  useEffect(() => {
    innerBody.current.addEventListener('scroll', onScroll);

    setTimeout(() => {
      calcInitialScrolls();
      onScroll();
    }, 1000);
  }, []);

  return (
    <div className="p-2 prose max-w-full relative">
      <h1>Website body</h1>
      <div className="text-xs">
        <pre>scrollProgress: {scrollProgress}</pre>
        <pre>elementHeight: {elementHeight}</pre>
        <pre>compensation: {compensation}</pre>
      </div>
      <div
        style={{
          height: '800px',
          'overflow-y': 'scroll',
        }}
        className="innerBody relative"
        ref={innerBody}
      >
        <div className="flex flex-col bg-gray-200 p-2 ">
          <h1>Some tariffs scroller</h1>
          <p>Lorem</p>

          <div
            style={{
              height: compensation + 'px',
            }}
          ></div>

          <div
            ref={headerRef}
            className={`${scrollProgress >= 1 ? 'shadow-md' : ''}`}
            style={{
              height: elementHeight + 'px',
              overflow: 'hidden',
              position: scrollProgress >= 1 ? 'sticky' : 'relative',
              top: '0px',
              left: '0px',
              width: '100%',
            }}
          >
            <div>
              <div className={`bg-yellow-100 rounded-md p-2 h-full mt-1`}>
                <h1
                  style={{
                    'font-size': lerp(2, 1.5, scrollProgress) + 'em',
                  }}
                >
                  Tariffs
                </h1>
                <p
                  style={{
                    'font-size': lerp(1, 0, scrollProgress) + 'em',
                  }}
                >
                  Some useless line of text
                </p>
                <div className="flex gap-3">
                  {[1, 2, 3].map((value, index) => {
                    return (
                      <div class="bg-green-200 rounded p-1 flex-1">
                        <span
                          className="mt-0 font-bold"
                          style={{
                            'font-size': lerp(1.5, 1, scrollProgress) + 'em',
                          }}
                        >
                          {value * 100} pro Jahr
                        </span>
                        <p
                          style={{
                            'font-size': lerp(1, 0, scrollProgress) + 'em',
                          }}
                        >
                          Hello
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p>
                  <p>Hello</p>
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 mt-5 ">
            {[1, 2, 3, 4, 5].map((value, index) => {
              return (
                <div class="flex gap-3 ">
                  {[1, 2, 3].map((value, index) => {
                    return (
                      <div class="bg-gray-50 rounded p-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
