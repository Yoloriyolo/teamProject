package com.hufsSchedule.hufsScheduleSystem.GrdCond.MajorCond;

import com.hufsSchedule.hufsScheduleSystem.Entity.Course;
import com.hufsSchedule.hufsScheduleSystem.GrdCond.CourseEnums;
import com.hufsSchedule.hufsScheduleSystem.GrdCond.GrdCondEct;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ELTT implements IfcMajors{
    @Override
    public List<CourseEnums> makeMajorCourseList(Integer studentYear, Boolean bSecondMajor) {
        List<CourseEnums> baseCourseList = new ArrayList<>();
        Arrays.asList(CourseEnums.ELTTEnum.values()).forEach(e -> baseCourseList.add(e));

        List<CourseEnums> retCourseList = modifyCourseListByStudentYear(
                modifyCourseListBybSecondMajor(baseCourseList, bSecondMajor), studentYear
        );
        return retCourseList;
    }

    @Override
    public List<CourseEnums> modifyCourseListByStudentYear(List<CourseEnums> courseList, Integer studentYear) {
        List<String> removeList = new ArrayList<>();

        if (studentYear <= 2015) {
            courseList.stream().forEach(s -> removeList.add(s.getCourseNumber())); // 전체삭제
        } else if (studentYear <= 2017) {
            removeList.addAll(Arrays.asList("A01740","A01741","A10104","A10105","A10203"));
        } else if (studentYear >= 2018) {
            removeList.addAll(Arrays.asList("A01122"));
        }

        return GrdCondEct.removeCourseListByNumber(courseList, removeList);
    }

    @Override
    public List<CourseEnums> modifyCourseListBybSecondMajor(List<CourseEnums> courseList, Boolean bSecondMajor) {
        return courseList;
    }

    @Override
    public List<CourseEnums> modifySpecialCourseList(List<CourseEnums> remainCourseList) {
        return remainCourseList;
    }
}
