var db = openDatabase('bd1', '1.0', 'Test DB', 2 * 1024 * 1024); // открытие базы данных
var flag= true;
db.transaction(function (t) { // создание таблицы
    t.executeSql("CREATE TABLE IF NOT EXISTS conference (id INTEGER PRIMARY KEY autoincrement, lastname TEXT, firstname TEXT, telephone TEXT, email TEXT, student TEXT, city TEXT)", []);
    // if (flag) {
    //     t.executeSql("INSERT INTO `conference` (`lastname`,`firstname`,`telephone`,`email`,`student`,`city`) VALUES (\"Lacy\",\"Martin\",\"07532 868343\",\"luctus@mi.edu\",\"Да\",\"Serang\"),(\"Maxine\",\"Stanley\",\"0800 1111\",\"egestas.Aliquam@dolor.net\",\"Да\",\"Rivi�re-du-Loup\"),(\"Martha\",\"Galloway\",\"0500 259122\",\"sit.amet.ante@urna.org\",\"Да\",\"San Jose\"),(\"Abigail\",\"Rios\",\"055 2217 0784\",\"lorem.sit.amet@lacusAliquam.com\",\"Да\",\"Castel Ritaldi\"),(\"Kristen\",\"Salinas\",\"(01022) 282942\",\"Cras.vehicula.aliquet@necmollis.com\",\"Нет\",\"Georgia\"),(\"Cara\",\"Barnett\",\"0800 1111\",\"nec@tincidunt.co.uk\",\"Нет\",\"Sagar\"),(\"Cynthia\",\"Roman\",\"07624 865364\",\"mus.Donec@acfermentum.ca\",\"Да\",\"Colchester\"),(\"Kylie\",\"Freeman\",\"(018913) 23580\",\"Nunc.sed.orci@pellentesque.edu\",\"Да\",\"Sint-Kwintens-Lennik\"),(\"Teegan\",\"Hampton\",\"(01299) 57366\",\"interdum@lacuspedesagittis.com\",\"Нет\",\"Rhemes-Notre-Dame\"),(\"Uta\",\"Rowe\",\"0800 307 4270\",\"In.mi@malesuadaIntegerid.co.uk\",\"Нет\",\"Castel di Tora\")", []);
    //     flag = false;
    // }
});
window.onload = function() {
    dataView();
};
function insertData() { // функция для отправки формы в бд
    // window.open('congratz.html', '_blank'); // открытые новой страницы с подзравлением

    db.transaction(function (tx) { // передаем в таблицу полученные данные
        tx.executeSql('INSERT INTO conference (lastname, firstname,telephone,email,student,city) VALUES (?,?,?,?,?,?)', [
            document.getElementsByName("lastname")[0].value,
            document.getElementsByName("firstname")[0].value,
            document.getElementsByName("telephone")[0].value,
            document.getElementsByName("email")[0].value,
            document.getElementsByName("student")[0].value,
            document.getElementsByName("city")[0].value
        ]);
    });
}
function dataView() { // функция для занесения данных в таблицу html
    var html = document.getElementById("tbody01"); // находим таблицу
    db.transaction(function (t) {
        t.executeSql("SELECT * FROM conference", [], function (t, r) { // берем все данные
                for (let i = 0; i < r.rows.length; i++) { // из стоки в бд
                    if (html) { // заносим строку в таблицу html
                        html.innerHTML += "<tr><td>" + r.rows.item(i).id + "</td><td>" + r.rows.item(i).lastname + "</td><td>" + r.rows.item(i).firstname + "</td><td>" + r.rows.item(i).telephone +"</td><td>" + r.rows.item(i).email + "</td></tr>";
                    }
                }
            },
            function (t, e) { alert("Error:" + e.message); }
        );
    });
}
function DeleteTable() { // функция для удаления таблицы
    db.transaction(function (tx)
    {
        tx.executeSql('DROP TABLE conference'); // удаление таблицы
    });
}