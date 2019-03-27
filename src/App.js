import React, { Component } from 'react';
import './App.css';
var Tesseract = window.Tesseract;
var resultlol = '';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageViewer: '',
      imgResult: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let myImg = this.state.image;
    console.log('in handle submit image', myImg);
    Tesseract.recognize(myImg)
       .progress(function  (p) { console.log('progress', p)    })
       .then(function (result){
        //console.log('result is', result.text) 
        resultlol = result.text;
        return(
            <div>
            <p>The result is</p>              
            <p>{result.text}</p>
            </div>
        )
    })
    this.setState({
      imgResult: resultlol
    })
    console.log('img result is', this.state.imgResult)
  }

  imageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result,
      })

    }
    reader.readAsDataURL(image);
  }

  render() {
    let imageViewer = this.state.imageViewer;
    let $imageViewer = null;
    if (imageViewer) {
      $imageViewer = (<div className = "bg"><img src={imageViewer} className="preview-img" alt="test"/></div>);
    } else {
      $imageViewer = (<div><br/><div className="previewText">Select an image and then click upload image!</div></div>)
    }
    return (
      <div className="App">

        <form onSubmit={(e) => this.handleSubmit(e)}>
          
          <input className="fileInput"
            type="file"
            onChange={(e) => this.imageChange(e)}/>

          <button className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}>
            Upload Image
          </button>

          <br/>
          <br/>

          <button className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}>
            Show output(approx after 10 seconds of uploading image.)
          </button>

        </form>

        <div className="imgPreview">
          {$imageViewer}
        </div>

        <p>(Check console for progress and ouput)</p>

        <p>The result is</p>              
        <p>{this.state.imgResult}</p>

      </div>
    );
  }
}

export default App;