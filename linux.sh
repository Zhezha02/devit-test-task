# Захожу в папку html
cd /var/www/html

# 1. Вывожу весь список с флагом -а, чтоб увидеть скрытые файлы и директории
ls -a

# Перехожу в папку logs
cd ../../../logs

# 2.Нахожу все упоминания строки "404"
grep "404" ./access.log

# 3. Выводим файл 404.html через редактор cat, перенаправляем этот ввод в команду sed
# команда s используется для замены символов, флаг g для замены всех вхождений
# >> перенапрявляет этот вывод в файл 403.html, и так как его до этого не было создает его
 cat ./404.html | sed s/404/403/g >> 403.html

# 4.1 Убираем права доступа к файлу для всех  
chmod a-rwx ./index.html

# 4.2 Делаем текущего владельца собственником файля
chown $(whoami) ./index.html

# Добавляем группу www-data файлу 
chgrp www-data ./index.html

# 4.3 Добавляем текущему юзеру право на чтение и запись, а группе право на чтение   
chmod u+rw,g+r ./index.html

# 5. Создаю софт линку на access.log находясь в папке html, флаг -s для создания символической ссылки   
ln -s ../logs/access.log 

# 6. Находясь в папке html вывожу в терминал все файлы папки var
cat ../../*

# 7. Записываю через cat (чтоб сохранялась табуляция) необходимый текст и перенаправляю его в файл 503.html.
# Так как его до этого не существовало, он создастся автоматически

cat >> 503.html

<html>
    <head>
        <title>503</title>
    </head>
</html>

# ^D для того чтоб завершить запись

