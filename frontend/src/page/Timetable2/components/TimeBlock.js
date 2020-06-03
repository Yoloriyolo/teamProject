import React from 'react';
import LectureList from './LectureList';
import TimeTable from './Timetable';


class TimeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handle =  this.props.onClick;
    this.state ={
      color: "",
      opacity:"",
      opacity2:"0.5",
      color2: "#F50057"
    }
  }
  async onClick1  () {
    console.log("onclick1 ok")
    if (this.state.color === ""){
      await this.setState({color:"#F50057", opacity:"0.5"})}
    else{this.setState({color:"", opacity:""})}
    await this.handle()
  }
  async onClick2 () {
    console.log("onclick1 ok")
    if (this.state.color2 === ""){
      await this.setState({color2:"#F50057", opacity2:"0.5"})}
    else{this.setState({color2:"", opacity2:""})}
    await this.handle()
  }
  render() {
    const { displayLecture } = this.props;

    if (displayLecture) {
      const {
        name,
        professor,
        location,
        isRequired
      } = displayLecture;

      return (
        <td style={isRequired ? { backgroundColor: 'red' } : name!=="" ? { backgroundColor: 'aqua'} : { backgroundColor: this.state.color2, opacity:this.state.opacity2}}  onClick={()=>{this.onClick2();}}>
          <span className="lecture-name">
            {name}
          </span>
          <span className="lecture-info">
            {professor}
            {professor && location ? ' · ' : ''}
            {location}
            {LectureList}
            
          </span>
        </td>
      );
    }

    return (
      <td style={{ backgroundColor: this.state.color, opacity: this.state.opacity}}className="unit" onClick={()=>this.onClick1()}/>
    );
  }
}

export default TimeBlock;
