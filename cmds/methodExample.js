// Пример вызова метода GET

module.exports = {
    tag: ["инфо", "инфа"], // Команда сработает если бот затегается на инфо или инфа.
    func: async(msg, { vk }) => { // Параметр асинхронной функции
        const ID = msg.fwds[0] ? msg.fwds[0].from_id : msg.text.split(' ').slice(1).join(' '); // Тернарное выражение
        //....ID = пересланные сообщени есть ? (если да) айди равно айди пересланного : (если нет) айди равно текст, разделённый на пробелы (.split(' ')), из которого убрало первное слово (.slice(1)) и который был возвращен обратно в строку (.join(' '))

        if (!ID || ID < 0 || isNaN(ID)) return msg.error('Укажите правильный айди'); // Если айди не указан или айди меньше нуля (группа) или айди не равен числу, то пишем, что нужно указать айди.

        const user = await vk.api.users.get({
            user_ids: ID,
            fields: 'status'
        }); // Сам метод получения юзера, выполеный асинхронно (через await).

        // Создаём переменные, содержащие информация о пользователе
        const name = user[0].first_name;
        const lastName = user[0].last_name;
        const status = user[0].status;
        const id = user[0].id;
        
        // Отправляем сообщение с нашими готовыми переменными
        msg.send([
            `Имя: ${name}`,
            `Фамилия: ${lastName}`,
            `Статус: ${status ? status : 'Не указан'}`,
            `Айди: ${id}`
        ].join('\n'));
        
    },
    rights: 0, // Команда для всех пользователей
    help: 'инфа [айди]', // Название
    desc: 'узнать информация о пользователе' // Описание
};
