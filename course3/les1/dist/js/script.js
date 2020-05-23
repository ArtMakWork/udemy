/* Задание на урок:



Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате: 
    movies: {
        'logan': '8.1'
    }

Проверить, чтобы все работало без ошибок в консоли */

'use strict';

const numberOffilms = prompt("Сколько фильмов вы уже посмотрели?");

const personalMovieDB = {
    count : numberOffilms,
    movies : {},
    actors : {},
    genres : [],
    privat : false
};
let ans1 = prompt("Один из последних просмотренных фильмов");

let ans2 = prompt("На сколько оцените его?");

let ans3 = prompt("Один из последних просмотренных фильмов");

let ans4 = prompt("На сколько оцените его?");

personalMovieDB.movies[ans1]=ans2;
personalMovieDB.movies[ans3]=ans4;
console.log(personalMovieDB);
