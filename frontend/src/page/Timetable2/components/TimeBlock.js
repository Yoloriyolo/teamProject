import React from 'react';
import LectureList from './LectureList';
import TimeTable from './Timetable';


class TimeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      color: "",
      opacity:""
    }
  }
  onClick1 () {
    this.props.onClick();
    if (this.state.color === ""){
      this.setState({color:"#F50057", opacity:"0.5"})}
    else{this.setState({color:"", opacity:""})}
  }
  render() {
    const { displayLecture } = this.props;

    // const LectureList=this.state.map(
    //   ({option, weekday, timeUnitAlphabet, timeUnitString})=>(
    //     <div 
    //     option={option}
    //     weekday={weekday}
    //     timeUnitAlphabet={timeUnitAlphabet}
    //     timeUnitString={timeUnitString}
    //     onClick={onClick}
    //     />
    //   )
    // );
    if (displayLecture) {
      const {
        name,
        professor,
        location,
        isRequired
      } = displayLecture;

      return (
        <td className={isRequired ? 'unit lecture-required' : 'unit lecture-unrequired'}>
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
