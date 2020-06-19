package com.hufsSchedule.hufsScheduleSystem.Dto;

import com.hufsSchedule.hufsScheduleSystem.Entity.Instruction;
import com.hufsSchedule.hufsScheduleSystem.Entity.User;
import com.hufsSchedule.hufsScheduleSystem.GrdCond.GrdCondObj;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TimetableDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req{
        private Long userId;
        private ArrayList<Instruction> myCourse;
        private Long myCredit;
        private ArrayList<String> myFreetime;// 공강시간

        @Builder
        public Req(Long userId, ArrayList<Instruction> myCourse, Long myCredit, ArrayList<String> myFreetime){
            this.userId = userId;
            this.myCourse = myCourse;
            this.myCredit = myCredit;
            this.myFreetime = myFreetime;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SaveTimeTable{
        private Long userId;
        private ArrayList<Instruction> myCourse;

        @Builder
        public SaveTimeTable(Long userId, ArrayList<Instruction> myCourse){
            this.userId = userId;
            this.myCourse = myCourse;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class MyTimeTable{
        private List<Instruction> myCourse;

        @Builder
        public MyTimeTable(List<Instruction> myCourse){
            this.myCourse = myCourse;
        }
    }

    @Getter
    @Setter
//    @NoArgsConstructor
    public static class findInstructionCode{
        private Long userId;
        private String instructionNumber;

//        @QueryProjection
        public findInstructionCode(Long userId, String instructionNumber){
            this.userId = userId;
            this.instructionNumber = instructionNumber;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class save{
        private ArrayList<Instruction> myPick;

        @Builder
        public save(ArrayList<Instruction> myPick){
            this.myPick = myPick;
        }
    }

    @Getter
    public static class Res {
        private GrdCondObj remains;

        public Res(GrdCondObj remains) {
            this.remains = remains;
        }

    }

    @Getter
    public static class Result {
        private ArrayList<Instruction> timeTable;

        public Result(ArrayList<Instruction> timeTable) {
            this.timeTable = timeTable;
        }
    }
}
