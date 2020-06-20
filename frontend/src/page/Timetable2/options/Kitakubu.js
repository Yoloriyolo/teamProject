class Kitakubu {
  constructor(lectureForms, lectures, credit, click) {
    this.lectureForms = lectureForms;
    this.lectures = lectures;
    this.credit = credit;
    this.displayLectures = {};
    this.handleClick = click

  }

  // TODO: 강의 배치 로직 구현
  execute() {
    const hours=['9', '10', '11', '12', '13']
    const weekdays=['월', '화', '수', '목', '금', '토']
          // const key = `${weekday}${hours}`;
         
          for(let i=0; i<hours.length; i++){
            if ( hours) {
              for(let j=0; j<weekdays.length; j++){
              const key = `${weekdays[j]}${hours[i]}`;
              // result.push(key)
              this.displayLectures = {
                ...this.displayLectures,
                [key]: {
                  hours
                }
              };
            }}
          };
    if (this.lectureForms){
    const result = []

    this.lectureForms.forEach((lectureForm) => {
      const lecture = this.lectures[lectureForm];
      if (lecture.time) {
        var times = lecture.class_time.split(' ');
        let temp = null;
        var result = []
        times.forEach((text) => {
          if (!isNaN(text)){result.push(temp + String(text))}
          else {
            temp = text
          }
        })
        result.forEach((time) => {
          const weekday = time.split('')[0];
            const hours = time.split('').splice(1).join('')

          if (weekday && hours) {
            const key = `${weekday}${hours}`;

            
            this.displayLectures = {
              ...this.displayLectures,
              [key]: lecture
            };
          }
        });
      }

            
        }); 
      }
        return this.displayLectures;
  
 }
  };
export default Kitakubu;