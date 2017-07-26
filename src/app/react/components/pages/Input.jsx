import React, { Component } from 'react';

export default class Input extends Component {
   getFileName(fileInput) {
    console.log(fileInput.files)
  };

  render() {
    return (
      <input
        name="file"
        type="file"
        onSubmit={() => this.getFileName(this.myDiv)}
        ref = {el => this.myDiv = el}
        accept=".png, .jpg, .bmp, .JPEG, .JPG, .svg, .tiff, .gif"
      />
    );
  }
}
