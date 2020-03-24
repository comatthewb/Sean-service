import React from "react";
import axios from "axios";
import ColumnPic from "./ColumnPic";
import Modal from "./Modal";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: false,
      imageArr: [],
      mainImage: "",
      mainImageIndex: 0,
      currentItemId: 2
    };
  }

  onNavagateTo(id) {
    this.setState({ currentItemId: id });
    this.rerender();
  }

  rerender() {
    axios
      .get(`http://127.0.0.1:3030/imageurl/${this.state.currentItemId}`) //defines which ID we are going to use
      .then(results => {
        var mainImg = results.data[0];
        this.setState(
          {
            imageArr: results.data,
            mainImage: mainImg
          },
          () => {
            let element = document.getElementById(
              `image${this.state.mainImageIndex}`
            );
            element.classList.add("sean-selectedImage");
          }
        );
      })
      .catch(err => {
        console.error("this is the err", err);
      });
  }

  componentDidMount() {
    this.rerender();
  }

  hoverAction(index) {
    var element = document.getElementById(`image${this.state.mainImageIndex}`);
    element.classList.remove("sean-selectedImage");
    var bigImage = this.state.imageArr[index];
    this.setState(state => {
      var element = document.getElementById(`image${index}`);
      element.classList.add("sean-selectedImage");
      return { mainImageIndex: index, mainImage: bigImage };
    });
  }

  clickNext(event) {
    event.preventDefault();
    var nextItem = this.state.mainImageIndex + 1;
    var element = document.getElementById(`image${this.state.mainImageIndex}`);
    element.classList.remove("sean-selectedImage");
    if (nextItem >= this.state.imageArr.length) {
      this.setState({ mainImageIndex: 0 });
      nextItem = 0;
    } else {
      this.setState({ mainImageIndex: nextItem });
    }
    this.setState({
      mainImage: this.state.imageArr[nextItem]
    });
    var element = document.getElementById(`image${nextItem}`);
    element.classList.add("sean-selectedImage");
  }
  clickPrevious(event) {
    event.preventDefault();
    var prevItem = this.state.mainImageIndex - 1;
    var element = document.getElementById(`image${this.state.mainImageIndex}`);
    element.classList.remove("sean-selectedImage");
    if (prevItem < 0) {
      this.setState({ mainImageIndex: this.state.imageArr.length - 1 });
      prevItem = this.state.imageArr.length - 1;
    } else {
      this.setState({ mainImageIndex: prevItem });
    }
    this.setState({
      mainImage: this.state.imageArr[prevItem]
    });
    var element = document.getElementById(`image${prevItem}`);
    element.classList.add("sean-selectedImage");
  }

  heartClick() {
    if (document.getElementsByClassName("sean-redHeart").length !== 0) {
      document.getElementById("sean-heart").classList.remove("sean-redHeart");
    } else {
      let element = document.getElementById("sean-heart");
      element.classList.add("sean-redHeart");
    }
  }

  modalRender() {
    this.setState({ modalView: true });
  }

  modalClose() {
    // console.log("false");
    this.setState({ modalView: false });
  }
  // modalView

  render() {
    return (
      <div>
        <Modal
          image={this.state.mainImage}
          show={this.state.modalView}
          close={this.modalClose.bind(this)}
        />
        <div className="sean-row">
          <div className="sean-columnOne">
            {this.state.imageArr.map((item, index) => {
              return (
                <ColumnPic
                  image={item}
                  key={item}
                  index={index}
                  hover={this.hoverAction.bind(this)}
                />
              );
            })}
          </div>
          <div className="sean-imageContainer">
            <div className="sean-buttonColumn">
              <p>
                <i
                  className="sean-lb"
                  onClick={this.clickPrevious.bind(this)}
                ></i>
              </p>
            </div>
            <div className="sean-mainImageColumn">
              {/* //style={{ objectFit: "contain" }} */}
              <img
                className="sean-mainImage"
                src={this.state.mainImage}
                onClick={this.modalRender.bind(this)}
              ></img>
            </div>
            <div className="sean-buttonColumn2">
              <svg
                onClick={this.heartClick.bind(this)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 25"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  id="sean-heart"
                  className="sean-heart"
                  d="M16.5,3A6.953,6.953,0,0,0,12,5.051,6.912,6.912,0,0,0,7.5,3C4.364,3,2,5.579,2,9c0,5.688,8.349,12,10,12S22,14.688,22,9C22,5.579,19.636,3,16.5,3Z"
                ></path>
              </svg>
              <div
                className="rb button2"
                onClick={this.clickNext.bind(this)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
