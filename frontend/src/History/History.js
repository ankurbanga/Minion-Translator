import React, {Component} from'react';
import axios from 'axios';

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: null,
        };
    }

    async componentDidMount() {
        const history = (await axios.get('http://localhost:8003/')).data;
        this.setState({
            history,
        });
    }

    updateDelID(value) {
        this.setState({
          delid: value,
        });
      }
    
    async delete() {
        this.setState({
            disabled: true,
        });

        await axios.post('http://localhost:8003/delete', {
            delid: this.state.delid,
        });

        this.props.history.push('/');
    }

    render() {
        return (
          <div>
              <br/><br/>
		<p style={{"font-size":"200%","font-family":"Georgia","text-align":"center"}}> Translation History </p>
		<br/>
          <table style={{width:"100%"}}>
              <tr>
                  <th> ID</th>
                  <th>English</th>
                  <th>Minion Speak</th>
              </tr>
              
              {this.state.history === null && <p>Loading history...</p>}
              
              {
                this.state.history && this.state.history.map(t => (
                    <tr>
                        <td>
                            <div >
                                <input size='2'
                                    disabled={this.state.disabled}
                                    type="text"
                                    value = {t.id}
                                    onBlur={(e) => {this.updateDelID(e.target.value)}}
                                />
                            </div>
                        </td>
                        <td>{t.en}</td>
                        <td>{t.minion}</td>
                        
                    </tr>
                ))
              }
                <td><button
                    disabled={this.state.disabled}
                    onClick={() => {this.delete()}}>
                    Delete
                </button></td>
              </table>
            </div>
        )
    }
}

export default History;             
