import { Carousel } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Galeria: React.FC = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <Carousel afterChange={onChange}>
            <div>
                <img src="https://i.ibb.co/6YKTKc1/1.jpg" alt="1"
                    width="100%"
                    height="450"
                >
                </img>
            </div>
            <div>
                <img src="https://i.ibb.co/cQZC74y/Whats-App-Image-2022-09-25-at-15-26-41.jpg" alt="Whats-App-Image-2022-09-25-at-15-26-41"
                    width="100%"
                    height="450"
                ></img>
            </div>
            <div>
                <img src="https://i.ibb.co/SmZdyBt/guto.jpg" alt="guto"
                    width="100%"
                    height="450"
                ></img>
            </div>
            <div>
                <img src="https://i.ibb.co/23s2VyT/aldenio.jpg" alt="aldenio"
                    width="100%"
                    height="450"
                ></img>
            </div>
            <div>
                <img src="https://i.ibb.co/ns9KXXR/marilia.jpg" alt="marilia"
                    width="1200"
                    height="450"
                ></img>
            </div>
        </Carousel>
    );
};

export default Galeria;