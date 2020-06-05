import '../Timetable2/components/css/index.css'
import './Reco1.scss';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TabList from './components/TabList';
import Table4 from './components/Table';
import crawl from '../Homepage/crawl';
import Spinner from 'react-bootstrap/Spinner';
import LectureList from '../Timetable2/components/LectureList'

function RecoAll(props) {

  var [full_data, setFullData] = useState()
  var [originData, setoriginData] = useState()
  const [myCourse, setmyCourse] = useState([])
  var [lectures, setLectures] = useState({lectures : [] })
  var [userId, setUser] = useState(props.userId)
  var [data3, setData3] = useState({ isdata: false })
  const [mycredit, setmyCredit] = useState(0)
  const [mytime, setmyTime] = useState([])
  const [timeList, setTimeList] = useState([])

  var areaType = {

    "1전공": "1전공",
    "이중": "이중",
    "부전공": "부전공",
    "교직": "교직",

  };
  useEffect(() => {
    crawl.get_inst().then(response => {
      console.log("res", response)
      response.data.data.sort(function (a, b) { // 오름차순
        return a.dept < b.dept ? -1 : a.dept > b.dept ? 2 : a.area > b.area ? 1 : a.area < b.area ? 0 : -2;
      });
      response.data.data.map(function (obj) {
        // obj.class_time = obj.class_time.split(" ").join("")
        if (obj.required) { obj.required = "O" }
        else { obj.required = "" }

      })

      response.data.lib.map(function (obj) {
        areaType[obj.area] = obj.area + "(교양)"

      })
      setData3({ data: response.data, isdata: true, lib: areaType })
      setFullData(response.data.data)
      setoriginData(response.data.data)



    })
  }, []
  )


  const handlerButton = async (row) => {
    let flag = false
    let temp = full_data
    let times = row.class_time.split(' ')
    let temp2 = null;
    let result = []
    times.forEach(async (text) => {
      if (!isNaN(text)){
      if (timeList.includes(temp2 + String(text))){
        flag = true
        return alert("동일 시간 존재!")
      }
      else{
        result.push(temp2 + String(text))
      }
      }
      else {
        temp2 = text
      }
    })
    console.log(timeList)
    if (flag) { return }
    setTimeList(timeList.concat(result))
    myCourse.forEach(function (element) {
      if (element.subject == row.subject) {
        flag = true
        return alert("동일 교과목 존재!")
      }
    })
    if (flag) { return }
    await setmyCourse(myCourse.concat(row))
    await setFullData(temp.filter(inst => inst.instruction_id !== row.instruction_id))
    await lectureSet(myCourse.concat(row))


  }


  const RemoveButton = async (row) => {
    let times = row.class_time.split(' ')
    let temp2 = null;
    let result = []
    times.forEach((text) => {
      if (!isNaN(text)){

        result.push(temp2 + String(text))
     
      }
      else {
        temp2 = text
      }
    })

    setTimeList(timeList.filter(time => !result.includes(time)))

    await setmyCourse(myCourse.filter(inst => inst.instruction_id !== row.instruction_id))
    await setFullData(originData.filter(inst => !myCourse.includes(inst.instruction_id)).sort(function (a, b) { // 오름차순
      return a.dept < b.dept ? -1 : a.dept > b.dept ? 1 : 0;
    })
    )
    await lectureSet(myCourse.filter(inst => inst.instruction_id !== row.instruction_id))

  }


  const lectureSet= async(course)=> {
    var temp = {}
    let num = 0
    await course.forEach(function(obj){
      var test = {}
      test["name"] = obj.subject
      test['time'] = obj.class_time
      test['professor'] = obj.professor
      test['isRequired'] = obj.required
      temp[num] = test
      num += 1
    })
    await setLectures({lectures :temp})


  }

  function makearr(a){
    if (a.length){
      
    let arr = Array(a.length);
    for (let i = 0; i <a.length;i++){
      arr[i] = i;
    }
    return arr

    }
    return 0
  }

  async function postUserset(){
    let data = {myCourse : myCourse, myCredit : mycredit, mytime : mytime}
    console.log(data)
  }

  return (
    <>

      <div className="CheckPage">

        <div className="container up">
          <TabList>
            <div label="강의 선택" className="tab-content">
              {data3.isdata ? <Table4 data={data3.data} full_data = {full_data} lectureSet={lectureSet} myCourse={myCourse} lib={data3.lib} handlerButton={handlerButton} RemoveButton={RemoveButton} /> : <><Spinner animation="grow" variant="info" /><div className="spinner">강의 시간표 로딩중...</div></>}
            </div>
            <div label="공강 선택" className="tab-content">
             <LectureList lectures={lectures} length1 = {makearr(myCourse)} setTime={setmyTime} mytime={mytime} setmyCredit={setmyCredit} post={postUserset} timeList={timeList} />
            </div>

          </TabList>
        </div>

      </div>
    </>
  );
}


export default RecoAll;



