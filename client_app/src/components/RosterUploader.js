import React from 'react';
import axios from 'axios';

class RosterUploader extends React.Component {

  state = { 
    selectedFile: null,
    output: []
  }; 
  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 

  onFileUpload = () => { 
    const formData = new FormData(); 
    formData.append( 
      "roster", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 

    axios.post("http://localhost:40000/rosters", formData)
    .then(response => this.setState({output: response.data}))
    .catch(error => console.log(error))
  }; 

  fileData = () => { 
    return this.state.output.map(o => <div>{o}</div>)
  }; 
   
  render() { 
    return ( 
      <div> 
          <h3> 
            Upload battlescribe .rosz 
          </h3> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
          </div> 
        {this.fileData()} 
      </div> 
    ); 
  } 

}

export default RosterUploader;
