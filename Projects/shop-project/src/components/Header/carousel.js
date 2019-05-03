import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BookOne from '../../assets/images/bookOne.jpg';
import BookSecond from '../../assets/images/bookSecond.jpg';
import BookThird from '../../assets/images/bookThird.jpg'

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={BookOne} />
                </div>
                <div>
                    <img src={BookSecond} />
                </div>
                <div>
                    <img src= {BookThird}/>
                </div>
            </Carousel>
        );
    }
};
export default DemoCarousel;
