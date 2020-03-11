import React from "react";
import ColumnPic from "./ColumnPic";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: false,
      imageArr: [
        "https://i.etsystatic.com/21944187/r/il/a13616/2216558138/il_794xN.2216558138_l22l.jpg",
        "https://i.etsystatic.com/21944187/r/il/361996/2264194929/il_794xN.2264194929_cb35.jpg",
        "https://i.etsystatic.com/21944187/r/il/1b3a26/2216558098/il_794xN.2216558098_1slb.jpg",
        "https://i.etsystatic.com/21944187/r/il/e88cb5/2216558096/il_794xN.2216558096_3spf.jpg",
        "https://i.etsystatic.com/21944187/r/il/841260/2194774181/il_794xN.2194774181_qp31.jpg",
        "https://i.etsystatic.com/21944187/r/il/730c8a/2216603732/il_794xN.2216603732_dd2c.jpg"
      ],
      mainImage: ""
    };
  }

  componentDidMount() {
    this.setState({ mainImage: this.state.imageArr[0] });
  }

  hoverAction(index) {
    var bigImage = this.state.imageArr[index];
    this.setState({ mainImage: bigImage });
  }

  render() {
    return (
      <div>
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
          <div className="buttonColumn">
            <p>
              <i className="left"></i>
            </p>
          </div>
          <div className="mainImageColumn" style={{ objectFit: "contain" }}>
            <img className="mainImage" src={this.state.mainImage}></img>
          </div>
          <div className="buttonColumn2">
            <p>
              {" "}
              <i className="right"></i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
