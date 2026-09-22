import React from 'react';
import * as S from './styled';

interface HeaderProps {
    studentName: string;
}

export const Header: React.FC<HeaderProps> = ({ studentName }) => {
    const initials = studentName
        .split(' ')
        .map((n) => n[0])
        .join('');

    return (
        <S.HeaderContainer>
            <S.StudentInfo>
                <S.Avatar>{initials}</S.Avatar>
                <S.TextGroup>
                    <S.StudentName>{studentName}</S.StudentName>
                </S.TextGroup>
            </S.StudentInfo>
            <S.Badge>Активный студент</S.Badge>
        </S.HeaderContainer>
    );
};