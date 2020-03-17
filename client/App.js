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
      //   "https://i.etsystatic.com/21944187/r/il/a13616/2216558138/il_794xN.2216558138_l22l.jpg",
      //   "https://i.etsystatic.com/21944187/r/il/361996/2264194929/il_794xN.2264194929_cb35.jpg",
      //   "https://i.etsystatic.com/21944187/r/il/1b3a26/2216558098/il_794xN.2216558098_1slb.jpg",
      //   "https://i.etsystatic.com/21944187/r/il/e88cb5/2216558096/il_794xN.2216558096_3spf.jpg",
      //   "https://i.etsystatic.com/21944187/r/il/841260/2194774181/il_794xN.2194774181_qp31.jpg",
      //   "https://i.etsystatic.com/21944187/r/il/730c8a/2216603732/il_794xN.2216603732_dd2c.jpg"
      // ],
      mainImage: "",
      mainImageIndex: 0
    };
  }

  rerender() {
    axios
      .get("http://127.0.0.1:3030/imageurl")
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
            element.classList.add("selectedImage");
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
    element.classList.remove("selectedImage");
    var bigImage = this.state.imageArr[index];
    this.setState(state => {
      var element = document.getElementById(`image${index}`);
      element.classList.add("selectedImage");
      return { mainImageIndex: index, mainImage: bigImage };
    });
  }

  clickNext(event) {
    event.preventDefault();
    var nextItem = this.state.mainImageIndex + 1;
    var element = document.getElementById(`image${this.state.mainImageIndex}`);
    element.classList.remove("selectedImage");
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
    element.classList.add("selectedImage");
  }

  clickPrevious(event) {
    event.preventDefault();
    var prevItem = this.state.mainImageIndex - 1;
    var element = document.getElementById(`image${this.state.mainImageIndex}`);
    element.classList.remove("selectedImage");
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
    element.classList.add("selectedImage");
  }

  heartClick() {
    if (document.getElementsByClassName("redHeart").length !== 0) {
      document.getElementById("heart").classList.remove("redHeart");
    } else {
      let element = document.getElementById("heart");
      element.classList.add("redHeart");
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
        <div className="row">
          <div className="columnOne">
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
          <div className="imageContainer">
            <div className="buttonColumn">
              <p>
                <i className="lb" onClick={this.clickPrevious.bind(this)}></i>
              </p>
            </div>
            <div className="mainImageColumn">
              {/* //style={{ objectFit: "contain" }} */}
              <img
                className="mainImage"
                src={this.state.mainImage}
                onClick={this.modalRender.bind(this)}
              ></img>
            </div>
            <div className="buttonColumn2">
              <svg
                onClick={this.heartClick.bind(this)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 25"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  id="heart"
                  className="heart"
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
