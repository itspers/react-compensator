import React from 'react';
import './style.css';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

export default function App() {
  return (
    <div className="p-2 prose max-w-full">
      <h1>Website body</h1>

      <div
        style={{ height: '800px', overflow: 'scroll' }}
        className="innerBody"
      >
        <Controller refreshInterval={12} container=".innerBody">
          <div class="flex flex-col gap-2 bg-gray-200 p-2 ">
            <h1>Some tariffs scroller</h1>
            <p>Lorem</p>
            {/* <Scene
              pinSettings={{ pushFollowers: false }}
              triggerHook={0}
              pin
            > */}
            <Scene
              offset={-100}
              triggerHook={0}
              reverse={true}
              pinSettings={{ pushFollowers: false }}
              pin
            >
              {(progress) => (
                <div className="pt-1">
                  <div class="bg-white rounded-md p-2 ">
                    <h1>Tariffs {progress}</h1>
                    <p>Start editing to see some magic happen :)</p>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((value, index) => {
                        return (
                          <div class="bg-green-200 rounded p-1 flex-1">
                            <span className="mt-0">{value * 100} pro Jahr</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </Scene>

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
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Controller>
      </div>
    </div>
  );
}
