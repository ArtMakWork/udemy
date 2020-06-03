/* Задание на урок:
В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 

Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/
'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function () {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while(personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)){
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },

    rememberMuFilms: function (){
        for (let i = 0; i < 1; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
        
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }
        }
    },

    detectPersonalLevel: function(){
        if (personalMovieDB.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },

    showMyDB: function (hidden){
        if (!hidden){
            console.log(personalMovieDB);
        }
    },

    toggleVisibleMyDB: function(){
        if(personalMovieDB.privat){
            personalMovieDB.privat=false;
        }else{
            personalMovieDB.privat=true;
        }
    },

    writeYourGenres: function(){
        for (let i = 0; i < 3; i++) {
            const genre = prompt(`Ваш любимый жанр под номером ${i+1}`, '');
            if (genre == null || genre === '') {
                console.log('error');
                i--;
            } else {
                personalMovieDB.genres[i] = genre;
            }

        }
        personalMovieDB.genres.forEach((item, i)=>{
            console.log(`Любимый жанр ${i+1} - это ${item}`);
            
        });
    }
};

let mass = [8,5,16,19,3,55,13,99,7,24,1];

function mySort(mass){
    let z;
    for(let i = 0;i<mass.length;i++){
        for(let j = i+1 ; j<mass.length;j++){
            if(mass[i]>mass[j]){
                z=mass[i];
                mass[i]=mass[j];
                mass[j]=z;
            }
        }
    };
    console.log(mass);
}
mySort(mass);