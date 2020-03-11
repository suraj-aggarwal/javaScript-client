import React from "react";
import PropTypes from "prop-types";
import { getNextRoundRobin, getRandomNumber } from "../../libs/utils/math";
import Img from  './style';
import {
  PUBLIC_IMAGE_CLOUD,
  PUBLIC_IMAGE_DEFAULT,
  PUBLIC_IMAGE_DNS,
  PUBLIC_IMAGE_FULL_STACK,
  PUBLIC_JS,
  PUBLIC_LOAD_BALANCER
} from "../../config/constants";

class Slider extends React.Component {
  constructor(props) {
    console.log("Inside Slider");
    super(props);
    this.state = {
      path: "images/default.png",
      current: 0
    };
  }

  static defaultProps = {
    path: "images/default.png",
    altText: "default Banner",
    defaultBanner: "default.png",
    duration: 2000,
    height: 200,
    random: false,
  };

  componentDidMount() {
    console.log("Inside componentDidMount");
    this.timerID = setInterval(() => {
      this.tick();
    }, 2000);
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  tick() {
    const banner = [
      PUBLIC_IMAGE_CLOUD,
      PUBLIC_IMAGE_DEFAULT,
      PUBLIC_IMAGE_DNS,
      PUBLIC_IMAGE_FULL_STACK,
      PUBLIC_JS,
      PUBLIC_LOAD_BALANCER
    ];
    let index = this.props.random
      ? parseInt(getRandomNumber(7))
      : getNextRoundRobin(banner.length, this.state.current);
    if (!this.props.random) {
      this.setState({
        current: index
      });
    }
    this.setState({
      path: banner[index]
    });
  }

  render() {
    return (
      <>
        <div>
          <Img
            src={this.state.path}
            alt={this.props.altText}
            height={this.props.height}
          />
        </div>
      </>
    );
  }
}

export { Slider };
