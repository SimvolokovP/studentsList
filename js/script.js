let studentsList = [{
    name: 'Олег',
    surename: 'Иванович',
    lastname: 'Мостин',
    age: 18,
    faculty: 'Игры'
},
{
    name: 'Юлия',
    surename: 'Александровна',
    lastname: 'Воронина',
    age: 21,
    faculty: 'Танцы'
},
{
    name: 'Евгения',
    surename: 'Анатольевна',
    lastname: 'Ильина',
    age: 18,
    faculty: 'Спорт'
},
{
    name: 'Юлия',
    surename: 'Олеговна',
    lastname: 'Антонова',
    age: 21,
    faculty: 'Спорт'
},
{
    name: 'Александр',
    surename: 'Иванович',
    lastname: 'Воронин',
    age: 19,
    faculty: 'Танцы'
},
];

function createElement(elementTag, ...elementClasses) {
    let createdElement = document.createElement(elementTag);
    elementClasses.forEach(className => {
        createdElement.classList.add(className);
    });
    return createdElement;
}

const $app = document.getElementById('app'),
    $table = createElement('table', 'table'),
    $tableHead = createElement('thead', 'table__head'),
    $tableBody = createElement('tbody', 'table__body'),
    $tableHeadTr = createElement('tr', 'table__tr'),
    $tableHeadThFullname = createElement('th', 'table__row', 'row', 'row__fullname'),
    $tableHeadThAge = createElement('th', 'table__row', 'row', 'row__age'),
    $tableHeadThYear = createElement('th', 'table__row', 'row', 'row__year'),
    $tableHeadThFaculty = createElement('th', 'table__row', 'row', 'row__faculty');

$tableHeadThFullname.innerText = 'ФИО';
$tableHeadThAge.innerText = 'Возраст';
$tableHeadThYear.innerText = 'Год рождения';
$tableHeadThFaculty.innerText = 'Факультет';

const $addForm = document.getElementById('add-form'),
      $inputName = document.getElementById('add-form__name-inp'),
      $inputSurname = document.getElementById('add-form__surename-inp'),
      $inputLastname = document.getElementById('add-form__lastname-inp'),
      $inputAge = document.getElementById('add-form__age-inp'),
      $inputFaculty = document.getElementById('add-form__faculty-inp');


const $filterName = document.getElementById('filter-form__fio-inp'),
        $filterFaculty = document.getElementById('filter-form__faculty-inp'),
        $sortFio = document.getElementById('sort__fio'),
        $sortAge = document.getElementById('sort__age');


$tableHeadTr.append($tableHeadThFullname, $tableHeadThAge, $tableHeadThYear, $tableHeadThFaculty);
$tableHead.append($tableHeadTr);
$table.append($tableHead, $tableBody)
$app.append($table);

function renderList(list) {
    $tableBody.innerHTML = '';
    const copyList = [...list]
    for (const item of copyList) {
        $tableBody.append(itemToHTML(item));
    }
}

function itemToHTML(item) {
    const {name, surename, lastname, age, faculty} = item;
        const $userTr = createElement('tr', 'user__tr'),
            $userFullname = createElement('th', 'user__fullname'),
            $userAge = createElement('th', 'user__age'),
            $userYear = createElement('th', 'user__year'),
            $userFaculty = createElement('th', 'user__faculty');

        item.fio = name + ' ' + surename + ' ' + lastname;
        $userFullname.innerText = item.fio;
        $userAge.innerText = age;
        const currentDate = new Date();
        $userYear.innerText = currentDate.getFullYear() - age;
        $userFaculty.innerText = faculty;
        $userTr.append($userFullname, $userAge, $userYear, $userFaculty);
        return $userTr;
}

function addUser() {
    if ($inputName.value !== '' && $inputSurname.value !== '' && $inputLastname.value !== '' && $inputAge.value !== '' && $inputFaculty.value !== '') {
        console.log(studentsList)
        studentsList.push({
            name: $inputName.value,
            surename: $inputSurname.value,
            lastname: $inputLastname.value,
            age: +$inputAge.value,
            faculty: $inputFaculty.value
        });
        renderList(studentsList);
    } else { 
        alert('Введите данные');
    }
}

$addForm.addEventListener('submit', addUser);

$filterName.addEventListener('input', () => {
    const searchTerms = $filterName.value.toLowerCase().trim().split(' ');
    const filteredList = studentsList.filter(item => {
        const nameParts = item.fio.toLowerCase().split(' ');
        return searchTerms.every(term => nameParts.some(namePart => namePart.includes(term)));
    });

    renderList(filteredList);
});

$filterFaculty.addEventListener('input', () => {
    const value = $filterFaculty.value.toLowerCase().trim();
    const filteredList = studentsList.filter(item => item.faculty.toLowerCase().startsWith(value));

    renderList(filteredList);
});

$sortFio.addEventListener('click', () => {
    const sortedList = studentsList.slice().sort((a, b) => {
        const nameA = a.fio.toLowerCase();
        const nameB = b.fio.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    renderList(sortedList);
});

$sortAge.addEventListener('click', () => {
    const sortedList = studentsList.slice().sort((a, b) => {
        const ageA = a.age;
        const ageB = b.age;
        if (ageA < ageB) {
            return -1;
        }
        if (ageA > ageB) {
            return 1;
        }
        return 0;
    });

    renderList(sortedList);
});

renderList(studentsList);
