export function populateMockData(num) {
    const names = ['Luke', 'Leia', 'Darth', 'Obi-Wan', 'R2-D2', 'Yoda'];
    const genders = ['male', 'female', 'n/a'];
    const years = ['19BBY', '33BBY', '52BBY', '47BBY'];
    const skin = ['pale', 'green', 'gray', 'white', 'red'];
    const hair = ['n/a', 'blond', 'brown'];
    let res = [];
    for (let i = 1; i <= num; i++) {
        res.push({
            id: i,
            name: names[Math.floor(Math.random() * names.length)],
            gender: genders[Math.floor(Math.random() * genders.length)],
            birth_year: years[Math.floor(Math.random() * years.length)],
            skin_color: skin[Math.floor(Math.random() * skin.length)],
            hair_color: hair[Math.floor(Math.random() * hair.length)],
        });
    }
    return res;
}
