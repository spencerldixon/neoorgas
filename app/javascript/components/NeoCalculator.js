import 'rc-slider/assets/index.css';
import React from "react"
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';

class NeoCalculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      neo_qty:                      this.props.neo_qty,
      neo_price:                    this.props.neo_price,
      gas_price:                    this.props.gas_price,
      gas_qty:                      this.props.gas_qty,
      neo_projection_value:         50,
      gas_projection_value:         40,
      gas_projection_ratio:         (40 / 50) * 100,
      final_neo_total:              this.calcFinalNeoTotal(this.props.gas_qty, 40, 50), // Final QTY of neo you will have by flipping back
      gain:                         this.calcGain(this.props.neo_qty, this.calcFinalNeoTotal(this.props.gas_qty, 40, 50))
    };
  }

  onNeoSliderChange = (value) => {
    let gas_projection_ratio = this.calcGasRatio(value, this.state.gas_projection_value);
    let final_neo_total = this.calcFinalNeoTotal(this.state.gas_qty, this.state.gas_projection_value, value);

    this.setState({
      neo_projection_value: value,
      gas_projection_ratio: gas_projection_ratio,
      final_neo_total: final_neo_total,
      gain: this.calcGain(this.state.neo_qty, final_neo_total)
    });
  }

  onGasSliderChange = (value) => {
    let final_neo_total = this.calcFinalNeoTotal(this.state.gas_qty, value, this.state.neo_projection_value);

    this.setState({
      gas_projection_value: value,
      gas_projection_ratio: this.calcGasRatio(this.state.neo_projection_value, value),
      final_neo_total: final_neo_total,
      gain: this.calcGain(this.state.neo_qty, final_neo_total)
    });
  }

  calcGasRatio (neo, gas) {
    return Math.round((parseFloat(gas) / neo) * 100);
  }

  calcFinalNeoTotal (gas_qty, gas_projected_price, neo_projected_price) {
    return ((parseFloat(gas_projected_price) * gas_qty) / neo_projected_price)
  }

  calcGain (starting_neo, end_neo) {
    console.log(end_neo)
    console.log(starting_neo)
    console.log(end_neo - starting_neo)
    return parseFloat(end_neo) - starting_neo
  }

  render () {
    return (
      <React.Fragment>
        <div className="row my-10">
          <div className="col-md-4">
            <div className="card">
              <h5 className="card-header">Projected NEO</h5>
              <div className="card-body">
                <p className="card-text display-3">${this.state.neo_projection_value}</p>
                <p className="card-text">GAS Ratio: {this.state.gas_projection_ratio}%</p>
                <Slider min={1} max={100} value={this.state.neo_projection_value} onChange={this.onNeoSliderChange} className="mb-4" />
                <small className="text-muted">Drag to adjust NEO price</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 text-success">
              <div className="card-body">
                <div className="card-text lead">If you sold your NEO now, bought GAS, and sell for NEO at the projected price / ratio, you will have...</div>
                <div className="card-text display-4 my-4">{this.state.final_neo_total.toFixed(2)} NEO</div>
                <div className="card-text lead">A difference of {this.state.gain.toFixed(2)} NEO</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <h5 className="card-header">Projected GAS</h5>
              <div className="card-body">
                <p className="card-text display-3">${this.state.gas_projection_value}</p>
                <p className="card-text">{this.state.gas_projection_ratio}% of NEO</p>
                <Slider min={1} max={100} value={this.state.gas_projection_value} onChange={this.onGasSliderChange} className="mb-4" />
                <small className="text-muted">Drag to adjust GAS price / ratio</small>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// HelloWorld.propTypes = {
  // greeting: PropTypes.string
// };

export default NeoCalculator

