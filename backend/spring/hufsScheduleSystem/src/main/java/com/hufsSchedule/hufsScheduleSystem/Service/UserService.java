package com.hufsSchedule.hufsScheduleSystem.Service;

import com.hufsSchedule.hufsScheduleSystem.Advice.Exception.UserDuplicationException;
import com.hufsSchedule.hufsScheduleSystem.Advice.Exception.UserNotFoundException;
import com.hufsSchedule.hufsScheduleSystem.Dto.UserDto;
import com.hufsSchedule.hufsScheduleSystem.Entity.User;
import com.hufsSchedule.hufsScheduleSystem.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDto.Res login(String studentNumber, String password) {
        User user = userRepository.findByStudentNumberAndPassword(studentNumber,password).orElseThrow(UserNotFoundException::new);
        UserDto.Res result = UserDto.Res.builder()
                .userId(user.getUserId())
                .password(user.getPassword())
                .studentNumber(user.getStudentNumber())
                .name(user.getName())
                .major(user.getMajor())
                .secondMajor(user.getSecondMajor())
                .minor(user.getMinor())
                .year(user.getYear())
                .foreigner(user.getForeigner())
                .teaching(user.getTeaching())
                .build();
        return result;
    }

    private void isExitedStudentNumber (String studentNumber){
        if(userRepository.findByStudentNumber(studentNumber).orElse(null) != null){
            throw new UserDuplicationException(studentNumber);
        }
    }

    public boolean signUp(UserDto.SignUpReq dto){
        isExitedStudentNumber(dto.getStudentNumber());
        userRepository.save(dto.toEntity());
        return true;
    }
}