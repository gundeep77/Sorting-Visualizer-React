import React from "react";

class Frame extends React.Component {
  render() {
    return (
      <div className="frame">
        <div className="array">
          {this.props.list.map((element, index) => (
            <div
              className={this.getClass(element.classType)}
              key={index}
              style={{ height: `${4 * element.key}px`, display: "flex", alignItems: "center", justifyContent: "center"}}
              value={element.key}
            >
              
              <p>{element.key}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  getClass = (value) => {
    if (value === 0) return "cell";
    else if (value === 1) return "cell current";
    return "cell done";
  };
}

export default Frame;
