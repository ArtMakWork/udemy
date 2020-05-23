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