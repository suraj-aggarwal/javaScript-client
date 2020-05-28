import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE, imagePath } from '../../config/constants';
import { getRandomNumber, getRoundRobin } from '../../libs/utils/math';
import Img from './style';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { duration } = this.props;
    this.updateImage = setInterval(() => {
      this.forEachDuration();
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.updateImage);
  }

  forEachDuration() {
    const { random, banners } = this.props;
    const { index } = this.state;
    const currentIndex = random
      ? getRandomNumber(banners.length)
      : getRoundRobin(index, banners.length);
    this.setState({
      index: currentIndex,
    });
  }

  render() {
    const {
      height, banners, altText,
    } = this.props;
    const { index } = this.state;
    return (
      <div>
        <Img src={`${imagePath}${banners[index]}`} alt={altText} height={height} />
      </div>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  defaultBanner: PropTypes.string,
  banners: PropTypes.arrayOf,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  banners: [DEFAULT_BANNER_IMAGE],
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
